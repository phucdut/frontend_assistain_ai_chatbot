"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSidebarStore } from "@/stores/sidebar-stores";
import { cn } from "@/lib/utils";

const AllChatbots = () => {
  const { isMinimal, handleClose } = useSidebarStore();

  return (
    <div className="flex items-center justify-between">
      <Link
        href={"#"}
        onClick={handleClose}
        
      >
        <div
          className={cn(
            isMinimal && "px-1",
            "flex items-center justify-between gap-2"
          )}
        >
          <div className="flex items-center py-1 rounded-lg pl-5 opacity-70">
            <Image width={16} height={16} src="/icons/Icon.svg" alt="a" />
          </div>
          {!isMinimal && (
            <div className="flex items-center justify-between">
              <Link href="/info-chatbot">
                <span className="text-[#8E98A4] text-[14px] font-normal leading-[26px] uppercase py-3 pr-[70px] pl-0">
                  Elon Musk AI
                </span>
              </Link>
              <Image
                width={16}
                height={16}
                src="/icons/Fill - Edit - Pen.svg"
                alt="a"
              />
              <Image
                width={16}
                height={16}
                src="/icons/Fill - Share 6.svg"
                alt="a"
              />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default AllChatbots;
