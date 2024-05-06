"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { HeaderSignUp } from "./header-sign-up";

interface CardWrapperProps {
  children: React.ReactNode;
}

export const CardWrapperSignUp = ({ children }: CardWrapperProps) => {
  return (
    <Card className="w-[440px] shadow-md ">
      <CardHeader>
        <HeaderSignUp />
      </CardHeader>
      <CardContent className="flex justify-center">{children}</CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-center text-[16px] font-normal leading-[26px]">
          <p>
            New to Ally AI? Learn more&nbsp;
            <span className="font-medium underline ">here</span>
          </p>
        </div>
      </CardFooter>
      <CardFooter className="flex justify-center">
        <div className="pt-[20px] text-[14px] font-normal leading-[24px]">
          <p>
            <span className="underline">Term of Service&nbsp;</span>
            <span className=" text-amber-[#2C2C2C] ">|&nbsp;</span>
            <span className="underline">Privacy Statement</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
