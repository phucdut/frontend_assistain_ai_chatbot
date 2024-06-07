"use client";

import "@/app/globals.css";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ChevronRight, LogOut } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";
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
import {
  AccountResType,
  UserSubscriptionResType,
} from "@/schemas/account.schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { UpgradeMembershipListType } from "@/schemas/upgrade-membership.schema";
import membershipApiRequest from "@/app/apiRequests/upgrade-membership";

type ProfileProps = {
  id: string;
};

const ProfileForm: React.FC<ProfileProps> = ({ id }) => {
  const [account, setAccount] = useState<AccountResType | null>(null);
  const router = useRouter();
  const [userSubscription, setUserSubscription] =
    useState<UserSubscriptionResType | null>(null);
  const embedCodeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [membership, setMembership] =
    useState<UpgradeMembershipListType | null>(null);
  // Khai báo planNames ở ngoài phạm vi của if statement
  let planNames: { [key: string]: string } = {};

  if (membership && membership.results) {
    // Object ánh xạ giữa ID kế hoạch và tên của chúng
    planNames = {
      [membership.results[0]?.id || ""]: "MONTHLY FREE",
      [membership.results[1]?.id || ""]: "MONTHLY ENTRY",
      [membership.results[2]?.id || ""]: "MONTHLY PREMIUM",
      [membership.results[3]?.id || ""]: "YEARLY FREE",
      [membership.results[4]?.id || ""]: "YEARLY ENTRY",
      [membership.results[5]?.id || ""]: "YEARLY PREMIUM",
    };
  }

  let subscriptionName = "";
  if (userSubscription?.plan_id) {
    // Kiểm tra userSubscription và hiển thị tên kế hoạch tương ứng
    subscriptionName = planNames[userSubscription?.plan_id];
  }

  useEffect(() => {
    if (id) {
      console.log("Chatbot ID:", id);
    }
  }, [id]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccount(result.payload);
      } catch (error: any) {
        handleErrorApi({ error });
        router.push("/");
        router.refresh(); // Chuyển hướng người dùng về trang landing
      }
    };
    fetchRequest();
  }, [router]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (account?.id) {
          const result = await accountApiRequest.userSubscriptionIdClient(
            account?.id
          );
          setUserSubscription(result.payload);
        }
      } catch (error: any) {
        handleErrorApi({ error });
        router.push("/");
        router.refresh(); // Chuyển hướng người dùng về trang landing
      }
    };
    fetchRequest();
  }, [router, account?.id]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await membershipApiRequest.membershipClient();
        setMembership(result.payload);
        // console.log(result.payload);
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, []);

  const handleCopy = () => {
    const embedCodeElement = embedCodeRef.current;
    if (embedCodeElement !== null) {
      const embedCode =
        embedCodeElement.innerText || embedCodeElement.textContent || "";
      navigator.clipboard
        .writeText(embedCode)
        .then(() => {
          setCopied(true);
          toast({
            title: "Success",
            description: "Content was copied successfully!",
            duration: 5000,
          });
        })
        .catch((error) => {
          // console.error("Error when copying to clipboard:", error);
          toast({
            title: "Error",
            description: "An error occurred while copying!",
            variant: "destructive",
            duration: 5000,
          });
        });
    }
  };

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
          <div className="text-zinc-800 text-sm font-bold leading-snug">
            {subscriptionName && subscriptionName}
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
          <Link href="/dashboard">
            <ChevronRight className="h-5 w-5 transition duration-500 ease-in-out hover:opacity-100 hover:scale-125" />
          </Link>
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
                        </div>
                      </div>
                      <div className="text-zinc-900 text-sm font-normal leading-tight">
                        {account?.email}
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
          <div
            className="w-[90px] h-9 px-3 py-2 bg-gray-100 rounded-md border justify-center items-center gap-1.5 inline-flex"
            onClick={handleCopy}
          >
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

      <div ref={embedCodeRef} className="hidden">
        AllyBy AI?embed?user_id={account?.id}&amp;userName=
        {account?.display_name}
      </div>
    </DrawerProfile>
  );
};

export default ProfileForm;
