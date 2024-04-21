"use client";

import { useSearchParams } from "next/navigation";

import AuthGGButton from "../ui/auth-gg-button";
import Image from "next/image";
import Link from "next/link";
import envConfig from "@/app/config";

export const Social = () => {
  return (
    <div className="pt-[24px] text-[16px] font-semibold leading-[26px]">
      <Link href="${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/sign-in-with-google">
        <AuthGGButton
          className="flex items-center justify-between max-w-[363px]"
          // onClick={() => onClick("google")}
        >
          <div className="flex pl-[87px] gap-[10px] flex-shrink-0">
            <Image src="/new 1.svg" alt="new 1" width={24} height={24}></Image>
          </div>
          <p className="flex pr-[57px] ">Sign in with Google</p>
        </AuthGGButton>
      </Link>
    </div>
  );
};
