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
  chatbot_id: string;
};

const RatingCoreDashboardFrom = ({ formData, chatbot_id }: Props) => {
  const [conversationChartDashboard, setConversationChartDashboard] =
    useState<VisitorAndRatingListType | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        console.log('Fetching data for chatbot_id:', chatbot_id);
        if (!chatbot_id) {
          console.error('Invalid chatbot_id:', chatbot_id);
          return;
        }
  
        const url = `/api/v1/dashboard/chart/${formData?.type}/${formData?.date}/conversation/${chatbot_id}`;
        console.log('API URL:', url);
        const result =
          await dashboardApiRequest.dashboardConversationChartClient(
            formData?.type,
            formData?.date,
            chatbot_id
          );
          console.log('API Result:', result);
        // console.log(result.payload); // Kiểm tra dữ liệu trả về
        setConversationChartDashboard(result.payload);
      } catch (error) {
        handleErrorApi({
          error,
        });
      }
    };
    fetchRequest();
  }, [formData?.type, formData?.date, chatbot_id]);

  return (
    <div className="w-full h-full shadow rounded-xl ">
      {/* <div>{formData.date}</div> */}
      <div className="flex justify-start items-center relative">
        <div className="text-base font-semibold leading-normal py-5 pl-5">
          Rating
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
                  dataKey="rating_average"
                  stroke="#ad743e"
                  strokeWidth={1.5}
                  dot={{ r: 1, fill: "#FFF" }}
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

export default RatingCoreDashboardFrom;
