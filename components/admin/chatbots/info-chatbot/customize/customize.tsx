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

type CustomizeProps = {
  id: string;
};

const Customize: React.FC<CustomizeProps> = ({ id }) => {
  React.useEffect(() => {
    if (id) {
      // Gọi API với id
      console.log("Chatbot ID:", id);
      // Your API call logic here
    }
  }, [id]);

  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState(false);

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
    <div className="bg-custom-gray-4 h-full w-full rounded-md">
      <div className="flex justify-center bg-white">Customize</div>
      <p>Chatbot ID: {id}</p>
      <div>
        <div className="flex justify-start pt-2 pb-5 pl-10 bg-white">
          <div className="w-[26px] h-[26px] bg-black rounded-full relative pt-5">
            <div className="absolute inset-y-[5px] inset-x-[10px] text-center text-white text-sm font-semibold leading-tight">
              1
            </div>
          </div>
          <div className="flex items-center justify-center pl-[10px] text-zinc-800 text-sm font-semibold leading-snug">
            Customize Chatbot Behavior
          </div>
          <div className="flex items-center justify-center pl-[10px] pr-[10px]">
            <MoveRight className="w-5 shrink-0 opacity-50" />
          </div>
          <div className="w-[26px] h-[26px] bg-slate-300 rounded-full relative pt-5">
            <div className="absolute inset-y-[5px] inset-x-[9px] text-center text-white text-sm font-semibold leading-tight">
              2
            </div>
          </div>
          <div className="flex items-center justify-center pl-[10px] pr-[20px] text-stone-500 text-sm font-normal leading-snug">
            Customize Your Chat Interface
          </div>
        </div>
      </div>
      <div className="pb-2">
        <Separator className=" bg-slate-300" />
      </div>
      {/* Đây là ui 1 của customize */}
      {/* <div className="flex items-center justify-center">
        <div className="w-[565px] h-[436px] bg-white rounded-xl border border-slate-300 ">
          <div className="text-zinc-800 text-xl font-semibold leading-[30px] py-8 pl-8">
            Customize Chatbot Behavior
          </div>
          <div className="text-zinc-900 text-sm font-semibold leading-normal pb-2 pl-8">
            Base prompt (system message)
          </div>
          <div className="pl-8">
            <Textarea
              placeholder="You are a helpful assistant. The first prompt will be a long text, and any messages that you get be regarding that. Please answer any questions and requests having in mind the first prompt."
              defaultValue="You are a helpful assistant. The first prompt will be a long text, and any messages that you get be regarding that. Please answer any questions and requests having in mind the first prompt."
              className="w-[525px] h-[108px] px-[15px] py-3 bg-white rounded-md border border-slate-300 text-[14px] font-normal leading-[20px] text-slate-900 overflow-hidden "
            />
          </div>
          <div className="flex items-center justify-center py-10">
            <Button className="w-[505px] h-[50px] py-3.5 bg-neutral-900 rounded-md border justify-center items-center gap-1.5 inline-flex">
              <div className="relative">
                <Check className="w-4 h-4 shrink-0 opacity-50 text-white" />
              </div>

              <div className="text-white text-sm font-semibold leading-snug">
                Next
              </div>
            </Button>
          </div>
        </div>
      </div> */}
      <div className="flex items-center justify-between pl-2">
        <div className="w-full h-[436px] bg-white rounded-xl border border-slate-300 ">
          <div className="flex items-center justify-between">
            <div className="text-zinc-800 text-xl font-semibold leading-[30px] pl-8">
              Customize Your Chat Interface
            </div>
            <div className="w-[140px] h-9 px-[15px] bg-white rounded-md border border-zinc-800 justify-center items-center gap-1.5 inline-flex">
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
                        <FormLabel className="text-zinc-900 text-sm font-medium leading-normal ">
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
                        <FormLabel className="text-zinc-900 text-sm font-medium leading-normal ">
                          Initial suggested prompts
                        </FormLabel>
                        <FormControl className="text-[14px] pl-5 text-zinc-800 text-sm font-normal leading-tight">
                          <Textarea
                            placeholder="You are a helpful assistant. The first prompt will be a long text, and any messages that you get be regarding that. Please answer any questions and requests having in mind the first prompt."
                            defaultValue="You are a helpful assistant. The first prompt will be a long text, and any messages that you get be regarding that. Please answer any questions and requests having in mind the first prompt."
                            {...field}
                            className="w-[525px] h-[108px] px-[15px] py-3 bg-white rounded-md border border-slate-300 text-[14px] font-normal leading-[20px] text-slate-900 overflow-hidden "
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
                <div className="flex items-center justify-between">
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
                      <p className="pl-[10px] pr-[67px]">Remember me</p>
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
                      <p className="pl-[10px] pr-[67px]">Remember me</p>
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
                      <p className="pl-[10px] pr-[67px]">Remember me</p>
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
                      <p className="pl-[10px] pr-[67px]">Remember me</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <input
                        type="checkbox"
                        disabled={isPending}
                        className="checkbox gap-[10px]"
                        checked={form.getValues("hideMicrophone")}
                        onChange={(e) =>
                          form.setValue("hideMicrophone", e.target.checked)
                        }
                      ></input>
                      <p className="pl-[10px] pr-[67px]">Remember me</p>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
          <div className="flex items-center justify-center py-10 gap-6">
            <Button className="w-[254px] h-[50px] py-3.5 bg-gray-200 rounded-md border justify-center items-center gap-1.5 inline-flex">
              <div className="relative">
                <Undo2 className="w-4 h-4 shrink-0 opacity-50 text-white" />
              </div>
              <div className="text-white text-sm font-semibold leading-snug">
                Back
              </div>
            </Button>
            <Button className="w-[254px] h-[50px] py-3.5 bg-neutral-900 rounded-md border justify-center items-center gap-1.5 inline-flex">
              <div className="relative">
                <Check className="w-4 h-4 shrink-0 opacity-50 text-white" />
              </div>
              <div className="text-white text-sm font-semibold leading-snug">
                Next
              </div>
            </Button>
          </div>
        </div>
        <div className="w-full h-[572px] bg-gray-50 rounded-xl shadow border border-slate-300 ">
          <div className="flex items-center justify-between px-4 pt-2 w-[370px] h-[60px] rounded-xl bg-white">
            <Image
              src="/Horizontal-logo.png"
              alt="logo"
              width={36}
              height={36}
            />
            <div className="opacity-50 text-center text-neutral-900 text-[13px] font-normal leading-[18px]">
              Powered by Ally AI
            </div>
            <X className="w-4 h-4 relative" />
          </div>
          <div className="px-1 pb-0 relative">
            <div className="text-[16px] font-normal leading-[18px] relative w-full ">
              <Input
                placeholder="Write your message"
                type="email"
                className=" "
              />
              <Button className="absolute inset-y-1 right-5  w-11 h-11">
                <Image
                  src="/paper-plane 1.svg"
                  alt="send"
                  width={20}
                  height={20}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
