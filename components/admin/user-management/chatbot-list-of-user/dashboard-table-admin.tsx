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
import ShowValueVisitorTable from "../../dashboard/show_value_visitor_table";
import ShowValueRatingScoreTable from "../../dashboard/show_value_rating_score_table";
import Link from "next/link";

type FormData = {
  type: string;
  date: string;
};

type Props = {
  formData: FormData;
  user_id: string;
};

const DashboardTableAdminForm = ({ formData, user_id }: Props) => {
  const [chatbot, setChatbot] = useState<ChatbotResListType | null>(null);
  const [selectedChatbotId, setSelectedChatbotId] = useState<string | null>(
    null
  );
  const [conversationDashboard, setConversationDashboard] =
    useState<ConversationAndChatbotResType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (user_id) {
          const result = await chatbotApiRequest.chatbotClient(user_id);
          setChatbot(result.payload);
          // console.log(result.payload);
        }
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, [user_id]);

  return (
    <div className="w-full h-[660px] justify-center overflow-y-auto custom-scroll rounded-b-3xl">
      <div className="pt-0 w-full h-[400px] lg:pb-7 overflow-auto custom-scroll ">
        <TableDashboard className="">
          <TableCaption></TableCaption>
          <TableHeader className="bg:gray-50 ">
            <TableRow>
              <TableHead className=" text-[13px] font-semibold leading-tight">
                Chatbot Name
              </TableHead>
              <TableHead className=" text-[13px] font-semibold leading-tight">
                Model
              </TableHead>
              <TableHead className=" text-[13px] font-semibold leading-tight">
                Visitors
              </TableHead>
              <TableHead className="text-center  text-[13px] font-semibold leading-tight">
                Rating
              </TableHead>
              <TableHead className="text-center  text-[13px] font-semibold leading-tight">
                Total messages
              </TableHead>
              <TableHead className="text-center  text-[13px] font-semibold leading-tight">
                Total tokens
              </TableHead>
              <TableHead className="text-center  text-[13px] font-semibold leading-tight">
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
                      className="w-6 h-6 left-0 top-0 bg:white rounded-md border border-slate-300"
                      checked={chatbotItem?.is_active || false}
                    ></input> */}
                    <Link
                      className="flex justify-start items-center gap-3 font-medium"
                      href={`/user-management/chatbots-list/conversation?&chatbot_id=${chatbotItem.id}`}
                    >
                      <div className=" text-[13px] font-semibold leading-tight">
                        {chatbotItem.chatbot_name}
                      </div>
                    </Link>
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
                  {/* <TableCell></TableCell>
                  <TableCell></TableCell> */}
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

export default DashboardTableAdminForm;
