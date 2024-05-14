"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";

interface CardWrapperProps {
  children: React.ReactNode;
  showSocial?: boolean;
}

export const CardWrapper = ({ children, showSocial }: CardWrapperProps) => {
  return (
    <Card className="w-[543px] shadow-md gap-0 bg-[#fff] rounded-md">
      <CardHeader>
        <Header />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <div className="pl-[120px] pt-[20px] text-[14px] font-normal leading-[24px]">
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
