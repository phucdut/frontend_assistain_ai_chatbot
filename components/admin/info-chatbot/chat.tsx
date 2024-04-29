'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Chat = () => {
  return (
    <div className={cn(
      "bg-custom-gray-4 h-[calc(100vh-180px)] w-[1130px]",
      "lg:rounded-3xl lg:p-7"
    )}>
      <div className="flex justify-center pt-0">Chat</div>
      <div className="pl-8 pb-0 relative">
        <div className="text-[16px] font-normal leading-[18px] relative w-[1020px]">
          <Input
            placeholder="Write your message"
            type="email"
            className="inputChat mt-96 "
          />
          <Button className="absolute inset-y-2 right-11 flex items-center justify-between w-[44px] h-[44px]">
            <Image
              src="/icons/Fill - Voice - Mic.svg"
              alt="send"
              width={20}  
              height={20}
              className="flex-shrink-0"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
