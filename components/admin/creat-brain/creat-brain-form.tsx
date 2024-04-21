"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { CreatBrainRes, CreatBrainResType } from "@/schemas/creat-brain.schema";
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
import Link from "next/link";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import envConfig from "@/app/config";
import { CardWrapperCreatBrain } from "./card-wrapper-creat-brain";
import BuildButton from "@/components/ui/build-button";
import { Slider } from "@/components/ui/slider";
import { Slider1 } from "@/components/ui/slider1";
import { Separator } from "@/components/ui/separator";

const CreatBrainForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValueTemperature] = useState(0);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreatBrainResType>();

  const form = useForm<CreatBrainResType>({
    resolver: zodResolver(CreatBrainRes),
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

  async function onSubmit(values: CreatBrainResType) {
    console.log(values);
  }
  return (
    <div className="h-full flex items-center justify-end bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] bg-[#fff]">
      <CardWrapperCreatBrain>
        <div className="">
        <Separator className=" bg-[#303034]" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 space-x-6"
            >
              <div>
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                          Brain name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter"
                            {...field}
                            disabled={isPending}
                            className="w-[400px] pl-[20px] text-[14px] font-normal leading-[20px]"
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
                <div className="pt-5">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter"
                            {...field}
                            disabled={isPending}
                            className="w-[400px] pl-[20px] text-[14px] font-normal leading-[20px]"
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
                <div className="pt-5">
                  <FormField
                    control={form.control}
                    name="openAIKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                          Open AI Key
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter"
                            {...field}
                            disabled={isPending}
                            className="w-[400px] pl-[20px] text-[14px] font-normal leading-[20px]"
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
                <div className="pt-5">
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                          Model
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="text-[14px] font-normal leading-[20px] pl-5 text-custom-gray-2">
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              m@support.com
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {/* This is your public display email. */}
                        </FormDescription>
                        <FormMessage className="text-red-500 text-[14px] font-normal leading-[26px]" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-5">
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                          Temperature
                        </FormLabel>
                        <FormControl className="text-[14px] font-normal leading-[20px] pl-5 text-custom-gray-2">
                          <Slider
                            defaultValue={[0.5]}
                            max={1}
                            step={0.01}
                            onChange={handleChange}
                            className="w-[400px] bg-[#E5E5E5] mt-[10px] relative"
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
                <div className="pt-8">
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                          Max tokens
                        </FormLabel>
                        <FormControl className="text-[14px] font-normal leading-[20px] pl-5 text-custom-gray-2">
                          <Slider1
                            defaultValue={[100]}
                            max={500}
                            min={10}
                            step={1}
                            onChange={handleChange}
                            className="w-[400px] bg-[#E5E5E5] mt-[10px] relative"
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
                <div className="pt-8">
                  <FormField
                    control={form.control}
                    name="promptTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold ">
                          Prompt title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter"
                            {...field}
                            disabled={isPending}
                            className="w-[400px] pl-[20px] text-[14px] font-normal leading-[20px]"
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
                <div className="pt-5">
                  <FormField
                    control={form.control}
                    name="promptContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                          Prompt content
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter"
                            {...field}
                            disabled={isPending}
                            className="w-[400px] pl-[20px] text-[14px] font-normal leading-[20px]"
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
                <div className="flex items-center justify-between pt-5 text-[14px] font-normal leading-[24px] text-custom-gray-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="checkbox"
                      disabled={isPending}
                      className="w-6 h-6 gap-[10px]"
                    ></input>
                    <p className="pl-[10px] pr-6">Set as default brain</p>
                  </div>
                </div>
                <div className=" flex items-center justify-between pt-5 text-[14px] leading-[22px] ">
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
      </CardWrapperCreatBrain>
    </div>
  );
};

export default CreatBrainForm;
