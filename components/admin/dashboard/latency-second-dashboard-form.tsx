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
} from "recharts";
import { InboxesAndLatencyListType } from "@/schemas/dashboard.schema";
import dashboardApiRequest from "@/app/apiRequests/dashboard";
import { handleErrorApi } from "@/lib/utils";

type FormData = {
  type: string;
  date: string;
};

type Props = {
  formData: FormData;
  conversation_id: string;
};

const LatencySecondDashboardForm = ({ formData, conversation_id }: Props) => {
  const [conversationChartDashboard, setConversationChartDashboard] =
    useState<InboxesAndLatencyListType>([]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await dashboardApiRequest.dashboardMessageChartClient(
          formData?.type,
          formData?.date,
          conversation_id
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
  }, [formData?.type, formData?.date, conversation_id]);

  return (
    <div className="w-full h-full shadow rounded-xl relative">
      <div className="text-zinc-900 text-base font-semibold leading-normal py-5 pl-5">
        Latency (seconds)
      </div>
      <div className="absolute right-6 top-6">
        <Image
          src="/icons/OL - Fullscreen.svg"
          alt="x"
          width={14.5}
          height={14.5}
          className=" transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
        />
      </div>
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
              dataKey="latency_average"
              stroke="#44f51d"
              strokeWidth={1.5}
              dot={{ r: 1, fill: "#FFF" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LatencySecondDashboardForm;
