import Image from "next/image";
import React from "react";

import { useSidebarStore } from "@/stores/sidebar-stores";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";

const ProfileComponent = () => {
  const { isMinimal, handleClose } = useSidebarStore();

  return (
    <div
      className={cn(
        isMinimal && "px-1",
        "flex items-center justify-between"
      )}
      onClick={handleClose}
    >
      {isMinimal && (
        <Image
          src="/Ellipse 1.svg"
          alt="x"
          width={24}
          height={22}
          className="w-9 h-9 rounded-full my-3"
        ></Image>
      )}
      {!isMinimal && (
        <div className="flex items-center justify-between pt-5 gap-32">
          <div className="flex items-center justify-between gap-5">
            <Image
              src="/Ellipse 1.svg"
              alt="x"
              width={24}
              height={22}
              className="w-9 h-9 rounded-full"
            ></Image>
            <span>David</span>
          </div>
          <Switch />
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
