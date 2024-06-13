"use client";

import React, { useEffect, useState } from "react";

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

import Image from "next/image";
import "@/app/globals.css";
import AuthButton from "@/components/ui/auth-button";
import HomeViewCreateBrain from "./home-view";
import { ComponentCreateChatbot } from "./component-create-chatbot";
import accountApiRequest from "@/app/apiRequests/account";
import { AccountResType } from "@/schemas/account.schema";
import { handleErrorApi } from "@/lib/utils";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import authApiRequest from "@/app/apiRequests/auth";
import { Separator } from "@/components/ui/separator";

export function HomeForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [account, setAccount] = useState<AccountResType | null>(null);

  // useEffect(() => {
  //   const fetchAuthAndAccount = async () => {
  //     if (token) {
  //       try {
  //         await authApiRequest.auth({ sessionToken: token });
  //         const result = await accountApiRequest.accountClient();
  //         setAccount(result.payload);
  //       } catch (error) {
  //         handleErrorApi({ error });
  //       }
  //     }
  //   };

  //   fetchAuthAndAccount();
  // }, [token]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccount(result.payload);
      } catch (error: any) {
        handleErrorApi({
          error,
        });
        router.push("/");
        router.refresh(); // Chuyển hướng người dùng về trang landing
      }
    };
    fetchRequest();
  }, [router]);

  return (
    <Drawer>
      <HomeViewCreateBrain />
      <div className="flex flex-col justify-between items-center h-full pt-14">
        <div className=" flex items-center justify-between text-[16px] leading-[26px] ">
          <DrawerTrigger asChild>
            <AuthButton className="font-semibold">Create now</AuthButton>
          </DrawerTrigger>
        </div>
      </div>
      <DrawerContent className="overflow-y-hidden">
        <div className="max-w-lg overflow-y-hidden">
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
          <Separator className="opacity-50 border border-slate-300" />

          {account && <ComponentCreateChatbot id={account.id} />}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
