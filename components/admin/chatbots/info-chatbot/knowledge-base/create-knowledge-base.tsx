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
import ComponentCreateKnowledgeBase from "./component-create-knowledge-base";
import { Button } from "@/components/ui/button";
import { InputSearch } from "@/components/ui/input-search";
import ComponentCreateKnowledgeBaseCopy from "./component-create-knowledge-base copy";

type CreateKnowledgeBaseProps = {
  id: string;
};

const CreateKnowledgeBase: React.FC<CreateKnowledgeBaseProps> = ({ id }) => {
  return (
    <Drawer>
      <div className="flex items-center justify-start gap-3 w-full">
        <div className="w-[879px] h-[50px] px-[15px] py-3.5 justify-start items-center gap-[15px] inline-flex">
          <div className="justify-start items-start gap-2.5 flex">
            <div className="w-0 h-0 relative"></div>
          </div>
          <InputSearch
            type="text"
            placeholder="Search"
            className="opacity-50 text-neutral-900 text-sm font-normal leading-snug bg-transparent outline-none focus:ring-2 focus:ring-slate-300 transition-all duration-200 ease-in-out bg-white h-12 border-slate-300"
          />
        </div>
        <div>
          <div className=" flex items-center justify-between text-[14px] leading-[22px]">
            <DrawerTrigger asChild>
              <BuildButton
                type="submit"
                className="btn-container font-semibold w-36 h-12"
              >
                <Image
                  src="/Fill - Add - Plus.svg"
                  alt="x"
                  width={16}
                  height={16}
                ></Image>
                Add content
              </BuildButton>
            </DrawerTrigger>
          </div>
        </div>
        <DrawerContent className="lg:overflow-auto pl-2">
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
            <ComponentCreateKnowledgeBaseCopy id={id} />
          </div>
        </DrawerContent>
      </div>
    </Drawer>
  );
};

export default CreateKnowledgeBase;
