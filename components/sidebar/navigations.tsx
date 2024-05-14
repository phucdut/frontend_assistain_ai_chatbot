import React from "react";
import { useSidebarStore } from "@/stores/sidebar-stores";
import { NAVIGATIONS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

const Navigations = () => {
  const pathname = usePathname();
  const { isMinimal, handleClose } = useSidebarStore();

  return (
    <div>
      <div className="py-1 px-1 opacity-70">
        <p className="text-[#8E98A4] text-[13px] font-semibold leading-[18px] uppercase pl-1 py-3">
          Main
        </p>
      </div>
      <Separator className=" bg-[#303034]" />
      {NAVIGATIONS.map(({ title, url, icon }, index) => (
        <div key={index} className="mb-2">
          <Link href={url}>
            <div
              className={cn(
                "flex items-center py-1 rounded-lg px-5 opacity-70",
                "hover:opacity-100",
                isMinimal && "px-1",
                pathname.includes(url) &&
                  "transition-colors bg-gradient-to-l from-slate-800 to-slate-900 shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)] opacity-100"
              )}
              onClick={handleClose}
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
  );
};

export default Navigations;
