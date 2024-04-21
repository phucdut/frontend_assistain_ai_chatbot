"use client";

import Image from "next/image";
import { X } from "lucide-react";

import { useSidebarStore } from "@/stores/sidebar-stores";
import { Button } from "@/components/ui/button";

const SidebarToggle = () => {
  const { isMinimal, handleChangeSideBar, handleOpenOrClose } =
    useSidebarStore();

  return (
    <div>
      <div
        className="cursor-pointer hidden lg:block"
        is-navbar-minimal={isMinimal ? "true" : undefined}
        onClick={handleChangeSideBar}
      >
        <Image
          src={`/icons/menu-${isMinimal ? "open" : "close"}.svg`}
          width={24}
          height={24}
          alt="navbar icon"
          className="pt-4"
        />
      </div>
      <Button
        variant="ghost"
        className="lg:hidden"
        onClick={handleOpenOrClose}
        size="icon"
      >
        <X />
      </Button>
    </div>
  );
};

export default SidebarToggle;
