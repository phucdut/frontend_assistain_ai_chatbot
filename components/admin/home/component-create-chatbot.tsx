"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn, handleErrorApi } from "@/lib/utils";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as React from "react";
import { z } from "zod";
import {
  CreateChatbotSchema,
  CreateChatbotBodyType,
} from "@/schemas/create-chatbot.schema";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";

type ComponentCreateChatbotProps = {
  id: string;
};

const ComponentCreateChatbot = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> &
    ComponentCreateChatbotProps
>(({ className, onValueChange, id, ...props }, ref) => {
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [sliderTemperatureValue, setTemperatureValue] = useState(0.5);
  const [sliderMaxTokenValue, setMaxTokenValue] = useState(100);
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateChatbotBodyType>();

  const form = useForm<CreateChatbotBodyType>({
    resolver: zodResolver(CreateChatbotSchema),
    defaultValues: {
      chatbot_name: "",
      description: "",
      model: "",
      temperature: "0.5",
      max_tokens: "100",
      prompt:
        "You are a helpful assistant. The first prompt will be a long text, and any messages that you get be regarding that. Please answer any questions and requests having in mind the first prompt.",
    },
  });
  const handleTemperatureValueChange = (newValue: number[]) => {
    setTemperatureValue(newValue[0]);
    // console.log(`Slider value has changed to: ${sliderValue}`);
    form.setValue("temperature", newValue[0].toString());
  };
  const handleMaxTokenValueChange = (newValue: number[]) => {
    setMaxTokenValue(newValue[0]);
    form.setValue("max_tokens", newValue[0].toString());
  };

  useEffect(() => {
    // console.log(`Slider value has changed to: ${sliderMaxTokenValue}`);
  }, [sliderMaxTokenValue]);

  useEffect(() => {
    // console.log(`Slider value has changed to: ${sliderTemperatureValue}`);
  }, [sliderTemperatureValue]);

  async function onSubmit(values: CreateChatbotBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await chatbotApiRequest.createChatbot(values, id);
      toast({
        title: "Success",
        description: "Chatbot added successfully!",
      });
      console.log(result);
      // router.push("/info-chatbot");
      router.push(`/chatbots/${result.payload.id}`);
      router.refresh();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <div className="px-3 overflow-y-auto custom-scroll h-[800px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 space-x-6"
          >
            <div className="overflow-auto hide-scrollbar">
              <div className="pt-5 ">
                <FormField
                  control={form.control}
                  name="chatbot_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                        Chatbot name
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
              <div className="pt-5 ">
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold ">
                        Model
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="text-[14px] font-normal leading-[20px] pl-5 text-custom-gray-2 ">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gpt-3.5-turbo">
                            GPT-3.5-Turbo
                          </SelectItem>
                          {/* <SelectItem value="gpt-4">
                          GPT-4
                          </SelectItem>
                          <SelectItem value="GPT-4.0-TurboPlus">
                            GPT-4.0-TurboPlus
                          </SelectItem> */}
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
                  render={({ field }, disabled = { isPending }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                        Temperature
                      </FormLabel>
                      <FormControl className="text-[14px] font-normal leading-[20px] text-custom-gray-2">
                        <SliderPrimitive.Root
                          ref={ref}
                          className={cn(
                            "relative flex w-full touch-none select-none items-center",
                            className
                          )}
                          onValueChange={handleTemperatureValueChange}
                          defaultValue={[0.5]}
                          min={0}
                          max={1}
                          step={0.01}
                          {...props}
                        >
                          <SliderPrimitive.Track className="relative h-[1px] w-full grow overflow-hidden rounded-full bg-[#D2D9E8]">
                            <SliderPrimitive.Range className="absolute h-full" />
                          </SliderPrimitive.Track>
                          <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border-2 border-primary bg-[#2C2C2C] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                            <div className="absolute top-[calc(-100% - 8px)] top-3 left-1/2 transform -translate-x-1/2 text-xs">
                              {sliderTemperatureValue}
                            </div>
                          </SliderPrimitive.Thumb>
                          <div className="absolute right-[1px] top-1/2 transform -translate-y-1/2 w-[10px] h-[10px] rounded-full border-2 border-[#D2D9E8] bg-[#fff]" />
                          <div className="absolute left-[1px] top-1/2 transform -translate-y-1/2 w-[10px] h-[10px] rounded-full border-2 border-[#D2D9E8] bg-[#fff]" />
                          <div className="absolute left-[2px] bottom-[-6px] transform translate-y-full text-xs">
                            0
                          </div>
                          <div className="absolute right-1 bottom-[-6px] transform translate-y-full text-xs">
                            1
                          </div>
                        </SliderPrimitive.Root>
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
                  name="max_tokens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                        Max tokens
                      </FormLabel>
                      <FormControl className="text-[14px] font-normal leading-[20px]  text-custom-gray-2">
                        <SliderPrimitive.Root
                          ref={ref}
                          className={cn(
                            "relative flex w-full touch-none select-none items-center",
                            className
                          )}
                          onValueChange={handleMaxTokenValueChange}
                          defaultValue={[100]}
                          min={10}
                          max={500}
                          step={1}
                          {...props}
                        >
                          <SliderPrimitive.Track className="relative h-[1px] w-full grow overflow-hidden rounded-full bg-[#D2D9E8]">
                            <SliderPrimitive.Range className="absolute h-full" />
                          </SliderPrimitive.Track>
                          <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border-2 border-primary bg-[#2C2C2C] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                            <div className="absolute top-[calc(-100% - 8px)] top-3 left-1/5 transform -translate-x-1/2 text-xs">
                              {sliderMaxTokenValue}
                            </div>
                          </SliderPrimitive.Thumb>
                          <div className="absolute right-[1px] top-1/2 transform -translate-y-1/2 w-[10px] h-[10px] rounded-full border-2 border-[#D2D9E8] bg-[#fff]" />
                          <div className="absolute left-[1px] top-1/2 transform -translate-y-1/2 w-[10px] h-[10px] rounded-full border-2 border-[#D2D9E8] bg-[#fff]" />
                          <div className="absolute left-[-4px] bottom-[-6px] transform translate-y-full text-xs">
                            10
                          </div>
                          <div className="absolute right-[-1px] bottom-[-6px] transform translate-y-full text-xs">
                            500
                          </div>
                        </SliderPrimitive.Root>
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
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold ">
                        Prompt title
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="You are a helpful assistant. The first prompt will be a long text, and any messages that you get be regarding that. Please answer any questions and requests having in mind the first prompt."
                          defaultValue="You are a helpful assistant. The first prompt will be a long text, and any messages that you get be regarding that. Please answer any questions and requests having in mind the first prompt."
                          {...field}
                          disabled={isPending}
                          className="w-[400px] h-[108px] px-[15px] py-3 bg-white rounded-md border border-slate-300 text-[14px] font-normal leading-[20px] text-slate-900  "
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
                    checked={form.getValues("is_default")}
                    onChange={(e) =>
                      form.setValue("is_default", e.target.checked)
                    }
                    className="w-6 h-6 gap-[10px] checkbox-set"
                  ></input>
                  <p className="pl-[10px] pr-6">Set as default chatbot</p>
                </div>
              </div>
              <div className="pb-3 pt-3">
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>
              <div className=" flex items-center justify-between pt-5 pb-32 text-[14px] leading-[22px] ">
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
});
ComponentCreateChatbot.displayName = SliderPrimitive.Root.displayName;
export { ComponentCreateChatbot };
