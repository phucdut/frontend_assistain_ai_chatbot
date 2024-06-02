import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import "@/app/globals.css";

const PoweredByAllyAI = () => {
  return (
    <div>
      <div className="w-[370px] h-[500px] max-w-full max-h-full overflow-y-auto custom-scroll bg-gray-50 rounded-xl shadow border border-slate-300 ">
        <div className="flex items-center justify-between px-4 pt-2 h-[60px] rounded-xl bg-white w-full">
          <Image src="/Horizontal-logo.png" alt="logo" width={36} height={36} />
          <div className="opacity-50 text-center text-neutral-900 text-[13px] font-normal leading-[18px]">
            Powered by Ally AI
          </div>
          <X className="w-4 h-4 relative" />
        </div>
        <div className="px-1 pt-3 relative">
          <div className="w-[310px] h-[370px] flex flex-col space-y-2">
            <div className="w-[230px] h-[44px] rounded-xl shadow pl-5">
              <div className="text-neutral-900 text-base font-normal leading-9">
                👋 What is Ally AI
              </div>
            </div>
            <div className="flex justify-start items-center w-[280px] h-[44px] rounded-xl shadow pl-5">
              <div className="text-neutral-900 text-base font-normal leading-9">
                Tell me ten things I can do with
              </div>
            </div>
            <div className="flex justify-start items-center w-[230px] h-[44px] rounded-xl shadow pl-5">
              <div className="text-neutral-900 text-base font-normal leading-9">
                How do I get started with
              </div>
            </div>
          </div>
          
          <div className="text-[16px] font-normal leading-[18px] relative w-full">
            <Input
              placeholder="Write your message"
              type="email"
              className="h-[55px] w-full"
            />
            <Button className="absolute inset-y-1.5 right-4 w-11 h-11">
              <Image
                src="/paper-plane 1.svg"
                alt="send"
                width={20}
                height={20}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoweredByAllyAI;
