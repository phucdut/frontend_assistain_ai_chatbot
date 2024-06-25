"use client";

import React, { useEffect, useState } from "react";
import "@/app/globals.css";

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
import withReactContent from "sweetalert2-react-content";
import { useSidebarStore } from "@/stores/sidebar-stores";
import { ChatbotResListType } from "@/schemas/chatbot.schema";
import { AccountResType } from "@/schemas/account.schema";
import { useRouter } from "next/navigation";
import accountApiRequest from "@/app/apiRequests/account";
import { handleErrorApi } from "@/lib/utils";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import dashboardApiRequest from "@/app/apiRequests/dashboard";
import { ConversationAndChatbotResType } from "@/schemas/dashboard.schema";
import ShowValueVisitorTable from "./show_value_visitor_table";
import ShowValueRatingScoreTable from "./show_value_rating_score_table";

type FormData = {
  type: string;
  date: string;
};

type Props = {
  formData: FormData;
};

const DashboardTableForm = ({ formData }: Props) => {
  const [chatbot, setChatbot] = useState<ChatbotResListType | null>(null);
  const [selectedChatbotId, setSelectedChatbotId] = useState<string | null>(
    null
  );
  const [account, setAccount] = useState<AccountResType | null>(null);
  const [conversationDashboard, setConversationDashboard] =
    useState<ConversationAndChatbotResType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccount(result.payload);
        // console.log(result);
      } catch (error) {
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
          const result = await chatbotApiRequest.chatbotClient(account?.id);
          setChatbot(result.payload);
          // console.log(result.payload);
        }
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, [account?.id]);

  return (
    <div className="w-[1050px] h-[500px] bg:white rounded-xl border border-slate-300">
      <div className="w-full flex justify-start gap-14 py-5 pl-5">
        <div className="flex justify-start relative">
          <div className="text-[13px] font-normal leading-tight pl-2 w-14">
            Chatbots
          </div>
          <div className="text-2xl font-semibold leading-[34px] absolute left-20 top-[-8px]">
            {chatbot?.total}
          </div>
        </div>
      </div>
      <div className="pt-0 w-full h-[400px] lg:pb-7 overflow-auto custom-scroll ">
        <TableDashboard className="border border-slate-300">
          <TableCaption></TableCaption>
          <TableHeader className="bg:gray-50 ">
            <TableRow>
              <TableHead className="text-[13px] font-semibold leading-tight">
                Chatbot Name
              </TableHead>
              <TableHead className="text-[13px] font-semibold leading-tight">
                Model
              </TableHead>
              <TableHead className="text-[13px] font-semibold leading-tight">
                Visitors
              </TableHead>
              {/* <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight">
                Inboxes
              </TableHead>
              <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight">
                Latency
              </TableHead> */}
              <TableHead className="text-center text-[13px] font-semibold leading-tight">
                Rating
              </TableHead>
              <TableHead className="text-center text-[13px] font-semibold leading-tight">
                Total messages
              </TableHead>
              <TableHead className="text-center text-[13px] font-semibold leading-tight">
                Total tokens
              </TableHead>
              <TableHead className="text-center text-[13px] font-semibold leading-tight">
                Date create
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chatbot?.results.map(
              (
                chatbotItem: ChatbotResListType["results"][0],
                index: number
              ) => (
                <TableRow key={index}>
                  <TableCell className="flex justify-start items-center gap-3">
                    {/* <input
                      type="checkbox"
                      className="w-6 h-6 left-0 top-0 bg-white rounded-md border border-slate-300"
                    ></input> */}
                    <div className="text-[13px] font-semibold leading-tight">
                      {chatbotItem.chatbot_name}
                    </div>
                  </TableCell>
                  <TableCell className="">{chatbotItem.model}</TableCell>
                  <TableCell>
                    {chatbotItem && (
                      <ShowValueVisitorTable
                        formData={formData}
                        chatbot_id={chatbotItem?.id}
                      />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {chatbotItem && (
                      <ShowValueRatingScoreTable
                        formData={formData}
                        chatbot_id={chatbotItem?.id}
                      />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {chatbotItem.total_messages}
                  </TableCell>
                  <TableCell className="text-center">
                    {chatbotItem.total_tokens}
                  </TableCell>
                  <TableCell className="flex justify-center">
                    {new Date(chatbotItem.created_at).toUTCString()}
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
  );
};

export default DashboardTableForm;
