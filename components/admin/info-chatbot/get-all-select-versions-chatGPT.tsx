import Image from "next/image";
import React from "react";

import {
  SelectGPT,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectScrollUpButton,
} from "@/components/ui/select-chatGPT";

const AllVersionChatGPTs = () => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center py-1 rounded-lg pl-5 opacity-70 pr-3 *:">
        <Image
          width={24}
          height={24}
          src="/icons/Fill - GPT - Core.svg"
          alt="a"
        />
      </div>
      <SelectGPT>
        <div className="w-44 text-[16px] font-medium leading-[26px] text-[#000]">
          <SelectTrigger>
            <SelectValue placeholder="GPT-3.5-Turbo" />
          </SelectTrigger>
        </div>
        <SelectContent className="w-56 text-[16px] font-medium leading-[26px] text-[#000]">
          <SelectItem value="GPT-3.5-Turbo1">GPT-3.5-Turbo</SelectItem>
          <SelectItem value="GPT-4-Turbo2">GPT-4.0-Turbo</SelectItem>
          <SelectItem value="GPT-3.5-Turbo3">GPT-4.0-TurboPlus</SelectItem>
        </SelectContent>
      </SelectGPT>
    </div>
  );
};

export default AllVersionChatGPTs;
