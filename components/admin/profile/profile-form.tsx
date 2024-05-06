"use client";

import "@/app/globals.css";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const ProfileForm = () => {
  const [progress, setProgress] = useState(95);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-5">
      <div className="flex items-center justify-between pb-5 px-5">
        <div className="flex items-center justify-start gap-5">
          <Image
            src="/Fill - Premium - Backage.svg"
            alt="x"
            width={20}
            height={19}
            className=" "
          ></Image>
          <div className="text-zinc-800 text-sm font-normal leading-snug">
            Current Backage
          </div>
        </div>
        <div className="text-zinc-800 text-sm font-bold leading-snug">FREE</div>
      </div>
      <Separator className=" bg-slate-300" />
      <div className="flex items-center justify-between py-5 px-5">
        <div className="flex items-center justify-start gap-5">
          <Image
            src="/Fill - Dashboard.svg"
            alt="x"
            width={20}
            height={19}
            className=" "
          ></Image>
          <div className="text-zinc-800 text-sm font-normal leading-snug">
            Billing dashboard
          </div>
        </div>
        <ChevronRight className="h-5 w-5 " />
      </div>
      <Separator className=" bg-slate-300" />
      <div className="flex items-center justify-between py-5 px-5">
        <div className="flex items-center justify-start gap-5">
          <Image
            src="/Fill - Code - API.svg"
            alt="x"
            width={20}
            height={19}
            className=" "
          ></Image>
          <div className="text-zinc-800 text-sm font-normal leading-snug">
            API Key
          </div>
        </div>
        <div className="text-zinc-800 text-sm font-bold leading-snug">FREE</div>
      </div>
      <Separator className=" bg-slate-300" />
      <div className="flex items-center justify-between py-5 px-5">
        <div className="flex items-center justify-start gap-5">
          <Image
            src="/Fill - Gift.svg"
            alt="x"
            width={20}
            height={19}
            className=" "
          ></Image>
          <div className="w-[212px] text-zinc-800 text-sm font-normal leading-snug">
            Invite a friend and you’ll both receive $20 credit
          </div>
        </div>
        <div className="text-zinc-800 text-sm font-bold leading-snug">FREE</div>
      </div>
      <Separator className=" bg-slate-300" />
      <div className="text-center text-zinc-900 text-xl font-normal leading-[30px] pt-6 ">
        95%
      </div>
      <div className="flex justify-center py-2">
        <Progress value={progress} className="w-[60%]" />
      </div>
      <div className="text-center text-zinc-900 text-[50px] font-semibold ">30</div>
      <div className="text-center text-zinc-800 text-sm font-normal leading-snug">Credits available. Need more?</div>
    </div>
  );
};

export default ProfileForm;
