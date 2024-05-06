"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-stores";
import { Separator } from "../ui/separator";

import AllChatbots from "./get-all-chatbots";
import AllVersionChatGPTs from "./get-all-select-versions-chatGPT";
import CreateChatbot from "./create_chatbot";
import Navigations from "./navigations";
import ProfileComponent from "./profile-component";
import UpgradeMembershipComponent from "./upgrade-membership-component";
import Profile from "./profile-info";
// import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const { isMinimal, handleClose } = useSidebarStore();

  return (
    <div className="px-4 bg:gray-170">
      <Separator className=" bg-[#303034]" />
      <AllVersionChatGPTs />
      <Separator className=" bg-[#303034]" />

      <Navigations />

      <CreateChatbot />
      <Separator className=" bg-[#303034]" />

      <AllChatbots />

      <UpgradeMembershipComponent />
      <Separator className=" bg-[#303034]" />

      <Profile />
    </div>
  );
};

export default Navbar;
