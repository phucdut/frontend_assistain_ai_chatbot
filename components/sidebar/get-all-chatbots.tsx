"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSidebarStore } from "@/stores/sidebar-stores";
import { cn } from "@/lib/utils";

const AllChatbots = () => {
  const { isMinimal, handleClose } = useSidebarStore();

  return (
    <div
      className={cn(
        isMinimal && "px-3",
        "flex items-center justify-between  py-3"
      )}
      onClick={handleClose}
    >
      <Link href="/info-chatbot">
        {isMinimal && (
          <div>
            <Image width={21} height={21} src="/icons/Icon.svg" alt="a" />
          </div>
        )}
        {!isMinimal && (
          <div className="flex items-center justify-between px-5">
            <div className="flex items-center rounded-lg opacity-70 gap-2">
              <Image width={16} height={16} src="/icons/Icon.svg" alt="a" />
              <div className="flex items-center justify-between gap-5">
                <Link href="/info-chatbot">
                  <span className="text-[#8E98A4] text-[14px] font-normal leading-[26px] uppercase pr-[58px] ">
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
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default AllChatbots;
