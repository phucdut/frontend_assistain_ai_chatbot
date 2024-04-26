"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { NAVIGATIONSs } from "@/constants";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-stores";
import { Separator } from "../ui/separator";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import CombonentCreat from "../admin/home/component-create";
import { Button } from "../ui/button";
import AllChatbots from "./get-all-chatbots";
import AllVersionChatGPTs from "./get-all-select-versions-chatGPT";
import CreateChatbot from "./create_chatbot";

const Navbar = () => {
  const pathname = usePathname();
  const { isMinimal, handleClose } = useSidebarStore();

  return (
    <div className="px-4 bg-[#1D1D1F]">
      <Separator className=" bg-[#303034]" />
      {/* <AllVersionChatGPTs /> */}
      <Separator className=" bg-[#303034]" />
      <div
        className={cn(
          "flex items-center py-1 rounded-lg px-5 opacity-70 pb-4 pt-7",
          isMinimal && "px-1"
        )}
      >
        <p>Main</p>
      </div>
      <div>
        {NAVIGATIONSs.map(({ title, url, icon }, index) => (
          <div key={index} className="mb-2">
            <Link href={url} onClick={handleClose}>
              <div
                className={cn(
                  "flex items-center py-1 rounded-lg px-5 opacity-70",
                  "hover:opacity-100",
                  isMinimal && "px-1",
                  pathname.includes(url) &&
                    "transition-colors bg-gradient-to-l from-slate-800 to-slate-900 shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)] opacity-100"
                )}
              >
                <div className="flex items-center p-2">
                  <div>
                    <Image width={24} height={24} src={icon} alt={title} />
                  </div>
                  {!isMinimal && <span className="ml-4 text-sm">{title}</span>}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <CreateChatbot />
      <AllChatbots />
    </div>
  );
};

export default Navbar;
