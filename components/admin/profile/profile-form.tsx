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
import { EditSubscriptionPlanResType } from "@/schemas/subscription-plan.schema";
import subscriptionPlanApiRequest from "@/app/apiRequests/subscription-plan";
import { UpgradeMembershipButton } from "@/components/sidebar/upgrade-membership-button";

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
  const planNames: { [key: string]: string } = {};
  const [subPlan, setSubPlan] = useState<EditSubscriptionPlanResType | null>(
    null
  );

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
    if (!userSubscription?.plan_id) return;

    const fetchSubscriptionPlan = async () => {
      try {
        const result = await subscriptionPlanApiRequest.subscriptionPlanClient(
          userSubscription.plan_id
        );
        setSubPlan(result.payload);
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchSubscriptionPlan();
  }, [userSubscription?.plan_id]);

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
    <div className="px-5 overflow-y-auto custom-scroll h-[560px]">
      <DrawerProfile>
        <div className=" overflow-y-auto custom-scroll">
          
          <div className="flex items-center justify-between pb-5 px-5 pt-5">
            <div className="flex items-center justify-start gap-5 ">
              <Image
                src="/Fill - Premium - Backage.svg"
                alt="x"
                width={20}
                height={19}
                className=" "
              ></Image>
              <div className=" text-sm font-normal leading-snug ">
                Current Backage
              </div>
            </div>
            <div className=" text-sm font-bold leading-snug uppercase">
              {subPlan?.plan_title}
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
              <div className=" text-sm font-normal leading-snug">
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
              <div className=" text-sm font-normal leading-snug">
                Change Password
              </div>
            </div>
            <DrawerTrigger asChild>
              <div className=" px-3 py-2 bg:gray-100 justify-center items-center gap-1.5 inline-flex text-[13px] font-medium rounded-md border">
                <div className="">
                  Change Password
                </div>
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
                        src="/logo/Horizontal 2.svg"
                        alt="x"
                        width={26}
                        height={28}
                        className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 absolute inset-x-[210px]  inset-y-1/3 "
                      ></Image>
                      <h1 className="text-white text-[21px] transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 absolute inset-x-[190px] inset-y-[80px] ">
                        ALLYBY
                      </h1>
                    </div>
                    <div className="w-[110px] h-[110px] rounded-full bg:custom-gray-6 absolute inset-y-32 inset-x-5">
                      <div className="w-[110px] h-[110px] rounded-full bg:custom-gray-6 relative pt-5">
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
                          <div className="text-xl font-semibold leading-[30px] ">
                            {account?.display_name}
                          </div>
                        </div>
                        <div className="text-sm font-normal leading-tight">
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
              <div className=" text-sm font-normal leading-snug">
                API Key
              </div>
            </div>
            <div className="w-[140px] h-9 px-3 py-2 bg:gray-100 rounded-md border justify-center items-center gap-1.5 inline-flex">
              <div className="text-[13px] font-medium leading-tight">
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
              <div className="w-[212px]  text-sm font-normal leading-snug">
                Invite a friend and you’ll both receive $20 credit
              </div>
            </div>
            <div
              className="w-[90px] h-9 px-3 py-2 bg:gray-100 rounded-md border justify-center items-center gap-1.5 inline-flex"
              onClick={handleCopy}
            >
              <div className="text-[13px] font-medium leading-tight">
                Copy link
              </div>
            </div>
          </div>
          <Separator className=" bg-slate-300" />
          <div className="text-center text-xl font-normal leading-[30px] pt-6 ">
            95%
          </div>
          <div className="flex justify-center py-2">
            <Progress value={95} className="w-[60%]" />
          </div>
          <div className="text-center text-[50px] font-semibold ">
            30
          </div>
          <div className="text-center  text-sm font-normal leading-snug">
            Credits available. Need more?
          </div>
        </div>

        <div ref={embedCodeRef} className="hidden">
          AllyBy AI?embed?user_id={account?.id}&amp;userName=
          {account?.display_name}
        </div>
        <div className="flex justify-center py-5 pb-10">
          <UpgradeMembershipButton>
            <Button
              type="button"
              className=" w-[400px] h-[50px] bg-zinc-900 rounded-md border-2 border-zinc-800 gap-2 text-custom-gray-6"
            >
              <Image src="/Group (3).svg" alt="x" width={24} height={22} />
              Upgrade membership
            </Button>
          </UpgradeMembershipButton>
        </div>
      </DrawerProfile>
    </div>
  );
};

export default ProfileForm;
