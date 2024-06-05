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
import CustomizeChatbotBehavior from "./customize-chatbot-behavior";
import PoweredByAllyAI from "./powered-by-ally-ai";
import ChatbotConfig from "./chatbot-config";

const CustomizeYourChatInterface = () => {
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
      prompts: "👋 Hi, how can I help you?",
      initPrompts:
        "Give me a summary of this knowledge base\nWrite a pem about this knowledge base\nTell me five key points about this knowledge base",
    },
  });
  async function onSubmit(values: CustomizeResType) {
    console.log(values);
  }
  return (
    <div>
      {/* Các phần tử tương ứng với bước 1 */}
      {step === 0 && (
        <div>
          <CustomizeChatbotBehavior />
        </div>
      )}
      {step === 1 && (
        <div>
          <div>
            <div className="flex justify-start pt-2 pb-5 pl-10 ">
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
          <div className="flex w-full h-[500px] justify-center overflow-y-auto custom-scroll gap-12">
            {/* <ChatbotConfig /> */}
            <div className="flex w-full h-[500px] justify-center gap-12">
              {step === 1 && (
                <div className="w-[633px] h-[500px] max-w-full max-h-full overflow-y-auto custom-scroll bg-white rounded-xl border border-slate-300 px-7 py-7 ">
                  <div className="w-full flex items-center justify-between">
                    <div className="text-zinc-800 text-xl font-semibold leading-[30px]">
                      Customize Your Chat Interface
                    </div>
                    <div className="w-[145px] h-9 px-[15px] py-2 bg-white rounded-md border border-zinc-800 justify-center items-center gap-1.5 inline-flex">
                      <div className="text-center text-zinc-900 text-sm font-semibold leading-tight">
                        Embed preview
                      </div>
                    </div>
                  </div>
                  <div>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <div className="pt-5 ">
                          <FormField
                            control={form.control}
                            name="prompts"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                                  Initial suggested prompts
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl className="text-[14px] pl-5 text-zinc-800 text-sm font-normal leading-tight">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select" />
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
                        <div className="opacity-70 text-stone-500 text-[13px] font-normal leading-[18px]">
                          Enter each message on a new line
                        </div>
                        <div className="pt-5 ">
                          <FormField
                            control={form.control}
                            name="initPrompts"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-zinc-900 text-sm font-medium leading-normal">
                                  Initial suggested prompts
                                </FormLabel>
                                <FormControl className="text-[14px] pl-5 text-zinc-800 text-sm font-normal leading-tight">
                                  <Textarea
                                    placeholder="You are a helpful assistant. The first prompt will be a long text, and any messages that you get be regarding that. Please answer any questions and requests having in mind the first prompt."
                                    defaultValue="You are a helpful assistant. The first prompt will be a long text, and any messages that you get be regarding that. Please answer any questions and requests having in mind the first prompt."
                                    {...field}
                                    className="w-[573px] h-[108px] px-[15px] py-3 bg-white rounded-md border border-slate-300 text-[14px] font-normal leading-[20px] text-slate-900 resize-none overflow-y-auto custom-scroll "
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
                        <div className="opacity-70 text-stone-500 text-[13px] font-normal leading-[18px]">
                          Enter each message on a new line
                        </div>
                        <div className="flex items-center justify-between w-[573px] pt-5">
                          <div>
                            <div className="flex items-center justify-between">
                              <input
                                type="checkbox"
                                disabled={isPending}
                                className="checkbox gap-[10px]"
                                checked={form.getValues("showInit")}
                                onChange={(e) =>
                                  form.setValue("showInit", e.target.checked)
                                }
                              ></input>
                              <p className="pl-[10px] pr-[67px] w-[255px] text-zinc-900 text-sm font-normal leading-normal">
                                Show initial message as tooltip
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <input
                                type="checkbox"
                                disabled={isPending}
                                className="checkbox gap-[10px]"
                                checked={form.getValues("showSuggest")}
                                onChange={(e) =>
                                  form.setValue("showSuggest", e.target.checked)
                                }
                              ></input>
                              <p className="pl-[10px] pr-[67px] w-[255px] text-zinc-900 text-sm font-normal leading-normal">
                                Only show suggested prompts once
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <input
                                type="checkbox"
                                disabled={isPending}
                                className="checkbox gap-[10px]"
                                checked={form.getValues("chatOpen")}
                                onChange={(e) =>
                                  form.setValue("chatOpen", e.target.checked)
                                }
                              ></input>
                              <p className="pl-[10px] pr-[67px] w-[255px] text-zinc-900 text-sm font-normal leading-normal">
                                Chat open by default
                              </p>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <input
                                type="checkbox"
                                disabled={isPending}
                                className="checkbox gap-[10px]"
                                checked={form.getValues("remove")}
                                onChange={(e) =>
                                  form.setValue("remove", e.target.checked)
                                }
                              ></input>
                              <p className="pl-[10px] pr-[67px] w-[255px] text-zinc-900 text-sm font-normal leading-normal">
                                Remove “Powered by AllyBy AI”
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <input
                                type="checkbox"
                                disabled={isPending}
                                className="checkbox gap-[10px]"
                                checked={form.getValues("hideMicrophone")}
                                onChange={(e) =>
                                  form.setValue(
                                    "hideMicrophone",
                                    e.target.checked
                                  )
                                }
                              ></input>
                              <p className="pl-[10px] pr-[67px] w-[255px] text-zinc-900 text-sm font-normal leading-normal">
                                Hide microphone
                              </p>
                            </div>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </div>
                  <div className="flex items-center justify-center py-10 gap-6">
                    <Button
                      onClick={handlePreviousStep}
                      className="w-[254px] h-[50px] py-3.5 bg-gray-200 rounded-md border justify-center items-center gap-1.5 inline-flex"
                    >
                      <div className="relative">
                        <Undo2 className="w-4 h-4 shrink-0 opacity-50 text-black" />
                      </div>
                      <div className="text-gray-900 text-sm font-semibold leading-snug">
                        Back
                      </div>
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="w-[254px] h-[50px] py-3.5 bg-neutral-900 rounded-md border justify-center items-center gap-1.5 inline-flex"
                    >
                      <div className="relative">
                        <Check className="w-4 h-4 shrink-0 opacity-50 text-white" />
                      </div>
                      <div className="text-white text-sm font-semibold leading-snug">
                        Next
                      </div>
                    </Button>
                  </div>
                </div>
              )}
              <PoweredByAllyAI />
            </div>
            {/* <PoweredByAllyAI /> */}
          </div>
        </div>
      )}
      {step === 2 && <ChatbotConfig />}
    </div>
  );
};

export default CustomizeYourChatInterface;
