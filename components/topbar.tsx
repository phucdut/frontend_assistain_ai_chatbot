"use client";

import { useSidebarStore } from "@/stores/sidebar-stores";
import { Menu } from "lucide-react";
import Logo from "./logo";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";

const Topbar = () => {
  const { handleOpenOrClose } = useSidebarStore();

  return (
    <div
      className={cn(
        "flex items-center p-4 justify-between sticky top-0 z-30 ",
        "lg:hidden"
      )}
    >
      <Logo />
      <Button variant="ghost" size="icon" onClick={handleOpenOrClose}>
        <Menu />
      </Button>
    </div>
  );
};

export default Topbar;
