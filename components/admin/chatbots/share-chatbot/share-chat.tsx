"use client";

import { Button } from "@/components/ui/button";
import { cn, handleErrorApi } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import "@/app/globals.css";

import { zodResolver } from "@hookform/resolvers/zod";

import chatbotApiRequest from "@/app/apiRequests/chatbot";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  ChatbotMessageBodyType,
  ChatbotMessageSchema,
} from "@/schemas/chatbot.schema";
import { Textarea } from "@/components/ui/textarea";

type ChatMessage = {
  sender_type: string;
  message: string;
  created_at: Date;
};

type ChatProps = {
  id: string;
};

const ShareChatbot: React.FC<ChatProps> = ({ id }) => {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [initialMessagesLoaded, setInitialMessagesLoaded] =
    useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string>(
    "99bc0984-f8de-407a990c-41651230e539"
  );
  // Thay đổi state để chỉ lưu trữ tin nhắn mới nhất
  const [latestMessages, setLatestMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (conversationId) {
          const result = await chatbotApiRequest.loadMessage(conversationId);
          // Cập nhật danh sách tin nhắn mới nhất thay vì thêm vào danh sách đầy đủ
          setLatestMessages(
            result.payload.map((msg) => ({
              sender_type: String(msg.sender_type),
              message: msg.message,
              created_at: new Date(msg.created_at),
            }))
          );
        } else {
          console.log("No conversationId found.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        handleErrorApi({ error });
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000);

    return () => clearInterval(intervalId);
  }, [conversationId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [latestMessages]);

  // useEffect(() => {
  //   if (id) {
  //     // console.log("Chatbot ID:", id);
  //     if (!initialMessagesLoaded) {
  //       setLatestMessages(initialBotMessages);
  //       setInitialMessagesLoaded(true);
  //     }
  //   }
  // }, [id, initialMessagesLoaded]);

  const form = useForm<ChatbotMessageBodyType>({
    resolver: zodResolver(ChatbotMessageSchema),
    defaultValues: {
      message: "",
    },
  });

  const { isValid } = form.formState;

  async function onSubmit(values: ChatbotMessageBodyType) {
    const trimmedMessage = values.message.trim();
    if (!trimmedMessage) {
      return;
    }

    try {
      setLatestMessages((prevMessages) => [
        ...prevMessages,
        {
          sender_type: "user",
          message: trimmedMessage,
          created_at: new Date(),
        },
      ]);

      const response = await chatbotApiRequest.sentMessage(
        { message: trimmedMessage },
        id,
        conversationId
      );

      if (
        response.payload.conversation_id &&
        response.payload.conversation_id !== conversationId
      ) {
        setConversationId(response.payload.conversation_id);
      }

      setLatestMessages((prevMessages) => [
        ...prevMessages,
        {
          sender_type: "bot",
          message: response.payload.message,
          created_at: new Date(),
        },
      ]);

      form.setValue("message", "");
      // console.log("API Response:", response);
    } catch (error) {
      setMessages(errorBotMessages);
      handleErrorApi({ error });
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const trimmedMessage = form.getValues("message").trim();
      if (isValid && trimmedMessage) {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <div className={cn("h-full w-full pt-[50px]", "lg:rounded-lg")}>
      <div className="chat-container w-full h-[400px] max-w-full max-h-full overflow-y-auto custom-scroll border border-gray-300 p-4 rounded-lg bg-gray-50">
        {/* Thay đổi cách hiển thị tin nhắn để chỉ hiển thị tin nhắn mới nhất */}
        <div className="chat-messages space-y-4">
          {initialBotMessages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender_type === "bot" || msg.sender_type === "agent"
                  ? "flex items-start space-x-4"
                  : "flex justify-end items-start space-x-4"
              }
            >
              {(msg.sender_type === "bot" || msg.sender_type === "agent") && (
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
                  msg.sender_type === "bot" || msg.sender_type === "agent"
                    ? "bot-message bg-green-200 p-4 rounded-lg"
                    : "user-message bg-blue-200 p-4 rounded-lg"
                }
              >
                <p>{msg.message}</p>
                <p className="text-xs text-gray-500 pt-1">
                  {msg.created_at.toLocaleString()}
                </p>
              </div>
              {(msg.sender_type === "user" || msg.sender_type === "guest") && (
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
          {latestMessages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender_type === "bot" || msg.sender_type === "agent"
                  ? "flex items-start space-x-4"
                  : "flex justify-end items-start space-x-4"
              }
            >
              {(msg.sender_type === "bot" || msg.sender_type === "agent") && (
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
                  msg.sender_type === "bot" || msg.sender_type === "agent"
                    ? "bot-message bg-green-200 p-4 rounded-lg"
                    : "user-message bg-blue-200 p-4 rounded-lg"
                }
              >
                <p>{msg.message}</p>
                <p className="text-xs text-gray-500 pt-1">
                  {msg.created_at.toLocaleString()}
                </p>
              </div>
              {(msg.sender_type === "user" || msg.sender_type === "guest") && (
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
        </div>
        {/* <div ref={messagesEndRef} /> */}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className=" pb-0 ">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="text-[16px] font-normal leading-[18px] w-full flex items-center justify-center border border-input rounded-lg px-5 bg-gray-50">
                      <Textarea
                        placeholder="Write your message"
                        {...field}
                        onKeyDown={handleKeyDown}
                        className="bg-gray-50 pl-10 text-[18px] overflow-y-auto custom-scroll resize-none pt-6 w-full"
                        disabled={isPending}
                      />
                      <Button
                        type="submit"
                        className="flex items-center justify-between w-[44px] h-[44px] bg-black"
                        disabled={
                          !isValid || isPending || !form.watch("message").trim()
                        }
                      >
                        <Image
                          src={
                            form.watch("message").trim()
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

export default ShareChatbot;

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
