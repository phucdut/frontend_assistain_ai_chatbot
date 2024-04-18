"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { HeaderForgotPassword } from "./header-forgot-password";

interface CardWrapperProps {
  children: React.ReactNode;
}

export const CardWrapperPorgotPassword = ({ children }: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md ">
      <CardHeader>
        <HeaderForgotPassword />
      </CardHeader>
      <CardContent className="flex justify-center">{children}</CardContent>
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
