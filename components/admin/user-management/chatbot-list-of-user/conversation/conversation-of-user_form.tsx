"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, handleErrorApi } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-stores";
import Image from "next/image";
import "@/app/globals.css";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  AccountResType,
  ChangPasswordBody,
  ChangPasswordBodyType,
  UserSubscriptionResType,
} from "@/schemas/account.schema";
import { useForm } from "react-hook-form";
import accountApiRequest from "@/app/apiRequests/account";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  TableDashboard,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-dashboard";
import conversationApiRequest from "@/app/apiRequests/conversation";
import { ConversationResListType } from "@/schemas/conversation.schema";
import { ChatbotResType } from "@/schemas/chatbot.schema";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Search } from "lucide-react";
import { UpgradeMembershipListType } from "@/schemas/upgrade-membership.schema";
import membershipApiRequest from "@/app/apiRequests/upgrade-membership";
import ShowChatbot from "@/components/admin/live-agent-takeover/show-chatbot";

const ConversationOfUserForm = () => {
  const searchParams = useSearchParams();
  const chatbotId = searchParams.get("chatbot_id");
  const [conversation, setConversation] =
    useState<ConversationResListType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (chatbotId) {
          const result = await conversationApiRequest.conversationClientWithChatbot(
            chatbotId
          );
          // Sắp xếp danh sách cuộc trò chuyện theo thời gian cập nhật mới nhất
          const sortedConversations = result.payload.results.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );
          setConversation(result.payload);
          // console.log(result.payload);
        }
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, [chatbotId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredConversation = conversation?.results?.filter(
    (conversationItem) =>
      conversationItem.conversation_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full bg:gray-50 shadow rounded-3xl">
      <div className="w-full h-[70px] bg:white flex justify-start items-center rounded-t-3xl">
        <div className="text-[24px] font-semibold leading-[141.667%] max-w-full px-7">
          <h1>Managing Conversations with Chatbot</h1>
        </div>
      </div>
      <Separator className=" bg-slate-300 " />
      <div className="w-full h-[660px] justify-center overflow-y-auto custom-scroll rounded-b-3xl">
        <div className="pt-0 w-full h-[660px] lg:pb-7 overflow-auto custom-scroll ">
          <TableDashboard className="">
            <TableCaption></TableCaption>
            <TableHeader className="bg:gray-50 ">
              <TableRow>
                <TableHead className=" text-[13px] font-semibold leading-tight">
                  Name Conversation
                </TableHead>
                <TableHead className=" text-[13px] font-semibold leading-tight">
                  Name Chatbot
                </TableHead>
                <TableHead className=" text-[13px] font-semibold leading-tight">
                  Join message
                </TableHead>
                <TableHead className="text-center  text-[13px] font-semibold leading-tight">
                  Date create
                </TableHead>
                <TableHead className="text-center  text-[13px] font-semibold leading-tight">
                  Date update
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg:white">
              {filteredConversation?.map(
                (
                  conversationItem: ConversationResListType["results"][0],
                  index: number
                ) => (
                  <TableRow key={index}>
                    <TableCell className="">
                      <Link
                        className="flex justify-start items-center gap-3 font-medium"
                        href={`conversation/live-chat-hybrid?conversation_id=${conversationItem?.id}&chatbot_id=${conversationItem?.chatbot_id}`}
                      >
                        <input
                          type="checkbox"
                          className="w-6 h-6 left-0 top-0 bg:white rounded-md border border-slate-300"
                          checked={conversationItem?.is_active || false}
                        ></input>
                        <div className=" text-[13px]  leading-tight">
                          {conversationItem?.conversation_name}
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      {conversationItem && (
                        <ShowChatbot
                          chatbot_id={conversationItem?.chatbot_id}
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-normal ">
                      {conversationItem?.is_taken ? "Open" : "Closes"}
                    </TableCell>
                    <TableCell className="text-center">
                      {conversationItem?.created_at?.toLocaleString()}
                    </TableCell>
                    <TableCell className="flex justify-center font-normal">
                      {conversationItem?.updated_at?.toLocaleString()}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
            <TableFooter>
              <TableRow></TableRow>
            </TableFooter>
          </TableDashboard>
        </div>
      </div>
    </div>
  );
};

export default ConversationOfUserForm;
