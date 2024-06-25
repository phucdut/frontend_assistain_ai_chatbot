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
import { UpgradeMembershipListType } from "@/schemas/upgrade-membership.schema";
import membershipApiRequest from "@/app/apiRequests/upgrade-membership";
import { EditSubscriptionPlanResType } from "@/schemas/subscription-plan.schema";
import subscriptionPlanApiRequest from "@/app/apiRequests/subscription-plan";

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

  const [subPlan, setSubPlan] = useState<EditSubscriptionPlanResType | null>(
    null
  );

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccount(result.payload);
      } catch (error) {
        handleErrorApi({ error });
        router.push("/");
        router.refresh();
      }
    };
    fetchAccount();
  }, [router]);

  useEffect(() => {
    if (!account?.id) return;

    const fetchUserSubscription = async () => {
      try {
        const result = await accountApiRequest.userSubscriptionIdClient(
          account.id
        );
        setUserSubscription(result.payload);
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchUserSubscription();
  }, [account?.id]);

  useEffect(() => {
    if (!userSubscription?.plan_id) return;

    const fetchSubscriptionPlan = async () => {
      try {
        const result = await subscriptionPlanApiRequest.subscriptionPlanClient(
          userSubscription.plan_id
        );
        setSubPlan(result.payload);
        if (
          ["monthly_free", "yearly_free"].includes(result.payload.plan_title) ||
          result.payload.live_agent_takeover === false
        ) {
          toast({
            title: "error",
            description:
              "You have not subscribed to the service package, so you are not allowed to access this page!",
            variant: "destructive",
          });
          router.push("/home");
        }
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchSubscriptionPlan();
  }, [userSubscription?.plan_id, toast, router]);

  useEffect(() => {
    if (!account?.id) return;

    const fetchConversations = async () => {
      try {
        const result = await conversationApiRequest.conversationClient(
          account.id
        );
        const sortedConversations = result.payload.results.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        setConversation({ ...result.payload, results: sortedConversations });
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchConversations();
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
    <div className="w-full h-full bg:gray-50 shadow rounded-3xl">
      <div className="w-full h-[70px] bg:white flex justify-start items-center rounded-t-3xl">
        <div className="text-[24px] font-semibold leading-[141.667%] max-w-full px-7">
          <h1>Live Agent Takeover</h1>
        </div>
      </div>
      <Separator className=" bg:slate-300 " />
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
              {filteredConversation?.map((conversationItem, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link
                      className="flex justify-start items-center gap-3 font-medium"
                      href={`live-chat/live-chat-hybrid?conversation_id=${conversationItem.id}&chatbot_id=${conversationItem.chatbot_id}`}
                    >
                      <input
                        type="checkbox"
                        className="w-6 h-6 left-0 top-0 bg:white rounded-md border border-slate-300"
                        checked={conversationItem.is_active || false}
                      />
                      <div className=" text-[13px] leading-tight">
                        {conversationItem.conversation_name}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">
                    <ShowChatbot chatbot_id={conversationItem.chatbot_id} />
                  </TableCell>
                  <TableCell className="font-normal">
                    {conversationItem.is_taken ? "Open" : "Closed"}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(conversationItem.created_at).toUTCString()}
                  </TableCell>
                  <TableCell className="text-center font-normal">
                    {new Date(conversationItem.updated_at).toUTCString()}
                  </TableCell>
                </TableRow>
              ))}
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
