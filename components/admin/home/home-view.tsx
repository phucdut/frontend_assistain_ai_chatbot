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
            <p className="text-center text-custom-gray text-[30px] leading-[40px] font-medium ">
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
        <div className="flex items-center justify-start gap-[150px] custom-gray-1 text-[16px] font-semibold leading-[137.5%] pl-20">
          <div className="flex justify-center max-w-[270px]">
            <span className="pl-[32px] text-center">
              Create/Name your AI Assistant
            </span>
          </div>
          <div>
            <span className="text-center">Train your brain</span>
          </div>
          <div>
            <span className="pl-12 text-center">Deploy your AI</span>
          </div>
        </div>
        <div className="flex items-center justify-start pt-5 gap-[145px] custom-gray-1 text-[14px] font-normal leading-[157.143%] pl-20">
          <div className="flex justify-center max-w-[270px]">
            <span className="pl-16 text-center">Create/Name your brain(s)</span>
          </div>
          <div className="a">
            <span className="text-center">
              Add new knowledge base <br />
            </span>
          </div>
          <div>
            <span className="pl-3 text-center">Embed to websites</span>
          </div>
        </div>
        <div className="flex items-center justify-end pt-2 gap-[160px] custom-gray-1 text-[14px] font-normal leading-[157.143%] pr-32">
          <div>
            <span className="text-center">Create prompt </span>
          </div>
          <div>
            <span className="flex justify-center">
              Intergrate to your applications
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end pt-2 gap-[190px] custom-gray-1 text-[14px] font-normal leading-[157.143%] pr-40">
          <div>
            <span className="text-center">Customize</span>
          </div>
          <div>
            <span className="flex justify-center">
              <span className="text-center">Share your AI brain’s link </span>
            </span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default HomeViewCreateBrain;
