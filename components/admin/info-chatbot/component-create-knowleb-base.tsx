"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  CreateKnowledgeBaseRes,
  CreateKnowledgeBaseResType,
} from "@/schemas/create-knowledge-base.schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Image from "next/image";
import "@/app/globals.css";

import { Input } from "@/components/ui/input";

import BuildButton from "@/components/ui/build-button";
import { Slider } from "@/components/ui/slider";
import { Slider1 } from "@/components/ui/slider1";
import { Separator } from "@/components/ui/separator";
import { SignInButton } from "@/components/auth/sign-in/sign-in-button";
import LgButton from "@/components/ui/lg-button";
import { Button } from "@/components/ui/button";

const ComponentCreate = () => {
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValueTemperature] = useState(0);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateKnowledgeBaseResType>();

  const form = useForm<CreateKnowledgeBaseResType>({
    resolver: zodResolver(CreateKnowledgeBaseRes),
    defaultValues: {
      nameKnowledgeBase: "",
      upload: "",
    },
  });
  const handleChange = (event: any) => {
    setValueTemperature(event.target.value);
  };

  async function onSubmit(values: CreateKnowledgeBaseResType) {
    console.log(values);
  }
  return (
    <div>
      <div className="">
        <Separator className=" bg-[#303034]" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 space-x-6"
          >
            <div className="px-3">
              <div className="pt-5 ">
                <FormField
                  control={form.control}
                  name="nameKnowledgeBase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                        Name your knowledge base
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Knowledge base name"
                          {...field}
                          disabled={isPending}
                          className="w-[400px] h-11 pl-[20px] text-[14px] font-normal leading-[20px]"
                        />
                      </FormControl>
                      <FormDescription>
                        {/* This is your public display email. */}
                      </FormDescription>
                      <FormMessage className="text-red-500 text-[14px] font-normal leading-[26px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-between pt-5">
                <FormField
                  control={form.control}
                  name="upload"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                        Upload URL or Video
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex items-center justify-between">
                          <div className="relative">
                            <Input
                              placeholder="Add your URL"
                              {...field}
                              disabled={isPending}
                              className="w-[340px] h-11 pl-[50px] text-[14px] font-normal leading-[20px] relative"
                            />
                            <Image
                              src="/Outline - Link.svg"
                              alt="Outline - Link"
                              width={20}
                              height={20}
                              className="absolute inset-x-4 inset-y-2.5"
                            />
                          </div>
                          <div className="absolute flex items-center justify-between text-[14px] leading-[22px] inset-x-[360px]  inset-y-2.5">
                            <Button
                              className="text-[#161616]  font-semibold w-[44px] h-[44px]"
                              variant="outline"
                            >
                              1
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        {/* This is your public display email. */}
                      </FormDescription>
                      <FormMessage className="text-red-500 text-[14px] font-normal leading-[26px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" flex items-center justify-between pt-5 text-[14px] leading-[22px] ">
                <LgButton className="text-[#161616]  font-semibold w-[400px] h-[50px]">
                  Add another link
                </LgButton>
              </div>
              <div className="pt-5">
                <FormLabel className="text-[14px] leading-6  text-custom-gray font-semibold">
                  Bulk upload
                </FormLabel>
                <div className=" flex items-center justify-between pt-2 text-[14px] leading-[22px] ">
                  <LgButton className="text-[#161616]  font-semibold w-[400px] h-[50px]">
                    Select text file
                  </LgButton>
                </div>
              </div>
              <div className="text-[14px] leading-6 pt-2 text-custom-gray-5 font-normal">
                <FormLabel>Enter each URL on a new line</FormLabel>
              </div>
              <div className="pt-5 ">
                <FormField
                  control={form.control}
                  name="nameKnowledgeBase"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex items-center justify-between">
                          <Input
                            placeholder="Drag and drop files here"
                            {...field}
                            disabled={isPending}
                            className="inputUpload w-[400px] h-[92px] pl-[20px] text-[14px] font-normal leading-[20px]"
                          />
                          <div className="absolute flex items-center justify-between text-[14px] leading-[22px] inset-x-[290px]  inset-y-2.5">
                            <Button
                              className="text-[#161616]  font-semibold w-[170px] h-[44px]"
                              variant="outline"
                            >
                              <Image
                                src="/Group (2).svg"
                                alt="x"
                                width={14}
                                height={14}
                                className="mr-2"
                              />
                              Upload
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        {/* This is your public display email. */}
                      </FormDescription>
                      <FormMessage className="text-red-500 text-[14px] font-normal leading-[26px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" flex items-center justify-between pt-5 text-[14px] leading-6 ">
                <BuildButton
                  type="submit"
                  className="btn-container font-semibold w-[400px] h-[50px]"
                >
                  <Image
                    src="/Fill - Add - Plus.svg"
                    alt="x"
                    width={16}
                    height={16}
                  ></Image>
                  Create
                </BuildButton>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ComponentCreate;
