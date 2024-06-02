import { Check } from "lucide-react";
import React from "react";

const UpgradeMembershipFree = () => {
  return (
    <div>
      <div className="w-[321px] h-[422px] bg-white rounded-xl border border-slate-300">
        <div className="w-full h-[184px] bg-zinc-900 rounded-xl border border-slate-300 pl-6 py-6">
          <div className="text-white text-sm font-bold  uppercase leading-snug">
            Free
          </div>
          <div className="relative pt-1 pb-4">
            <span className="text-white text-4xl font-bold font-['Oswald'] leading-[50px]">
              $0
            </span>
            <div className="text-white text-sm font-normal leading-tight absolute inset-y-7 inset-x-10">
              per month
            </div>
          </div>
          <div className="w-[273px] h-11 px-[15px] py-3 bg-zinc-800 rounded-xl justify-center items-center gap-1.5 inline-flex">
            <div className="text-white text-sm font-semibold leading-tight">
              Current Plan
            </div>
          </div>
        </div>
        <div className="pl-6 pt-7">
          <div className="flex justify-start items-center gap-2 ">
            <Check className="w-3 h-3" />
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              GPT-3.5-Turbo LLM
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 pt-4">
            <Check className="w-3 h-3" />
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              30 message credits
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 pt-4">
            <Check className="w-3 h-3" />
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              1 chatbot
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 pt-4">
            <Check className="w-3 h-3" />
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              200,000 characters per chatbot
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 pt-4">
            <Check className="w-3 h-3" />
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              Embed on unlimited websites
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 pt-4">
            <Check className="w-3 h-3" />
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              Upload multiple files
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeMembershipFree;
