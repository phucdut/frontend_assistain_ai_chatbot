"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  InboxesAndLatencyListType,
  VisitorAndRatingListType,
} from "@/schemas/dashboard.schema";
import { ChatbotResListType } from "@/schemas/chatbot.schema";
import { AccountResType } from "@/schemas/account.schema";
import { useRouter } from "next/navigation";
import accountApiRequest from "@/app/apiRequests/account";
import { handleErrorApi } from "@/lib/utils";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import dashboardApiRequest from "@/app/apiRequests/dashboard";
import { Select } from "@/components/ui/select";

type FormData = {
  type: string;
  date: string;
};

type Props = {
  formData: FormData;
};

const VisitorForm = ({ formData }: Props) => {
  const [selectedChatbotId, setSelectedChatbotId] = useState<string>("");
  const [chatbot, setChatbot] = useState<ChatbotResListType | null>(null);
  const [account, setAccount] = useState<AccountResType | null>(null);
  const [conversationChartDashboard, setConversationChartDashboard] =
    useState<VisitorAndRatingListType | null>(null);
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

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result =
          await dashboardApiRequest.dashboardConversationChartClient(
            formData?.type,
            formData?.date,
            selectedChatbotId
          );
        // console.log(result.payload); // Kiểm tra dữ liệu trả về
        setConversationChartDashboard(result.payload);
      } catch (error) {
        handleErrorApi({
          error,
        });
      }
    };
    fetchRequest();
  }, [formData?.type, formData?.date, selectedChatbotId]);

  return (
    <div className="w-full h-full shadow rounded-xl ">
      {/* <div>{formData.date}</div> */}
      <div className="flex justify-start items-center relative">
        <div className="text-zinc-900 text-base font-semibold leading-normal py-5 pl-5">
          Visitors
        </div>
        <div className="absolute left-32 top-6 text-sm rounded-lg">
          <select
            onChange={(e) => setSelectedChatbotId(e.target.value)}
            value={selectedChatbotId}
            className="rounded-sm"
          >
            <option value="" disabled>
              Select a chatbot
            </option>
            {chatbot?.results.map(
              (
                chatbotItem: ChatbotResListType["results"][0],
                index: number
              ) => (
                <option key={index} value={chatbotItem.id}>
                  {chatbotItem.chatbot_name}
                </option>
              )
            )}
          </select>
        </div>
        <div className="absolute right-6 top-6">
          <Image
            src="/icons/OL - Fullscreen.svg"
            alt="x"
            width={14.5}
            height={14.5}
            className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
          />
        </div>
      </div>

      <div>
        {conversationChartDashboard && (
          <div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={conversationChartDashboard}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time_point"
                  tickLine={false}
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                />
                <Tooltip formatter={(value) => `${value}`} />
                <Line
                  type="linear"
                  dataKey="visitor_cost"
                  stroke="#432e6d"
                  strokeWidth={1.5}
                  dot={{ r: 4, fill: "#FFF" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorForm;
