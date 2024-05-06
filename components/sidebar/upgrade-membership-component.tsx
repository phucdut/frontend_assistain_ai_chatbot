import Image from "next/image";
import React from "react";

import { useSidebarStore } from "@/stores/sidebar-stores";
import { cn } from "@/lib/utils";
import { UpgradeMembershipButton } from "./upgrade-membership-button";
import { Button } from "../ui/button";

const UpgradeMembershipComponent = () => {
  const { isMinimal, handleClose } = useSidebarStore();

  return (
    <div
      className={cn(isMinimal && "px-3", "flex items-center justify-between")}
      onClick={handleClose}
    >
      {isMinimal && (
        <div>
          <Image src="/Group (3).svg" alt="x" width={24} height={22} className="pb-3"/>
        </div>
      )}
      {!isMinimal && (
        <div className="flex items-center justify-between pt-36 pb-5">
          <UpgradeMembershipButton>
            <Button className=" w-[287px] h-[54px] bg-zinc-900 rounded-md border-2 border-zinc-800 gap-2 text-custom-gray-6">
              <Image src="/Group (3).svg" alt="x" width={24} height={22} />
              Upgrade membership
            </Button>
          </UpgradeMembershipButton>
        </div>
      )}
    </div>
  );
};

export default UpgradeMembershipComponent;
