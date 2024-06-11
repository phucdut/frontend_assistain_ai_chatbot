"use client";

import { cn, handleErrorApi } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-stores";
import { Separator } from "../ui/separator";
import React, { useEffect, useState, useTransition } from "react";

import AllChatbots from "./get-all-chatbots";
import AllVersionChatGPTs from "./get-all-select-versions-chatGPT";
import CreateChatbot from "./create_chatbot";
import UpgradeMembershipComponent from "./upgrade-membership-component";
import Profile from "./profile-info";
import NavigationUser from "./navigations-user";
import { AccountResType } from "@/schemas/account.schema";
import accountApiRequest from "@/app/apiRequests/account";
import { useRouter } from "next/navigation";
import NavigationAdmin from "./navigations-admin";
import AllChatbotAdmin from "./get-all-chatbots-admin";
// import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const { isMinimal, handleClose } = useSidebarStore();
  const [account, setAccount] = useState<AccountResType | null>(null);
  const [accountRole, setAccountRole] = useState<String | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccountRole(result.payload.user_role);
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
    <div className="px-4 pt-1 bg:gray-170">
      <Separator className=" bg-[#303034]" />
      <AllVersionChatGPTs />
      <Separator className=" bg-[#303034]" />

      {accountRole === "admin" ? <NavigationAdmin /> : <NavigationUser />}

      <CreateChatbot />
      <Separator className=" bg-[#303034]" />

      
      {accountRole === "admin" ? <AllChatbotAdmin /> : <AllChatbots />}

      <UpgradeMembershipComponent />
      <Separator className=" bg-[#303034]" />

      <Profile />
    </div>
  );
};

export default Navbar;
