"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { HeaderCreatBrain } from "./header-creat-brain";

interface CardWrapperProps {
  children: React.ReactNode;
}

export const CardWrapperCreatBrain = ({ children }: CardWrapperProps) => {
  return (
    <Card className="w-[440px] shadow-md ">
      <CardHeader>
        <HeaderCreatBrain />
      </CardHeader>
      <CardContent className="flex justify-center">{children}</CardContent>
    </Card>
  );
};
