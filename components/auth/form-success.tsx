"use client";

import Image from "next/image";
import "@/app/globals.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AccountResType } from "@/schemas/account.schema";
import authApiRequest from "@/app/apiRequests/auth";
import accountApiRequest from "@/app/apiRequests/account";
import { handleErrorApi } from "@/lib/utils";

const FormSuccess = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const fetchAuthAndAccount = async () => {
      if (token) {
        try {
          await authApiRequest.auth({ sessionToken: token });
        } catch (error) {
          handleErrorApi({ error });
        }
      }
    };

    fetchAuthAndAccount();
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex-shrink-0">
        <Image
          src="/Mul - Email With Check.svg"
          alt="Mul - Email With Check"
          width={128}
          height={128}
        ></Image>
      </div>
      <div className="pt-[24px] text-[36px] font-semibold text-gray-[#1D1D1F]">
        <h1>Success!</h1>
      </div>
      <div className="pt-[12px] text-[16px] font-normal leading-[26px] text-gray-[#2C2C2C]">
        <p className="text-center max-w-[363px]">
          Please check your email for the confirmation message we just sent you
        </p>
      </div>
      <div className=" flex items-center justify-between pt-[24px] text-[16px]">
        <Link href="/home">
          <button className="lg text-[#FFF] bg-[#161616] w-[363px] h-[60px] max-w-[363px] font-semibold leading-[26px] ">
            Home Page
          </button>
        </Link>
      </div>
      <div className="text-center pt-[182px] text-[14px] font-normal leading-[24px]">
        <p>
          <span className="underline">Term of Service&nbsp;</span>
          <span className=" text-amber-[#2C2C2C] ">|&nbsp;</span>
          <span className="underline">Privacy Statement</span>
        </p>
      </div>
    </div>
  );
};

export default FormSuccess;
