"use client";

import React from "react";
import {
  DrawerProfile,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer-profile";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-stores";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import ProfileForm from "../admin/profile/profile-form";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { UpgradeMembershipButton } from "./upgrade-membership-button";

const Profile = () => {
  const { isMinimal, handleClose } = useSidebarStore();
  return (
    <DrawerProfile>
      <div
        onClick={handleClose}
        className="flex items-center justify-between px-1"
      >
        <div className={cn(!isMinimal && "px-1")}>
          {isMinimal && (
            <DrawerTrigger asChild>
              <Image
                src="/Ellipse 1.svg"
                alt="x"
                width={24}
                height={22}
                className="w-9 h-9 rounded-full my-3"
              ></Image>
            </DrawerTrigger>
          )}
          {!isMinimal && (
            <div className="flex items-center justify-between pt-5 gap-32">
              <div className="flex items-center justify-between gap-5">
                <DrawerTrigger asChild>
                  <Image
                    src="/Ellipse 1.svg"
                    alt="x"
                    width={24}
                    height={22}
                    className="w-9 h-9 rounded-full"
                  ></Image>
                </DrawerTrigger>
                <span>David</span>
              </div>
              <Switch />
            </div>
          )}
        </div>
      </div>
      <DrawerContent>
        <div className="max-w-lg">
          <DrawerHeader>
            <div className="relative text-[20px] leading-[30px] w-[440px] h-[170px] mb-20">
              <Image
                className="w-[440px] h-[170px] rounded-t-xl"
                src="/Rectangle 3764.svg"
                alt="x"
                width={440}
                height={170}
              />
              <DrawerClose asChild>
                <Image
                  src="/x 1.svg"
                  alt="x"
                  width={24}
                  height={24}
                  className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 absolute inset-y-6 right-5"
                ></Image>
              </DrawerClose>
              <div>
                <Image
                  src="/Horizontal-logo.png"
                  alt="x"
                  width={26}
                  height={28}
                  className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 absolute inset-x-[210px]  inset-y-1/3 "
                ></Image>
                <Image
                  src="/Horizontal-name.png"
                  alt="x"
                  width={64}
                  height={18}
                  className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 absolute inset-x-48 inset-y-1/2 "
                ></Image>
              </div>
              <div className="w-[110px] h-[110px] rounded-full bg-custom-gray-6 absolute inset-y-32 inset-x-5">
                <div className="w-[110px] h-[110px] rounded-full bg-custom-gray-6 relative pt-5">
                  <Image
                    src="/Ellipse 1.svg"
                    alt="x"
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px] rounded-full absolute inset-y-[5px] inset-x-[5px]"
                  ></Image>
                </div>
              </div>
              <div className="pl-36 pt-3">
                <div className="flex items-center justify-start gap-3 ">
                  <div className="text-zinc-900 text-xl font-semibold leading-[30px]">
                    David
                  </div>
                  <div>
                    <Image
                      src="/Fill - Edit - Pen.svg"
                      alt="x"
                      width={15}
                      height={15}
                      className=""
                    ></Image>
                  </div>
                </div>
                <div className="text-zinc-900 text-sm font-normal leading-tight">
                  davidman@gmail.com
                </div>
              </div>
            </div>
            <Separator className=" bg-slate-300" />
          </DrawerHeader>
          <ProfileForm />
          <DrawerFooter>
            <div className="flex justify-center">
            <UpgradeMembershipButton>
              <Button className=" w-[400px] h-[50px] bg-zinc-900 rounded-md border-2 border-zinc-800 gap-2 text-custom-gray-6">
                <Image src="/Group (3).svg" alt="x" width={24} height={22} />
                Upgrade membership
              </Button>
            </UpgradeMembershipButton>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </DrawerProfile>
  );
};

export default Profile;
