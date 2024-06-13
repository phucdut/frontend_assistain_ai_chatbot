"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, handleErrorApi } from "@/lib/utils";
import { useForm } from "react-hook-form";
import "@/app/globals.css";

import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState, useTransition } from "react";

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
  created_at: Date; // Thêm trường created_at vào tin nhắn
};

type ChatProps = {
  id: string;
};

const ChatEmbed: React.FC<ChatProps> = ({ id }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<
    { sender_type: string; message: string; created_at: Date }[]
  >([]);
  // Thay đổi state để chỉ lưu trữ tin nhắn mới nhất
  const [latestMessages, setLatestMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái isLoading
  const [initialMessagesLoaded, setInitialMessagesLoaded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationId, setConversationId] = useState<string>(
    "99bc0984-f8de-407a990c-41651230e539"
  );

  React.useEffect(() => {
    if (!initialMessagesLoaded) {
      setMessages(initialBotMessages);
      setInitialMessagesLoaded(true);
    }
  }, [initialMessagesLoaded]);

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

  const handleImageClick = () => {
    setIsExpanded(!isExpanded); // Đảo ngược trạng thái khi click vào ảnh
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [latestMessages]);

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
      // Add user's message to the chat
      setLatestMessages((prevMessages) => [
        ...prevMessages,
        {
          sender_type: "user",
          message: trimmedMessage,
          created_at: new Date(),
        },
      ]);

      // Call the API with the current conversation ID
      const response = await chatbotApiRequest.sentMessage(
        { message: trimmedMessage },
        id,
        conversationId
      );
      // Hiển thị tin nhắn từ bot hoặc agent trên giao diện
      const botOrAgentMessage: ChatMessage = {
        sender_type: response.payload.sender_type, // Đã được trả về từ API
        message: response.payload.message,
        created_at: new Date(),
      };
      // Update the conversation ID if a new one is provided
      if (
        response.payload.conversation_id &&
        response.payload.conversation_id !== conversationId
      ) {
        setConversationId(response.payload.conversation_id);
      }

      // Add the bot's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender_type: "bot",
          message: response.payload.message,
          created_at: new Date(),
        },
      ]);
      // setMessages((prevMessages) => [...prevMessages, botOrAgentMessage]);

      form.setValue("message", "");
      console.log("API Response:", response);
    } catch (error) {
      setMessages(errorBotMessages);
      console.error("API Error:", error);
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
    <div className="relative">
      <div className={`fixed bottom-14 right-14 ${isExpanded ? "hidden" : ""}`}>
        {/* Hiển thị ảnh khi chưa click */}
        <div
          className="w-[50px] h-[50px] rounded-full bg-primary relative pt-5 shake-image"
          onClick={handleImageClick}
        >
          <Image
            src="/icons/Horizontal 1.svg"
            alt="x"
            width={42}
            height={42}
            className="shake-image transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 rounded-full absolute inset-y-[4px] inset-x-[4px]"
          />
        </div>
      </div>
      <div
        className={`fixed bottom-14 right-14  ${!isExpanded ? "hidden" : ""}`}
      >
        {/* Hiển thị ảnh khi chưa click */}
        <div
          className="w-[50px] h-[50px] rounded-full bg-primary relative pt-5"
          onClick={handleImageClick}
        >
          <Image
            src="/icons/Horizontal 1.svg"
            alt="x"
            width={42}
            height={42}
            className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 rounded-full absolute inset-y-[4px] inset-x-[4px]"
          />
        </div>
      </div>
      {isExpanded && (
        <div className="fixed bottom-14 right-32 first:w-[370px] h-[572px] max-w-full max-h-full bg-gray-50 rounded-xl shadow border border-slate-300">
          {/* Hiển thị nội dung khi click vào ảnh */}
          <div className="flex items-center justify-between px-4 h-[60px] rounded-xl bg-white w-full">
            <Image
              src="/logo/Horizontal 2.svg"
              alt="logo"
              width={36}
              height={36}
            />
            <div className="opacity-50 text-center text-neutral-900 text-[13px] font-normal leading-[18px]">
              Powered by AllyBy AI
            </div>
            <X
              className="w-4 h-4 relative transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
              onClick={handleImageClick}
            />
          </div>
          <div className=" pb-0 relative pt-3 ">
            <div className="w-[370px] h-[440px] overflow-y-auto custom-scroll flex flex-col space-y-2 px-4">
              {initialBotMessages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender_type === "bot" || msg.sender_type === "agent"
                      ? "flex items-start space-x-4"
                      : "flex justify-end items-start space-x-4"
                  }
                >
                  {(msg.sender_type === "bot" ||
                    msg.sender_type === "agent") && (
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
                  {(msg.sender_type === "user" ||
                    msg.sender_type === "guest") && (
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
              <div className="chat-messages space-y-4">
                {latestMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.sender_type === "bot" || msg.sender_type === "agent"
                        ? "flex items-start space-x-4"
                        : "flex justify-end items-start space-x-4"
                    }
                  >
                    {(msg.sender_type === "bot" ||
                      msg.sender_type === "agent") && (
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
                    {(msg.sender_type === "user" ||
                      msg.sender_type === "guest") && (
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 "
              >
                <div className=" pb-0 relative">
                  <div className="text-[16px] font-normal leading-[18px] relative w-full">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="text-[16px] font-normal leading-[18px] px-3 w-full border border-input rounded-xl flex justify-start items-center">
                              <Textarea
                                placeholder="Write your message"
                                className="h-[55px] bg-gray-50 overflow-y-auto custom-scroll resize-none pt-4"
                                {...field}
                                disabled={isPending}
                                onKeyDown={handleKeyDown}
                              />
                              <Button
                                type="submit"
                                className="w-11 h-11"
                                disabled={
                                  !isValid ||
                                  isPending ||
                                  !form.watch("message").trim()
                                }
                              >
                                <Image
                                  src="/paper-plane 1.svg"
                                  alt="send"
                                  width={20}
                                  height={20}
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
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatEmbed;

const initialBotMessages: ChatMessage[] = [
  {
    sender_type: "bot",
    message: "👋 AllyBy AI là gì?",
    created_at: new Date(),
  },
  {
    sender_type: "bot",
    message: "Hãy kể cho tôi mười điều tôi có thể làm với nó",
    created_at: new Date(),
  },
  {
    sender_type: "bot",
    message: "Làm thế nào để bắt đầu với nó",
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
