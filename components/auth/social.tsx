"use client";

import { useSearchParams } from "next/navigation";

import AuthGGButton from "../ui/auth-gg-button";
import Image from "next/image";
import Link from "next/link";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  // const onClick = (provider: "google") => {
  //   signIn(provider, {
  //     callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
  //   });
  // };kconda activate

  return (
    <div className="pt-[24px] text-[16px] font-semibold leading-[26px]">
      <Link href="http://localhost:8000/api/v1/auth/sign-in-with-google">
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
