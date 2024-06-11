"use client";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState, useTransition } from "react";
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

import { cn, handleErrorApi } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import accountApiRequest from "@/app/apiRequests/account";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import { ChatbotResListType } from "@/schemas/chatbot.schema";
import DashboardTableAdminForm from "./dashboard-table-admin";

const ChatbotListOfUserForm = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const userName = searchParams.get("user_name");
  const [selectedOption, setSelectedOption] = useState("Daily");
  const [newState, setNewState] = useState<{ type: string; date: string }>({
    type: "day",
    date: new Date().toISOString().split("T")[0],
  });
  const [chatbot, setChatbot] = useState<ChatbotResListType | null>(null);

  const handleClick = (option: "Daily" | "Monthly" | "Yearly") => {
    setSelectedOption(option);
    switch (option) {
      case "Daily":
        setNewState({
          type: "day",
          date: new Date().toISOString().split("T")[0],
        });
        break;
      case "Monthly":
        setNewState({
          type: "month",
          date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
            .toString()
            .padStart(2, "0")}`,
        });
        break;
      case "Yearly":
        setNewState({ type: "year", date: `${new Date().getFullYear()}` });
        break;
      default:
        setNewState({
          type: "day",
          date: new Date().toISOString().split("T")[0],
        });
    }
  };

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (userId) {
          const result = await chatbotApiRequest.chatbotClient(userId);
          // Sắp xếp danh sách cuộc trò chuyện theo thời gian cập nhật mới nhất
          const sortedChatbots = result.payload.results.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );
          setChatbot(result.payload);

          // console.log(result.payload);
        }
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, [userId]);

  return (
    <div>
      <div className="w-full h-full bg-gray-50 shadow rounded-3xl">
        <div className="w-full h-[70px] bg-white flex justify-start items-center rounded-t-3xl relative">
          <div className="text-[24px] font-semibold leading-[141.667%] max-w-full px-7">
            <h1>Chatbot Name</h1>
          </div>
          <h1 className="absolute right-10 text-[20px] font-semibold leading-[141.667%] text-sky-600 uppercase w-[244px] overflow-hidden whitespace-nowrap text-ellipsis flex justify-end">
            {userName}
          </h1>
          <div className="w-[268px] h-11 bg-gray-100 rounded-xl absolute right-96 flex justify-center items-center">
            <div
              className={`w-20 h-[30px] px-4 py-[5px] ${
                selectedOption === "Daily" ? "bg-zinc-900" : ""
              } rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer`}
              onClick={() => handleClick("Daily")}
            >
              <div
                className={`${
                  selectedOption === "Daily" ? "text-white" : "text-zinc-900"
                } text-sm font-normal leading-tight`}
              >
                Daily
              </div>
            </div>
            <div
              className={`w-20 h-[30px] px-4 py-[5px] ${
                selectedOption === "Monthly" ? "bg-zinc-900" : ""
              } rounded-lg  justify-center items-center gap-2.5 inline-flex cursor-pointer`}
              onClick={() => handleClick("Monthly")}
            >
              <div
                className={`${
                  selectedOption === "Monthly" ? "text-white" : "text-zinc-900"
                } text-sm font-normal leading-tight`}
              >
                Monthly
              </div>
            </div>
            <div
              className={`w-20 h-[30px] px-4 py-[5px] ${
                selectedOption === "Yearly" ? "bg-zinc-900" : ""
              } rounded-lg  justify-center items-center gap-2.5 inline-flex cursor-pointer`}
              onClick={() => handleClick("Yearly")}
            >
              <div
                className={`${
                  selectedOption === "Yearly" ? "text-white" : "text-zinc-900"
                } text-sm font-normal leading-tight`}
              >
                Yearly
              </div>
            </div>
          </div>
        </div>
        <Separator className=" bg-slate-300 " />
        <div className="w-full h-[660px] justify-center overflow-y-auto custom-scroll rounded-b-3xl">
          <div className=" flex justify-center items-center">
            <DashboardTableAdminForm
              formData={newState}
              user_id={userId || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotListOfUserForm;
