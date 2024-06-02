import React from "react";
import "@/app/globals.css";
import { Separator } from "@/components/ui/separator";
import PositiveForm from "./positive-dashboard-form";
import DashboardTableForm from "./dashboard-table";
import DatapointDashboardForm from "./datapoint-dashboard-form";
import ValidJsonDashboardFrom from "./valid-json-dashboard-from";
import LatencySecondDashboardForm from "./latency-second-dashboard-form";

const DashBoardForm = () => {
  return (
    <div>
      <div className="w-full h-full bg-gray-50 shadow rounded-3xl">
        <div className="w-full h-[70px] bg-white flex justify-start items-center rounded-t-3xl">
          <div className="text-[24px] font-semibold leading-[141.667%] max-w-full px-7">
            <h1>Dashboard</h1>
          </div>
        </div>
        <Separator className=" bg-slate-300 " />
        <div className="w-full h-[660px] justify-center overflow-y-auto custom-scroll">
          <div className="flex justify-center items-center gap gap-12 pt-8">
            <div className="w-[502px] h-[222px] bg-white rounded-xl border border-slate-300 overflow-y-auto custom-scroll" >
              <PositiveForm />
            </div>
            <div className="w-[502px] h-[222px] bg-white rounded-xl border border-slate-300 overflow-y-auto custom-scroll" >
              <DatapointDashboardForm />
            </div>
          </div>
          <div className="flex justify-center items-center gap gap-12 py-8">
            <div className="w-[502px] h-[222px] bg-white rounded-xl border border-slate-300 overflow-y-auto custom-scroll"  >
              <ValidJsonDashboardFrom />
            </div>
            <div className="w-[502px] h-[222px] bg-white rounded-xl border border-slate-300 overflow-y-auto custom-scroll" >
              <LatencySecondDashboardForm />
            </div>
          </div>
          <div className=" flex justify-center items-center" >
            <DashboardTableForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardForm;
