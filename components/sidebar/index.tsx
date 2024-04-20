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
    <div className={cn("text-white bg-[#1D1D1F]", clasName)}>
      <div className="h-20 pl-7 pr-6">
        <div className="flex items-center justify-between w-full">
          {!isMinimal && <Logo />}
          <SidebarToggle />
        </div>
      </div>
      <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
        <Navbar />
      </div>
      <div
        className={cn(
          "fixed bottom-8 left-4 right-4",
          "lg:left-7 lg:right-auto",
          isMinimal && "lg:left-3"
        )}
      >
        <div className="mb-4 p-2 rounded-lg bg-gray-900">
          <div className="mb-4 flex items-center">
            {/* <UserButton afterSignOutUrl="/" /> */}
            {/* {!isMinimal && (
              <span className="text-xs ml-2">
                {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            )} */}
          </div>
          {!isMinimal && (
            <div className="border-t border-t-gray-950 pt-2">
              {!isProPlan && (
                <div className="mb-2">
                  <div className="text-center mb-2 text-muted-foreground text-sm font-semibold">
                    {userLimitCount}/{MAX_FREE_COUNTS} Free Generations
                  </div>
                  <Progress
                    value={(userLimitCount / MAX_FREE_COUNTS) * 100}
                    className="bg-gray-950 h-3"
                    indicatorClassName="gradient-btn  "
                  />
                </div>
              )}
              <SubscriptionButton isPro={isProPlan} />
            </div>
          )}
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
