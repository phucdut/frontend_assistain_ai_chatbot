"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSidebarStore } from "@/stores/sidebar-stores";
import { cn, handleErrorApi } from "@/lib/utils";
import { ChatbotResListType, ChatbotResType } from "@/schemas/chatbot.schema";
import chatbotApiRequest from "@/app/apiRequests/chatbot";

const AllChatbots = () => {
  const { isMinimal, handleClose } = useSidebarStore();
  const [chatbot, setChatbot] = useState<ChatbotResListType | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await chatbotApiRequest.chatbotClient();
        setChatbot(result.payload);
        console.log(result.payload);
      } catch (error) {
        handleErrorApi({
          error,
        });
      }
    };
    fetchRequest();
  }, []);

  return (
    <div
      className={cn(
        isMinimal && "px-3",
        "justify-between  py-3"
      )}
      onClick={handleClose}
    >
      {chatbot?.results.map(
                (
                  chatbotItem: ChatbotResListType["results"][0],
                  index: number
                ) => (
      <div key={index} >
        <Link href={`/chatbots/${chatbotItem.id}`}>
          {isMinimal && (
            <div>
              <Image width={21} height={21} src="/icons/Icon.svg" alt="a" className="py-1"/>
            </div>
          )}
          {!isMinimal && (
            <div className="pt-0">
                  <div  className="mb-0">
                    <div className="flex items-center justify-between px-6">
                      <div className="flex items-center rounded-lg opacity-70 gap-3">
                        <Image
                          width={16}
                          height={16}
                          src="/icons/Icon.svg"
                          alt="a"
                        />
                        <div className="flex items-center justify-between gap-5">
                          <span className="text-[#8E98A4] text-[14px] font-normal leading-[26px] uppercase pr-[58px] w-[140px]">
                            <div>{chatbotItem.chatbot_name}</div>
                          </span>
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
                    {/* Render other chatbot information here */}
                  </div>
                
            </div>
          )}
        </Link>
      </div>
      )
    )}
    </div>
  );
};

export default AllChatbots;
