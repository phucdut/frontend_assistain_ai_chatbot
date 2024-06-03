"use client";

import React, { useState } from "react";
import "@/app/globals.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectScrollUpButton,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import PositiveForm from "./visitors-dashboard-form";
import DashboardTableForm from "./dashboard-table";
import { Calendar } from "@/components/ui/calendar";
import DatapointDashboardForm from "./inboxes-dashboard-form";
import ValidJsonDashboardFrom from "./rating-dashboard-from";
import LatencySecondDashboardForm from "./latency-second-dashboard-form";
import { SwitchDashboard } from "@/components/ui/switch-dashboard";

const DashBoardForm = () => {
  const [selectedOption, setSelectedOption] = useState("Daily");

  const handleClick = (option: "Daily" | "Weekly" | "Monthly") => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="w-full h-full bg-gray-50 shadow rounded-3xl ">
        <div className="w-full h-[70px] bg-white flex justify-start items-center rounded-t-3xl relative">
          <div className=" text-[24px] font-semibold leading-[141.667%] max-w-full px-7 ">
            <h1>Dashboard</h1>
          </div>
          <div className="absolute right-0">
            <Select>
              <SelectTrigger className="w-40 text-[16px] font-medium leading-[26px] mx-5 ">
                <SelectValue placeholder="Last 30 days" />
              </SelectTrigger>
              <SelectContent className="w-40 text-[16px] font-medium leading-[26px]">
                <SelectItem value="Last 3 months">Last 3 months</SelectItem>
                <SelectItem value="Last 6 months">Last 6 months</SelectItem>
                <SelectItem value="Last 12 months">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[268px] h-11 bg-gray-100 rounded-xl absolute right-52 flex justify-center items-center">
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
                selectedOption === "Weekly" ? "bg-zinc-900" : ""
              } rounded-lg  justify-center items-center gap-2.5 inline-flex cursor-pointer`}
              onClick={() => handleClick("Weekly")}
            >
              <div
                className={`${
                  selectedOption === "Weekly" ? "text-white" : "text-zinc-900"
                } text-sm font-normal leading-tight`}
              >
                Weekly
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
          </div>
        </div>
        <Separator className=" bg-slate-300 " />
        <div className="w-full h-[660px] justify-center overflow-y-auto custom-scroll">
          <div className="flex justify-center items-center gap gap-12 pt-8">
            <div className="w-[502px] h-[222px] bg-white rounded-xl border border-slate-300 overflow-y-auto custom-scroll">
              <PositiveForm />
            </div>
            <div className="w-[502px] h-[222px] bg-white rounded-xl border border-slate-300 overflow-y-auto custom-scroll">
              <DatapointDashboardForm />
            </div>
          </div>
          <div className="flex justify-center items-center gap gap-12 py-8">
            <div className="w-[502px] h-[222px] bg-white rounded-xl border border-slate-300 overflow-y-auto custom-scroll">
              <LatencySecondDashboardForm />
            </div>
            <div className="w-[502px] h-[222px] bg-white rounded-xl border border-slate-300 overflow-y-auto custom-scroll">
              <ValidJsonDashboardFrom />
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <DashboardTableForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardForm;
