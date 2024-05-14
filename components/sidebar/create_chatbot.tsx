"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-stores";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ComponentCreateChatbot } from "../admin/home/component-create-chatbot";

const CreateChatbot = () => {
  const { isMinimal, handleClose } = useSidebarStore();
  return (
    <Drawer>
      <div
        onClick={handleClose}
        className="flex items-center justify-between px-1"
      >
        <div className={cn(!isMinimal && "px-1")}>
          {isMinimal && (
            <DrawerTrigger asChild>
              <div className="text-[#8E98A4] text-[13px] font-semibold leading-[18px] uppercase pl-1 my-3">
                <p>Chat</p>
              </div>
            </DrawerTrigger>
          )}
          {!isMinimal && (
            <div className="flex items-center justify-start gap-[155px] py-1 rounded-lg  opacity-70">
              <p className="text-[#8E98A4] text-[13px] w-[86px] font-semibold leading-[18px] uppercase">
                Chat bot
              </p>
              <DrawerTrigger asChild>
                <Image
                  width={16}
                  height={16}
                  src="/icons/Fill - Add - Plus (1).svg"
                  alt="a"
                  className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                />
              </DrawerTrigger>
            </div>
          )}
        </div>
      </div>
      <DrawerContent className="lg:overflow-auto ">
        <div className="max-w-lg">
          <DrawerHeader>
            <div className="flex items-center justify-between text-[20px] leading-[30px]  gap-[10px]">
              <span className=" text-custom-gray font-semibold text-right">
                Create New Chatbot
              </span>
              <DrawerClose asChild>
                <Image
                  src="/x 1.svg"
                  alt="x"
                  width={24}
                  height={24}
                  className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                ></Image>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <ComponentCreateChatbot />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateChatbot;
