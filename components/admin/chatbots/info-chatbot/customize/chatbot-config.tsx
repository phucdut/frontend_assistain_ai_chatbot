"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { CustomizeRes, CustomizeResType } from "@/schemas/customize.schema";
import { Check, MoveRight, Undo2, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useTransition, useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import "@/app/globals.css";
import PoweredByAllyAI from "./powered-by-ally-ai";
import CustomizeYourChatInterface from "./customize-your-chat-interface";

const ChatbotConfig = () => {
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState(false);
  const [step, setStep] = useState(1); // Thêm state để theo dõi bước hiện tại

  const handleNextStep = () => {
    // Cập nhật bước hiện tại khi nhấn nút "Next"
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    // Cập nhật bước hiện tại khi nhấn nút "Previous"
    setStep(step - 1);
  };

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CustomizeResType>();

  const form = useForm<CustomizeResType>({
    resolver: zodResolver(CustomizeRes),
    defaultValues: {
      prompts: "",
      initPrompts:
        "Give me a summary of this knowledge base\nWrite a pem about this knowledge base\nTell me five key points about this knowledge base",
    },
  });

  async function onSubmit(values: CustomizeResType) {
    console.log(values);
  }

  return (
    <div>
      {step === 0 && (
        <div>
          <CustomizeYourChatInterface />
        </div>
      )}
      {step === 1 && (
        <div>
          <div>
            <div className="flex justify-start pt-2 pb-5 pl-10 bg-white">
              <div className="w-[26px] h-[26px] bg-slate-300 rounded-full relative pt-5">
                <div className="absolute inset-y-[5px] inset-x-[10px] text-center text-white text-sm font-semibold leading-tight">
                  1
                </div>
              </div>
              <div className="flex items-center justify-center pl-[10px] pr-[20px] text-stone-500 text-sm font-normal leading-snug">
                Customize Chatbot Behavior
              </div>
              <div className="flex items-center justify-center pl-[10px] pr-[10px]">
                <MoveRight className="w-5 shrink-0 opacity-50" />
              </div>
              <div className="w-[26px] h-[26px]  bg-black rounded-full relative pt-5">
                <div className="absolute inset-y-[5px] inset-x-[9px] text-center text-white text-sm font-semibold leading-tight">
                  2
                </div>
              </div>
              <div className="flex items-center justify-center pl-[10px] text-zinc-800 text-sm font-semibold leading-snug">
                Customize Your Chat Interface
              </div>
            </div>
          </div>
          <div className="pb-2">
            <Separator className=" bg-slate-300" />
          </div>
          <div className="flex w-full h-[500px] justify-center gap-12">
            <div className="w-[633px] h-[500px] max-w-full max-h-full overflow-y-auto custom-scroll bg-white rounded-xl border border-slate-300 px-7 py-7 ">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-center gap-6">
                    <div className="  ">
                      <FormField
                        control={form.control}
                        name="prompts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                              Input placeholder
                            </FormLabel>
                            <FormControl>
                              <div className="">
                                <Input
                                  placeholder="Write message"
                                  {...field}
                                  disabled={isPending}
                                  className="grow shrink basis-0 opacity-50 text-zinc-800 text-sm font-normal font-leading-tight w-[274px] h-11 px-[15px] py-3 bg-white rounded-md border border-slate-300 justify-start items-start gap-2.5 inline-flex"
                                />
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
                    <div>
                      <FormField
                        control={form.control}
                        name="prompts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                              Add disclaimer text
                            </FormLabel>
                            <FormControl>
                              <div className="">
                                <Input
                                  placeholder="Write message"
                                  {...field}
                                  disabled={isPending}
                                  className="grow shrink basis-0 opacity-50 text-zinc-800 text-sm font-normal font-leading-tight w-[274px] h-11 px-[15px] py-3 bg-white rounded-md border border-slate-300 justify-start items-start gap-2.5 inline-flex"
                                />
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
                  </div>
                  <div className="w-full h-11 flex justify-center items-center gap-1.5">
                    <Button className="w-[573px] h-11 px-5 py-3 bg-white rounded-md border border-stone-500 ">
                      <div className="text-center text-zinc-900 text-sm font-semibold leading-tight">
                        Add data form
                      </div>
                    </Button>
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="prompts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                              Input placeholder
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="text-[14px] pl-5 text-zinc-800 text-sm font-normal leading-tight w-[274px] h-11 px-[15px] py-3 bg-white rounded-md border border-slate-300 justify-between items-center inline-flex">
                                <SelectTrigger>
                                  <SelectValue placeholder="default" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="👋 Hi, how can I help you?">
                                  👋 Hi, how can I help you?
                                </SelectItem>
                                <SelectItem value="👋 Hi, how can I help you1?">
                                  👋 Hi, how can I help you?
                                </SelectItem>
                                <SelectItem value="👋 Hi, how can I help you2?">
                                  👋 Hi, how can I help you?
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
                    <div className="">
                      <FormField
                        control={form.control}
                        name="prompts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                              Fontsize
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="text-[14px] pl-5 text-zinc-800 text-sm font-normal leading-tight w-[274px] h-11 px-[15px] py-3 bg-white rounded-md border border-slate-300 justify-between items-center inline-flex">
                                <SelectTrigger>
                                  <SelectValue placeholder="14" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="👋 Hi, how can I help you?">
                                  👋 Hi, how can I help you?
                                </SelectItem>
                                <SelectItem value="👋 Hi, how can I help you1?">
                                  👋 Hi, how can I help you?
                                </SelectItem>
                                <SelectItem value="👋 Hi, how can I help you2?">
                                  👋 Hi, how can I help you?
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
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <div className="  ">
                      <FormField
                        control={form.control}
                        name="prompts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                              Background color
                            </FormLabel>
                            <FormControl>
                              <div className="w-[274px] h-11 px-[15px] py-3 bg-white rounded-md border border-slate-300 justify-start items-center gap-3 inline-flex">
                                <div className="w-5 h-5 bg-white rounded-full border border-slate-300" />
                                <div className="grow shrink basis-0 text-zinc-800 text-sm font-normal leading-tight">
                                  #FFFFFF
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
                    <div>
                      <FormField
                        control={form.control}
                        name="prompts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                              Input background
                            </FormLabel>
                            <FormControl>
                              <div className="w-[274px] h-11 px-[15px] py-3 bg-white rounded-md border border-slate-300 justify-start items-center gap-3 inline-flex">
                                <div className="w-5 h-5 bg-white rounded-full border border-slate-300" />
                                <div className="grow shrink basis-0 text-zinc-800 text-sm font-normal leading-tight">
                                  #FFFFFF
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
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <div className="  ">
                      <FormField
                        control={form.control}
                        name="prompts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                              Use font color
                            </FormLabel>
                            <FormControl>
                              <div className="w-[274px] h-11 px-[15px] py-3 bg-white rounded-md border border-slate-300 justify-start items-center gap-3 inline-flex">
                                <div className="w-5 h-5 bg-white rounded-full border border-slate-300" />
                                <div className="grow shrink basis-0 text-zinc-800 text-sm font-normal leading-tight">
                                  #FFFFFF
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
                    <div>
                      <FormField
                        control={form.control}
                        name="prompts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                              Prompts font color
                            </FormLabel>
                            <FormControl>
                              <div className="w-[274px] h-11 px-[15px] py-3 bg-white rounded-md border border-slate-300 justify-start items-center gap-3 inline-flex">
                                <div className="w-5 h-5 bg-neutral-900 rounded-full border border-slate-300" />
                                <div className="grow shrink basis-0 text-zinc-800 text-sm font-normal leading-tight">
                                  #161616
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
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <div className="  ">
                      <FormField
                        control={form.control}
                        name="prompts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                              AllyBy font color
                            </FormLabel>
                            <FormControl>
                              <div className="w-[274px] h-11 px-[15px] py-3 bg-white rounded-md border border-slate-300 justify-start items-center gap-3 inline-flex">
                                <div className="w-5 h-5 bg-white rounded-full border border-slate-300" />
                                <div className="grow shrink basis-0 text-zinc-800 text-sm font-normal leading-tight">
                                  #FFFFFF
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
                    <div>
                      <FormField
                        control={form.control}
                        name="prompts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                              Scroll bar color
                            </FormLabel>
                            <FormControl>
                              <div className="w-[274px] h-11 px-[15px] py-3 bg-white rounded-md border border-slate-300 justify-start items-center gap-3 inline-flex">
                                <div className="w-5 h-5 bg-slate-300 rounded-full border border-slate-300" />
                                <div className="grow shrink basis-0 text-zinc-800 text-sm font-normal leading-tight">
                                  #D2D9E8
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
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="prompts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                            Add your CSS here
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Add your CSS here"
                              {...field}
                              disabled={isPending}
                              className="w-[573px] h-11 px-[15px] py-3 bg-white rounded-md border border-slate-300 justify-start items-start gap-2.5 inline-flex grow shrink basis-0 opacity-50 text-zinc-800 text-sm font-normal leading-tight"
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
                  <div>
                    <div>
                      <FormField
                        control={form.control}
                        name="prompts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                              Chatbot logo link
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center justify-between gap-5">
                                <Input
                                  placeholder="https://allybyai.com"
                                  {...field}
                                  disabled={isPending}
                                  className="w-[573px] h-11 px-[15px] py-3 bg-white rounded-md border border-slate-300 justify-start items-start gap-2.5 inline-flex grow shrink basis-0 opacity-50 text-zinc-800 text-sm font-normal leading-tight"
                                />
                                <div className="w-[120px] h-11 px-[15px] py-3.5 bg-neutral-900 rounded-md border justify-center items-center gap-1.5 inline-flex">
                                  <Image
                                    src="/icons/Frame 12.svg"
                                    alt="x"
                                    width={100}
                                    height={50}
                                  ></Image>
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
                  </div>
                  <div className="flex items-center justify-center py-10 gap-6">
                    <Button
                      onClick={handlePreviousStep}
                      className="w-[254px] h-[50px] py-3.5 bg-gray-200 rounded-md border justify-center items-center gap-1.5 inline-flex"
                    >
                      <div className="relative">
                        <Undo2 className="w-4 h-4 shrink-0 opacity-50  text-black" />
                      </div>
                      <div className=" text-sm font-semibold leading-snug text-neutral-900">
                        Back
                      </div>
                    </Button>
                    <Button className="w-[254px] h-[50px] py-3.5 bg-neutral-900 rounded-md border justify-center items-center gap-1.5 inline-flex">
                      <div className="relative">
                        <Check className="w-4 h-4 shrink-0 opacity-50 text-white" />
                      </div>
                      <div className="text-white text-sm font-semibold leading-snug">
                        Confirm
                      </div>
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            <PoweredByAllyAI />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotConfig;
