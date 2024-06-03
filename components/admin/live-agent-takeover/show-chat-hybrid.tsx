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

import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import conversationApiRequest from "@/app/apiRequests/conversation";
import {
  LiveAgentMessageBodyType,
  LiveAgentMessageSchema,
} from "@/schemas/conversation.schema";

type ChatMessage = {
  sender_type: string;
  message: string;
  created_at: Date;
};

const ShowChatHybrid = () => {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversation_id");
  const chatbotId = searchParams.get("chatbot_id");

  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTextareaEnabled, setIsTextareaEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (conversationId) {
          console.log("Fetching messages for conversationId:", conversationId);
          const result = await chatbotApiRequest.loadMessage(conversationId);
          console.log("Fetched messages:", result.payload);
          setMessages((prevMessages) => [
            ...prevMessages,
            ...result.payload.map((msg) => ({
              sender_type: String(msg.sender_type),
              message: msg.message,
              created_at: new Date(msg.created_at),
            })),
          ]);
        } else {
          console.log("No conversationId found.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        handleErrorApi({ error });
      }
    };

    fetchMessages(); // Initial fetch

    const intervalId = setInterval(() => {
      console.log("Fetching messages...");
      fetchMessages();
    }, 5000); // Fetch messages every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [conversationId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const form = useForm<LiveAgentMessageBodyType>({
    resolver: zodResolver(LiveAgentMessageSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: LiveAgentMessageBodyType) {
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender_type: "agent",
          message: values.message,
          created_at: new Date(),
        },
      ]);

      const response = await conversationApiRequest.sentMessageLiveAgent(
        values,
        conversationId || ""
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender_type: "guest",
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

  const handleEnableTextarea = async () => {
    try {
      if (conversationId) {
        await conversationApiRequest.joinConversationClient(conversationId);

        toast({
          title: "Success",
          description: "Join message in successfully!",
        });
        setIsTextareaEnabled(true);
      }
    } catch (error) {
      handleErrorApi({
        error,
      });
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 shadow rounded-3xl">
      <div className="w-full h-[70px] bg-white flex justify-start items-center rounded-t-3xl">
        <div className="text-[24px] font-semibold leading-[141.667%] max-w-full px-7">
          <h1>Live Agent Takeover</h1>
        </div>
      </div>
      <Separator className=" bg-slate-300 " />
      <div className={cn("h-full w-full")}>
        <div className="live-chat-container w-full max-w-full max-h-full overflow-y-auto custom-scroll text-black">
          <div className="chat-messages space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender_type === "user" || msg.sender_type === "guest"
                    ? "flex items-start space-x-4"
                    : "flex justify-end items-start space-x-4"
                }
              >
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
                <div
                  className={
                    msg.sender_type === "user" || msg.sender_type === "guest"
                      ? "bot-message bg-green-200 p-4 rounded-lg"
                      : "user-message bg-blue-200 p-4 rounded-lg"
                  }
                >
                  <p>{msg.message}</p>
                  <p className="text-xs text-gray-500 pt-1">
                    {msg.created_at.toLocaleString()}
                  </p>
                </div>
                {(msg.sender_type === "bot" || msg.sender_type === "agent") && (
                  <Image
                    src="/icons/Horizontal 1.svg"
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
        {!isTextareaEnabled ? (
          <div className="flex justify-center items-center my-8">
            <Button
              onClick={handleEnableTextarea}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Click to Enable Chat
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            className=" text-[18px] resize-none overflow-y-auto custom-scroll pt-6 w-full bg-gray-50"
                            disabled={isPending || !isTextareaEnabled}
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
        )}
      </div>
    </div>
  );
};

export default ShowChatHybrid;

const errorBotMessages: ChatMessage[] = [
  {
    sender_type: "bot",
    message: "👋 Xin lỗi Ally AI sẽ phản hồi lại sau!",
    created_at: new Date(),
  },
];
