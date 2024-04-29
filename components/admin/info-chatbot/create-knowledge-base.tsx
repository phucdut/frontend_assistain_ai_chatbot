"use client";

import BuildButton from "@/components/ui/build-button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import ComponentCreate from "./component-create-knowleb-base";
import { Button } from "@/components/ui/button";

const CreateKnowledgeBase = () => {
  return (
    <Drawer>
      <div className="flex items-center justify-between">
        <div className="pl-8 pb-0 relative">
          <div className="text-[16px] font-normal leading-[18px] relative w-[820px]">
            <Input
              placeholder="Write your message"
              type="email"
              className="w-full inputChat pl-16"
            />
            <Image
              src="/icons/search-normal.svg"
              alt="search"
              width={16}
              height={16}
              className="absolute inset-y-6 left-9 flex items-center justify-between flex-shrink-0"
            />
          </div>
        </div>
        <div>
          <div className=" flex items-center justify-between text-[14px] pr-9 leading-[22px] ">
            <DrawerTrigger asChild>
              <BuildButton
                type="submit"
                className="btn-container font-semibold w-[134px] h-[50px]"
              >
                <Image
                  src="/Fill - Add - Plus.svg"
                  alt="x"
                  width={16}
                  height={16}
                ></Image>
                Create
              </BuildButton>
            </DrawerTrigger>
          </div>
        </div>
        <DrawerContent className="lg:overflow-auto ">
          <div className="max-w-lg">
            <DrawerHeader>
              <div className="flex items-center justify-between text-[20px] leading-[30px]  gap-[10px]">
                <span className=" text-custom-gray font-semibold text-right">
                  New Knowledge Base
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
            <ComponentCreate />
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </div>
    </Drawer>
  );
};

export default CreateKnowledgeBase;
