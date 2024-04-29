import Image from "next/image";
import React from "react";

import {
  SelectGPTs,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectScrollUpButton,
} from "@/components/ui/select-chatGPTs";
import { ChevronsUpDown } from "lucide-react";

import { useSidebarStore } from "@/stores/sidebar-stores";
import { cn } from "@/lib/utils";

const AllVersionChatGPTs = () => {
  const { isMinimal, handleClose } = useSidebarStore();

  return (
    <div
      className={cn(
        isMinimal && "px-3",
        "flex items-center justify-between my-3"
      )}
      onClick={handleClose}
    >
      {isMinimal && (
        <div>
          <Image
              width={24}
              height={24}
              src="/icons/Fill - GPT - Core.svg"
              alt="a"
              className=""
            />
        </div>
      )}
      {!isMinimal && (
        <SelectGPTs>
          <SelectTrigger className="w-64 text-[16px] font-medium leading-[26px] text-[#fff] pl-10 relative mx-5">
            <Image
              width={24}
              height={24}
              src="/icons/Fill - GPT - Core.svg"
              alt="a"
              className="absolute inset-x-1 inset-y-2  w-6 h-6 "
            />
            <SelectValue placeholder="GPT-3.5-Turbo" />
          </SelectTrigger>
          <SelectContent className="w-56 text-[16px] font-medium leading-[26px] text-[#fff]">
            <SelectItem value="GPT-3.5-Turbo1">GPT-3.5-Turbo</SelectItem>
            <SelectItem value="GPT-4-Turbo2">GPT-4.0-Turbo</SelectItem>
            <SelectItem value="GPT-3.5-Turbo3">GPT-4.0-TurboPlus</SelectItem>
          </SelectContent>
        </SelectGPTs>
      )}
    </div>
  );
};

export default AllVersionChatGPTs;
