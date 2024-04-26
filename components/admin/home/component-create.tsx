"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { CreateBrainRes, CreateBrainResType } from "@/schemas/create-brain.schema";
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

const ComponentCreate = () => {
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
      temperature: "",
      maxTokens: "",
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
    <div>
      <div className="-3">
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
              <div className="pt-5 pr-3">
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
                  name="temperature"
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
                  name="maxTokens"
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
    </div>
  );
};

export default ComponentCreate;
