import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, MoveRight } from "lucide-react";
import React, { useState } from "react";
import "@/app/globals.css";
import CustomizeYourChatInterface from "./customize-your-chat-interface";
import { Separator } from "@/components/ui/separator";

const CustomizeChatbotBehavior = () => {
  const [step, setStep] = useState(1); // Thêm state để theo dõi bước hiện tại

  const handleNextStep = () => {
    // Cập nhật bước hiện tại khi nhấn nút "Next"
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    // Cập nhật bước hiện tại khi nhấn nút "Previous"
    setStep(step - 1);
  };
  return (
    <div>
      {/* Đây là ui 1 của customize */}
      {step === 1 && (
        <div>
          <div>
            <div className="flex justify-start pt-2 pb-5 pl-10 bg:white">
              <div className="w-[26px] h-[26px] bg-black rounded-full relative pt-5">
                <div className="absolute inset-y-[5px] inset-x-[10px] text-center text-white text-sm font-semibold leading-tight">
                  1
                </div>
              </div>
              <div className="flex items-center justify-center pl-[10px] text-zinc-800 text-sm font-semibold leading-snug">
                Customize Chatbot Behavior
              </div>
              <div className="flex items-center justify-center pl-[10px] pr-[10px]">
                <MoveRight className="w-5 shrink-0 opacity-50" />
              </div>
              <div className="w-[26px] h-[26px] bg-slate-300 rounded-full relative pt-5">
                <div className="absolute inset-y-[5px] inset-x-[9px] text-center text-white text-sm font-semibold leading-tight">
                  2
                </div>
              </div>
              <div className="flex items-center justify-center pl-[10px] pr-[20px] text-stone-500 text-sm font-normal leading-snug">
                Customize Your Chat Interface
              </div>
            </div>
          </div>
          <div className="pb-2">
            <Separator className=" bg-slate-300" />
          </div>
          <div className="flex w-full h-[500px] justify-center overflow-y-auto custom-scroll gap-12">
            {/* <ChatbotConfig /> */}
            {/* <CustomizeYourChatInterface /> */}
            {/* <PoweredByAllyAI /> */}
            <div className="flex items-center justify-center overflow-y-auto custom-scroll">
              <div className="w-[565px] h-[436px] bg-white rounded-xl border border-slate-300 ">
                <div className="text-zinc-800 text-xl font-semibold leading-[30px] py-8 pl-8">
                  Customize Chatbot Behavior
                </div>
                <div className="text-zinc-900 text-sm font-semibold leading-normal pb-2 pl-8">
                  Base prompt (system message)
                </div>
                <div className="px-8">
                  <Textarea
                    placeholder="You are a helpful assistant. The first prompt will be a long text, and any messages that you get be regarding that. Please answer any questions and requests having in mind the first prompt."
                    defaultValue="You are a helpful assistant. The first prompt will be a long text, and any messages that you get be regarding that. Please answer any questions and requests having in mind the first prompt."
                    className="w-[493px] h-[108px] px-[15px] py-3 bg-white rounded-md border border-slate-300 text-[14px] font-normal leading-[20px] text-slate-900 resize-none overflow-y-auto custom-scroll"
                  />
                </div>
                {/* Nút Next */}
                {step < 2 && (
                  <div
                    className="flex items-center justify-center py-10"
                    onClick={handleNextStep}
                  >
                    <Button className="w-[505px] h-[50px] py-3.5 bg-neutral-900 rounded-md border justify-center items-center gap-1.5 inline-flex text-white">
                      <div className="relative">
                        <Check className="w-4 h-4 shrink-0 opacity-50 text-white" />
                      </div>
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Đây là ui 2 của customize */}
      {step === 2 && <CustomizeYourChatInterface />}
    </div>
  );
};

export default CustomizeChatbotBehavior;
