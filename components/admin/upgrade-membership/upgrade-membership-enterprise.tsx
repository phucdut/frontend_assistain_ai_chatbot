import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

const UpgradeMembershipEnterprise = () => {
  return (
    <div>
      <div className="w-full h-[574px] bg-white rounded-xl border border-slate-300">
        <div className="w-full h-[184px] bg-zinc-900 rounded-xl border border-slate-300 pl-6 py-6 ">
          <div className="text-white text-sm font-bold  uppercase leading-snug">
            Enterprise
          </div>
          <div className="pt-2 pb-11">
            <div className="text-white text-sm font-normal leading-tight">
              Contact
            </div>
          </div>
          <div className="w-[273px] h-11 px-[15px] py-3 bg-white rounded-xl justify-center items-center gap-1.5 inline-flex">
            <div className="text-zinc-900 text-sm font-semibold leading-tight">
              Contact Us
            </div>
          </div>
        </div>
        <div className="pl-6 pt-7">
          <div className="flex justify-start items-center gap-2 ">
            <Check className="w-3 h-3" />
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              GPT-4 LLM
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 pt-4">
            <Image
              src="/OL - Infinity.svg"
              alt="OL - Infinity"
              width={12}
              height={12}
            ></Image>
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              Unlimited mess credits
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 pt-4">
            <Image
              src="/OL - Infinity.svg"
              alt="OL - Infinity"
              width={12}
              height={12}
            ></Image>
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              Unlimited chatbot
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 pt-4 pb-6">
            <Image
              src="/OL - Infinity.svg"
              alt="OL - Infinity"
              width={12}
              height={12}
            ></Image>
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              Unlimited characters per chatbot
            </div>
          </div>
        </div>
        <div className="w-[321px] h-[224px] bg-orange-100 rounded-xl border border-slate-300">
          <div className="pt-6 pl-6">
            <Image src="/Group (3).svg" alt="x" width={24} height={22} />
            <div className="text-zinc-800 text-sm font-semibold leading-snug pt-2 pb-3">
              Everything in Premium, plus
            </div>
            <div className="flex justify-start items-center gap-2">
              <Check className="w-3 h-3" />
              <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight ">
                Llama 2 and Falcon LLMs
              </div>
            </div>
            <div className="flex justify-start items-center gap-2 pt-4">
              <Check className="w-3 h-3" />
              <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight ">
                Custom instance of white-labelled Ally AI application
              </div>
            </div>
            <div className="flex justify-start items-center gap-2 pt-4">
              <Check className="w-3 h-3" />
              <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight ">
                Custom integrations
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeMembershipEnterprise;
