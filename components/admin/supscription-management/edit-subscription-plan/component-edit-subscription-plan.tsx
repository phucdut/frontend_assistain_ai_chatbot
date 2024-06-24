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
import {
  ChatbotResType,
  EditChatbotBodyType,
  EditChatbotSchema,
} from "@/schemas/chatbot.schema";
import accountApiRequest from "@/app/apiRequests/account";
import { AccountResType } from "@/schemas/account.schema";
import { FilePenLine } from "lucide-react";
import {
  EditSubscriptionPlanBodyType,
  EditSubscriptionPlanResType,
  EditSubscriptionPlanSchema,
} from "@/schemas/subscription-plan.schema";
import subscriptionPlanApiRequest from "@/app/apiRequests/subscription-plan";

type ComponentEditSubPlanProps = {
  id: string;
};

const ComponentEditSubPlan = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> &
    ComponentEditSubPlanProps
>(({ className, onValueChange, id, ...props }, ref) => {
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [subPlan, setSubPlan] = useState<EditSubscriptionPlanResType | null>(
    null
  );
  const [success, setSuccess] = useState<string | undefined>("");

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditSubscriptionPlanBodyType>();

  const form = useForm<EditSubscriptionPlanBodyType>({
    resolver: zodResolver(EditSubscriptionPlanSchema),
    defaultValues: {
      plan_title: "",
      plan_price: "",
      message_credits: "",
      max_character_per_chatbot: "",
      number_of_chatbots: "",
      available_model: "",
      // live_agent_takeover: false,
    },
  });

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (id) {
          const result =
            await subscriptionPlanApiRequest.subscriptionPlanClient(id);
          setSubPlan(result.payload);
          // console.log(result);

          // Update form values with fetched chatbot data
          form.setValue("plan_title", result.payload.plan_title || "");
          form.setValue(
            "plan_price",
            result.payload.plan_price.toString() || ""
          );
          form.setValue(
            "message_credits",
            result.payload.message_credits.toString() || ""
          );
          form.setValue(
            "max_character_per_chatbot",
            result.payload.max_character_per_chatbot.toString() || ""
          );
          form.setValue(
            "number_of_chatbots",
            result.payload.number_of_chatbots.toString() || ""
          );
          form.setValue(
            "available_model",
            result.payload.available_model || ""
          );
          form.setValue(
            "live_agent_takeover",
            result.payload.live_agent_takeover || false
          );
        }
      } catch (error) {
        handleErrorApi({
          error,
        });
      }
    };
    fetchRequest();
  }, [id, form, toast]);

  async function onSubmit(values: EditSubscriptionPlanBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      if (id) {
        const result = await subscriptionPlanApiRequest.updateSubscriptionPlan(
          values,
          id
        );
        toast({
          title: "Success",
          description: "Subscription plan update successfully!",
        });
        router.push(`/chatbots/${result.payload.id}`);
        router.refresh();
      }
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
      <div className="px-3 h-[800px] overflow-y-auto custom-scroll">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 space-x-6"
          >
            <div className="overflow-y-auto custom-scroll hide-scrollbar">
              <div className="pt-5 ">
                <FormField
                  control={form.control}
                  name="plan_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px]  font-semibold">
                        Plan Title
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
                  name="plan_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px]  font-semibold">
                        Plan price
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
                  name="available_model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px]  font-semibold ">
                        Available model
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="text-[14px] font-normal leading-[20px] pl-5 -2 ">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gpt-3.5-turbo">
                            GPT-3.5-Turbo LLM
                          </SelectItem>
                          <SelectItem value="gpt-4">GPT-4 LLM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription></FormDescription>
                      <FormMessage className="text-red-500 text-[14px] font-normal leading-[26px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="pt-5">
                <FormField
                  control={form.control}
                  name="message_credits"
                  render={({ field }, disabled = { isPending }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px]  font-semibold">
                        Message credits
                      </FormLabel>
                      <FormControl className="text-[14px] font-normal leading-[20px] -2">
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
              <div className="pt-8">
                <FormField
                  control={form.control}
                  name="max_character_per_chatbot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px]  font-semibold">
                        Max character per chatbot
                      </FormLabel>
                      <FormControl className="text-[14px] font-normal leading-[20px]  -2">
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
              <div className="pt-8">
                <FormField
                  control={form.control}
                  name="number_of_chatbots"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px]  font-semibold ">
                        Number of chatbots
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
              <div className="flex items-center justify-between pt-5 text-[14px] font-normal leading-[24px] -2">
                <div className="flex items-center justify-between">
                  <input
                    type="checkbox"
                    disabled={isPending}
                    checked={form.getValues("live_agent_takeover")}
                    onChange={(e) =>
                      form.setValue("live_agent_takeover", e.target.checked)
                    }
                    className="w-6 h-6 gap-[10px] checkbox-set"
                  ></input>
                  <p className="pl-[10px] pr-6">Set as live agent takeover</p>
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
                  <FilePenLine />
                  Update
                </BuildButton>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
});
ComponentEditSubPlan.displayName = SliderPrimitive.Root.displayName;
export { ComponentEditSubPlan };
