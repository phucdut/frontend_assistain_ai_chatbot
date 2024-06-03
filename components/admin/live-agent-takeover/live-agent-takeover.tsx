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
import ShowChatbot from "./show-chatbot";
import Link from "next/link";
import { Search } from "lucide-react";

const LiveAgentTakeover = () => {
  const [account, setAccount] = useState<AccountResType | null>(null);
  const [userSubscription, setUserSubscription] =
    useState<UserSubscriptionResType | null>(null);
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
        if (account?.id) {
          const result = await accountApiRequest.userSubscriptionIdClient(account?.id);
          setUserSubscription(result.payload);
          // Kiểm tra nếu người dùng có ID là e429e441-ea81-444e-a962-b88036ea0ad1 hoặc 86b20aef-e7dc-45a7-8fde-84d4a504e3a6
          if (
            userSubscription?.plan_id === "e429e441-ea81-444e-a962-b88036ea0ad1" ||
            userSubscription?.plan_id === "86b20aef-e7dc-45a7-8fde-84d4a504e3a6"
          ) {
            toast({
              title: "error",
              description: "You do not have permission to access this page",
            });
            // Nếu có, chuyển hướng đến trang khác
            router.push("/home");
          }
        }
      } catch (error: any) {
        handleErrorApi({
          error,
        });
      }
    };
    fetchRequest();
  }, [account?.id, router, toast, userSubscription?.plan_id]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccount(result.payload);
      } catch (error: any) {
        handleErrorApi({
          error,
        });
        router.push("/");
        router.refresh(); // Chuyển hướng người dùng về trang landing
      }
    };
    fetchRequest();
  }, [router]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (account?.id) {
          const result = await conversationApiRequest.conversationClient(
            account?.id
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
  }, [account?.id]);

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
    <div className="w-full h-full bg-gray-50 shadow rounded-3xl">
      <div className="w-full h-[70px] bg-white flex justify-start items-center rounded-t-3xl">
        <div className="text-[24px] font-semibold leading-[141.667%] max-w-full px-7">
          <h1>Live Agent Takeover</h1>
        </div>
      </div>
      <Separator className=" bg-slate-300 " />
      <div className="w-full h-[660px] justify-center overflow-y-auto custom-scroll rounded-b-3xl">
        <div className="pt-0 w-full h-[660px] lg:pb-7 overflow-auto custom-scroll ">
          <TableDashboard className="border border-slate-300">
            <TableCaption></TableCaption>
            <TableHeader className="bg-gray-50 ">
              <TableRow>
                <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight">
                  Name Conversation
                </TableHead>
                <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight">
                  Name Chatbot
                </TableHead>
                <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight">
                  Active
                </TableHead>
                <TableHead className="text-center text-zinc-900 text-[13px] font-semibold leading-tight">
                  Date create
                </TableHead>
                <TableHead className="text-center text-zinc-900 text-[13px] font-semibold leading-tight">
                  Date update
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {filteredConversation?.map(
                (
                  conversationItem: ConversationResListType["results"][0],
                  index: number
                ) => (
                  <TableRow key={index}>
                    <TableCell className="">
                      <Link
                        className="flex justify-start items-center gap-3 font-medium"
                        href={`live-chat/live-chat-hybrid?conversation_id=${conversationItem?.id}&chatbot_id=${conversationItem?.chatbot_id}`}
                      >
                        <input
                          type="checkbox"
                          className="w-6 h-6 left-0 top-0 bg-white rounded-md border border-slate-300"
                          checked={conversationItem?.is_active || false}
                        ></input>
                        <div className="text-zinc-900 text-[13px]  leading-tight">
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
                    <TableCell className="font-normal">
                      {conversationItem?.is_active ? "Open" : "Closes"}
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

export default LiveAgentTakeover;
