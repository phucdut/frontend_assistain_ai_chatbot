"use client";

import "@/app/globals.css";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ChevronRight, LogOut } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerProfile,
  DrawerTrigger,
} from "@/components/ui/drawer-profile";
import ComponentChangePassword from "./component-change-password";
import accountApiRequest from "@/app/apiRequests/account";
import { handleErrorApi } from "@/lib/utils";
import { AccountResType } from "@/schemas/account.schema";
import { useRouter } from "next/navigation";

type ProfileProps = {
  id: string;
};

const ProfileForm: React.FC<ProfileProps> = ({ id }) => {
  // const [progress, setProgress] = useState(95);
  const [account, setAccount] = useState<AccountResType | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => setProgress(66), 500);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (id) {
      // Gọi API với id
      console.log("Chatbot ID:", id);
      // Your API call logic here
    }
  }, [id]);

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
    <DrawerProfile>
      <div className="px-5 overflow-y-auto custom-scroll">
        <div>
          <Separator className=" bg-slate-300" />
        </div>
        <div className="flex items-center justify-between pb-5 px-5 pt-5">
          <div className="flex items-center justify-start gap-5 ">
            <Image
              src="/Fill - Premium - Backage.svg"
              alt="x"
              width={20}
              height={19}
              className=" "
            ></Image>
            <div className="text-zinc-800 text-sm font-normal leading-snug ">
              Current Backage
            </div>
          </div>
          <div className="text-zinc-800 text-sm font-bold leading-snug ">
            FREE
          </div>
        </div>
        <Separator className=" bg-slate-300" />
        <div className="flex items-center justify-between py-5 px-5">
          <div className="flex items-center justify-start gap-5">
            <Image
              src="/Fill - Dashboard.svg"
              alt="x"
              width={20}
              height={19}
              className=" "
            ></Image>
            <div className="text-zinc-800 text-sm font-normal leading-snug">
              Billing dashboard
            </div>
          </div>
          <ChevronRight className="h-5 w-5 " />
        </div>
        <Separator className=" bg-slate-300" />
        <div className="flex items-center justify-between py-5 px-5">
          <div className="flex items-center justify-start gap-5">
            <Image
              src="/Group.svg"
              alt="x"
              width={20}
              height={19}
              className=" "
            ></Image>
            <div className="text-zinc-800 text-sm font-normal leading-snug">
              Change Password
            </div>
          </div>
          <DrawerTrigger asChild>
            <div className="">
              <Button className="text-zinc-900 text-[13px] font-medium leading-tight h-9 px-3 py-2 bg-gray-100 rounded-md border">
                Change Password
              </Button>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <div className="max-w-lg overflow-y-auto custom-scroll">
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
                      {account?.avatar_url && (
                        <Image
                          // src="/Ellipse 1.svg"
                          src={account.avatar_url}
                          alt="x"
                          width={100}
                          height={100}
                          className="w-[100px] h-[100px] rounded-full absolute inset-y-[5px] inset-x-[5px]"
                        ></Image>
                      )}
                    </div>
                  </div>
                  <div className="pl-36 pt-3 flex gap-10">
                    <div>
                      <div className="flex items-center justify-start gap-1 ">
                        <div className="text-zinc-900 text-xl font-semibold leading-[30px] ">
                          {account?.display_name}
                          {/* David */}
                        </div>
                      </div>
                      <div className="text-zinc-900 text-sm font-normal leading-tight">
                        {account?.email}
                        {/* davidman@gmail.com */}
                      </div>
                    </div>
                    <div>
                      <Button type="button">
                        <LogOut />
                      </Button>
                    </div>
                  </div>
                </div>
              </DrawerHeader>
              {/* {account && <ProfileForm id={account?.id} />} */}
              <ComponentChangePassword />
            </div>
          </DrawerContent>
        </div>
        <Separator className=" bg-slate-300" />
        <div className="flex items-center justify-between py-5 px-5">
          <div className="flex items-center justify-start gap-5">
            <Image
              src="/Fill - Code - API.svg"
              alt="x"
              width={20}
              height={19}
              className=" "
            ></Image>
            <div className="text-zinc-800 text-sm font-normal leading-snug">
              API Key
            </div>
          </div>
          <div className="w-[140px] h-9 px-3 py-2 bg-gray-100 rounded-md border justify-center items-center gap-1.5 inline-flex">
            <div className="text-zinc-900 text-[13px] font-medium leading-tight">
              Generate API Key
            </div>
          </div>
        </div>
        <Separator className=" bg-slate-300" />
        <div className="flex items-center justify-between py-5 px-5">
          <div className="flex items-center justify-start gap-5">
            <Image
              src="/Fill - Gift.svg"
              alt="x"
              width={20}
              height={19}
              className=" "
            ></Image>
            <div className="w-[212px] text-zinc-800 text-sm font-normal leading-snug">
              Invite a friend and you’ll both receive $20 credit
            </div>
          </div>
          <div className="w-[90px] h-9 px-3 py-2 bg-gray-100 rounded-md border justify-center items-center gap-1.5 inline-flex">
            <div className="text-zinc-900 text-[13px] font-medium leading-tight">
              Copy link
            </div>
          </div>
        </div>
        <Separator className=" bg-slate-300" />
        <div className="text-center text-zinc-900 text-xl font-normal leading-[30px] pt-6 ">
          95%
        </div>
        <div className="flex justify-center py-2">
          <Progress value={95} className="w-[60%]" />
        </div>
        <div className="text-center text-zinc-900 text-[50px] font-semibold ">
          30
        </div>
        <div className="text-center text-zinc-800 text-sm font-normal leading-snug">
          Credits available. Need more?
        </div>
      </div>
    </DrawerProfile>
  );
};

export default ProfileForm;
