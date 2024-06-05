import Image from "next/image";
import React from "react";
import { SignUpButton } from "../auth/sign-up/sign-up-button";
import BuildButton from "../ui/build-button";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <div>
      <div className="w-full h-[436px] bg-neutral-900 pt-20">
        <div className="flex justify-center items-center gap-[833px]">
          <div>
            <Image
              src="/icons/linkedin 1.svg"
              alt="linkedin"
              width={20}
              height={20}
            ></Image>
          </div>
          <div className="flex justify-end items-center gap-5">
            <div className="text-right text-white text-base font-normal leading-relaxed">
              Ready to try AllyBy AI?
            </div>
            <div className="w-[111px] h-12 px-[15px] py-3 bg-neutral-800 rounded-md justify-center items-center gap-2.5 inline-flex">
              <SignUpButton>
                <div className="text-white text-sm font-semibold leading-normal">
                  Get Started
                </div>
              </SignUpButton>
            </div>
          </div>
        </div>
        <div className="w-full h-[500px]">
          <div className="flex justify-center items-center py-20">
            <Separator className=" w-[1140px] h-[0px] opacity-10 border border-orange-100 " />
          </div>
          <div className="flex justify-center items-center gap-[563px]">
            <div className="pl-[180px]">
              <h1 className="text-[37px] font-semibold leading-[26px] uppercase w-[300px] whitespace-nowrap text-ellipsis flex-shrink-0 text-cyan-50">
                ALLYBY AI
              </h1>
            </div>
            <div className="pl-[180px]">
              <h1 className="text-[37px] font-semibold leading-[26px] uppercase w-[300px] whitespace-nowrap text-ellipsis flex-shrink-0 text-cyan-50">
                
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center gap-[590px] pt-[30px]">
            <div className="opacity-50 text-white text-base font-normal leading-relaxed">
              © 2023 AllyBy AI Inc. All rights reserved.
            </div>
            <div className="flex justify-end items-center gap-5">
              <div className="text-white text-base font-normal leading-relaxed">
                Term of Service
              </div>
              <div className="text-white text-base font-normal leading-relaxed">
                Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
