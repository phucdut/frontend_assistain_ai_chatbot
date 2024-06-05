"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, handleErrorApi } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import "@/app/globals.css";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import chatbotApiRequest from "@/app/apiRequests/chatbot";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ChatbotMessageBodyType,
  ChatbotMessageResType,
  ChatbotMessageSchema,
  ChatbotResMessageType,
} from "@/schemas/chatbot.schema";
import { Textarea } from "@/components/ui/textarea";

type ChatMessage = {
  sender_type: string;
  message: string;
  created_at: Date;
};

type ChatProps = {
  id: string;
  conversation_id: string;
};

const Chat: React.FC<ChatProps> = ({ id, conversation_id }) => {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [initialMessagesLoaded, setInitialMessagesLoaded] =
    useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationId, setConversationId] = useState<string | null>(
    conversation_id
  );

  // useEffect(() => {
  //   const fetchRequest = async () => {
  //     try {
  //       if (conversationId) {
  //         const result = await chatbotApiRequest.loadMessage(conversationId);
  //         setMessages((prevMessages) => [
  //           ...prevMessages,
  //           ...result.payload.map((msg) => ({
  //             sender_type: String(msg.sender_type),
  //             message: msg.message,
  //             created_at: new Date(msg.created_at),
  //           })),
  //         ]);
  //       }
  //     } catch (error) {
  //       handleErrorApi({ error });
  //     }
  //   };
  //   fetchRequest();
  // }, [conversationId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (id) {
      if (!initialMessagesLoaded) {
        setMessages(initialBotMessages);
        setInitialMessagesLoaded(true);
      }
    }
  }, [id, initialMessagesLoaded]);

  const form = useForm<ChatbotMessageBodyType>({
    resolver: zodResolver(ChatbotMessageSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: ChatbotMessageBodyType) {
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender_type: "user",
          message: values.message,
          created_at: new Date(),
        },
      ]);

      const response = await chatbotApiRequest.sentMessage(
        values,
        id,
        conversationId || ""
      );
      const newConversationId = response.payload.conversation_id;
      setConversationId(newConversationId);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender_type: "bot",
          message: response.payload.message,
          created_at: new Date(),
        },
      ]);
      form.setValue("message", "");
    } catch (error: any) {
      setMessages(errorBotMessages);
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className={cn("h-full w-full")}>
      <div className="chat-container w-full max-w-full max-h-full overflow-y-auto custom-scroll text-black">
        <div className="chat-messages space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender_type === "bot"
                  ? "flex items-start space-x-4"
                  : "flex justify-end items-start space-x-4"
              }
            >
              {msg.sender_type === "bot" && (
                <Image
                  src="/icons/Horizontal 1.svg"
                  alt="x"
                  width={24}
                  height={22}
                  className="w-9 h-9 rounded-full"
                />
              )}
              <div
                className={
                  msg.sender_type === "bot"
                    ? "bot-message bg-green-200 p-4 rounded-lg"
                    : "user-message bg-blue-200 p-4 rounded-lg"
                }
              >
                <p>{msg.message}</p>
                <p className="text-xs text-gray-500 pt-1">
                  {msg.created_at.toLocaleString()}
                </p>
              </div>
              {msg.sender_type === "user" && (
                <Image
                  src="/Ellipse 1.svg"
                  alt="x"
                  width={24}
                  height={22}
                  className="w-9 h-9 rounded-full"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="relative px-7">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="text-[16px] font-normal leading-[18px] w-full flex items-center justify-center border border-input rounded-xl px-5">
                      <Textarea
                        placeholder="Write your message"
                        {...field}
                        className=" text-[18px] resize-none overflow-y-auto custom-scroll pt-6 w-full"
                        disabled={isPending}
                        onKeyDown={handleKeyDown}
                      />
                      <Button
                        type="submit"
                        className="flex items-center justify-between w-[44px] h-[44px] bg-black"
                      >
                        <Image
                          src={
                            form.watch("message")
                              ? "/paper-plane 1.svg"
                              : "/icons/Fill - Voice - Mic.svg"
                          }
                          alt="send"
                          width={20}
                          height={20}
                          className="flex-shrink-0"
                        />
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="text-red-500 text-[14px] font-normal leading-[26px]" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Chat;

const initialBotMessages: ChatMessage[] = [
  {
    sender_type: "bot",
    message:
      "Chào bạn, chào mừng đến với AllyBy AI. Tôi sẽ giúp bạn bắt đầu. Nếu bạn có bất kỳ câu hỏi cụ thể nào, bạn có thể sử dụng hộp chat ở dưới cùng màn hình (hoặc nhấn vào các gợi ý nhắc nhở).",
    created_at: new Date(),
  },
  {
    sender_type: "bot",
    message:
      "Để bắt đầu tạo cơ sở tri thức đầu tiên của bạn 📕 (có nghĩa là huấn luyện mô hình AI của bạn), kéo và thả tệp vào cửa sổ chat này hoặc nhấn vào “Cơ sở tri thức mới” trong thanh bên. Sau khi được huấn luyện, bạn có thể bắt đầu trò chuyện qua cửa sổ chat bên dưới với hơn 100 ngôn ngữ 🌏. Có câu hỏi nào không? Hãy hỏi nhé. Chúng tôi luôn sẵn sàng giúp đỡ. 🤝",
    created_at: new Date(),
  },
  {
    sender_type: "bot",
    message:
      "Theo dõi AllyBy AI trên LinkedIn để cập nhật các tính năng mới và thông báo.",
    created_at: new Date(),
  },
];

const errorBotMessages: ChatMessage[] = [
  {
    sender_type: "bot",
    message: "👋 Xin lỗi AllyBy AI sẽ phản hồi lại sau!",
    created_at: new Date(),
  },
];
