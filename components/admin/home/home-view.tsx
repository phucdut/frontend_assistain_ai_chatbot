"use client";
import AuthButton from "@/components/ui/auth-button";
import Image from "next/image";
import "@/app/globals.css";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const HomeViewCreateBrain: React.FC = () => {
  return (
    <Drawer>
      <div>
        <div>
          <div className="pt-8">
            <p className="text-center text:custom-gray text-[30px] leading-[40px] font-medium ">
              Let get started
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center text-center gap-[290px] pt-12">
          <div className="">
            <p>STEP</p>
          </div>
          <div className="">
            <p>STEP</p>
          </div>
          <div className="">
            <p>STEP</p>
          </div>
        </div>
        <div className="flex justify-center pt-2 pb-5">
          <div className="relative" style={{ width: 80, height: 80 }}>
            <Image
              src="/Ellipse 2.svg"
              alt="Ellipse2"
              width={80}
              height={80}
              objectFit="cover"
            />
            <p className="absolute inset-0 img-step flex items-center justify-center text-center">
              1
            </p>
          </div>
          <div className="flex items-center justify-center pl-[30px] pr-[30px]">
            <Image
              src="/Line 8.svg"
              alt="Line8"
              width={187}
              height={0}
              objectFit="cover"
            />
          </div>
          <div>
            <div className="">
              <div className="relative" style={{ width: 80, height: 80 }}>
                <Image
                  src="/Ellipse 2.svg"
                  alt="Ellipse2"
                  width={80}
                  height={80}
                  objectFit="cover"
                />
                <p className="absolute inset-0 img-step flex items-center justify-center text-center">
                  2
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center pl-[30px] pr-[30px]">
            <Image
              src="/Line 8.svg"
              alt="Line8"
              width={187}
              height={0}
              objectFit="cover"
            />
          </div>
          <div>
            <div className="">
              <div className="relative" style={{ width: 80, height: 80 }}>
                <Image
                  src="/Ellipse 2.svg"
                  alt="Ellipse2"
                  width={80}
                  height={80}
                  objectFit="cover"
                />
                <p className="absolute inset-0 img-step flex items-center justify-center text-center">
                  3
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-20">
          <div className="w-[250px] text-center text:custom-gray text-base font-semibold leading-snug">
            Create/Name your AI Assistant
          </div>
          <div className="w-[250px] text-center text:custom-gray text-base font-semibold leading-snug">
            Train <br /> your chat bot
          </div>
          <div className="w-[250px] text-center text:custom-gray text-base font-semibold leading-snug">
            Deploy
            <br />
            your AI
          </div>
        </div>
        <div className="flex items-center justify-center pt-5 gap-20">
          <div className="w-[250px] text-center text:custom-gray text-sm font-normal leading-snug">
            Create/Name your chat bots(s)
          </div>
          <div className="w-[250px] text-center text:custom-gray text-sm font-normal leading-snug">
            Add new knowledge base
          </div>
          <div className="w-[250px] text-center text:custom-gray text-sm font-normal leading-snug">
            Embed to websites
          </div>
        </div>
        <div className="flex items-center justify-center pt-5 gap-20">
          <div className="w-[250px] text-center text:custom-gray text-sm font-normal leading-snug"></div>
          <div className="w-[250px] text-center text:custom-gray text-sm font-normal leading-snug">
            Create prompt
          </div>
          <div className="w-[250px] text-center text:custom-gray text-sm font-normal leading-snug">
            Intergrate to your applications
          </div>
        </div>
        <div className="flex items-center justify-center pt-5 gap-20">
          <div className="w-[250px] text-center text:custom-gray text-sm font-normal leading-snug"></div>
          <div className="w-[250px] text-center text:custom-gray text-sm font-normal leading-snug">
            Customize
          </div>
          <div className="w-[250px] text-center text:custom-gray text-sm font-normal leading-snug">
            Share your AI chatbot’s link
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default HomeViewCreateBrain;
