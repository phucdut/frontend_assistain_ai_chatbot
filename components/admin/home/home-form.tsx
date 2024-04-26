"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  CreateBrainRes,
  CreateBrainResType,
} from "@/schemas/create-brain.schema";

import Image from "next/image";
import "@/app/globals.css";
import AuthButton from "@/components/ui/auth-button";
import HomeViewCreateBrain from "./home-view";
import ComponentCreate from "./component-create";

export function HomeForm() {
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValueTemperature] = useState(0);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateBrainResType>();

  const form = useForm<CreateBrainResType>({
    resolver: zodResolver(CreateBrainRes),
    defaultValues: {
      name: "",
      description: "",
      model: "",
      openAIKey: "",
      promptTitle: "",
      promptContent: "",
    },
  });
  const handleChange = (event: any) => {
    setValueTemperature(event.target.value);
  };

  async function onSubmit(values: CreateBrainResType) {
    console.log(values);
  }

  return (
    <Drawer>
      <HomeViewCreateBrain />
      <div className="flex flex-col justify-between items-center h-full pt-14">
        <div className=" flex items-center justify-between text-[16px] leading-[26px] ">
          <DrawerTrigger asChild>
            <AuthButton className="font-semibold">Create now</AuthButton>
          </DrawerTrigger>
        </div>
      </div>
      <DrawerContent className="lg:overflow-auto ">
        <div className="max-w-lg">
          <DrawerHeader>
            <div className="flex items-center justify-between text-[20px] leading-[30px]  gap-[10px]">
              <span className=" text-custom-gray font-semibold text-right">
                Create New Chatbot
              </span>
              <DrawerClose asChild>
                <Image
                  src="/x 1.svg"
                  alt="x"
                  width={24}
                  height={24}
                  className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                ></Image>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <ComponentCreate />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
