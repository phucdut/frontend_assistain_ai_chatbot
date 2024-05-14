"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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

type ChatProps = {
  id: string;
};

const Chat: React.FC<ChatProps> = ({ id }) => {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<
    { sender_type: string; message: string }[]
  >([]);
  // const [chatbotMessage, setChatbotMessage] = useState<ChatbotResMessageType | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  React.useEffect(() => {
    if (id) {
      // Gọi API với id
      console.log("Chatbot ID:", id);
      // Your API call logic here
    }
  }, [id]);

  const form = useForm<ChatbotMessageBodyType>({
    resolver: zodResolver(ChatbotMessageSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: ChatbotMessageBodyType) {
    try {
      // Thêm tin nhắn của người dùng vào danh sách tin nhắn
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender_type: "user", message: values.message },
      ]);

      // Gọi API sentMessage với id của chatbot và gửi cookie
      const response = await chatbotApiRequest.sentMessage(values, id);

      // Thêm phản hồi từ chatbot vào danh sách tin nhắn
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender_type: "bot", message: response.payload.message },
      ]);
      // setChatbotMessage(response.payload);
      form.setValue("message", "");
      console.log("API Response:", response);
    } catch (error) {
      console.error("API Error:", error);
    }
    // Call API or other logic with values.message
  }

  return (
    <div
      className={cn("bg-custom-gray-4 h-full w-full", "lg:rounded-3xl lg:p-7")}
    >
      {/* <p>Chatbot ID: {id}</p> */}
      <div className="chat-container w-full [400px] max-w-full max-h-full overflow-y-auto border border-gray-300 p-4 rounded-lg">
        <div className="chat-messages space-y-4">
          {messages?.map((msg, index) => (
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
                  src="/Ellipse 1.svg"
                  alt="x"
                  width={24}
                  height={22}
                  className="w-9 h-9 rounded-full"
                />
              )}
              <div
                className={
                  msg.sender_type === "bot"
                    ? "bot-message bg-blue-200 p-4 rounded-lg"
                    : "user-message bg-green-200 p-4 rounded-lg"
                }
              >
                <p>{msg.message}</p>
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className=" pb-0 relative">
            <div className="text-[16px] font-normal leading-[18px] relative w-full">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Write your message"
                        {...field}
                        className="inputChat"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage className="text-red-500 text-[14px] font-normal leading-[26px]" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="absolute inset-y-2 right-5 flex items-center justify-between w-[44px] h-[44px]"
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
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Chat;
