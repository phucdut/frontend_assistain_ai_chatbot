"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-stores";
import { text } from "stream/consumers";
import Logo from "../logo";
import SidebarToggle from "./sidebar-toggle";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "../ui/progress";
import SubscriptionButton from "../subscription-button";
import ThemeToggle from "./themetoggle";
import Navbar from "./navbar";

interface SidebarProps {
  clasName?: String;
  isProPlan?: boolean;
  userLimitCount?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  clasName,
  isProPlan,
  userLimitCount,
}) => {
  const { isMinimal } = useSidebarStore();
  // const { user } = useUser();
  return (
    <div className={cn("text-white", clasName)}>
      <div className="h-20 pl-7 pr-6">
        <div className="flex items-center justify-between w-full">
          {!isMinimal && <Logo />}
          <SidebarToggle />
        </div>
      </div>
      <div className="grow  scroll-smooth scrollbar-none">
        <Navbar />
      </div>
    </div>
  );
};

export default Sidebar;
