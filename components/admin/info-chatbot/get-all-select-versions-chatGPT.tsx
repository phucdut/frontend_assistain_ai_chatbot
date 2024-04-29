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
    <div className="flex items-center justify-between pl-2 pb-0">
      <SelectGPT>
        <SelectTrigger className="w-44 h-5 text-[16px] font-medium leading-[26px] text-[#000] pl-10 relative">
          <Image
            width={24}
            height={24}
            src="/icons/Fill - GPT - Core.svg"
            alt="a"
            className="absolute inset-x-1 inset-y-0  w-6 h-5"
          />
          <SelectValue placeholder="GPT-3.5-Turbo" />
        </SelectTrigger>
        <SelectContent className="w-44 text-[16px] font-medium leading-[26px] text-[#000]">
          <SelectItem value="GPT-3.5-Turbo1">GPT-3.5-Turbo</SelectItem>
          <SelectItem value="GPT-4-Turbo2">GPT-4.0-Turbo</SelectItem>
          <SelectItem value="GPT-3.5-Turbo3">GPT-4.0-TurboPlus</SelectItem>
        </SelectContent>
      </SelectGPT>
    </div>
  );
};

export default AllVersionChatGPTs;

