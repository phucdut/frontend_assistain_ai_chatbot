"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, handleErrorApi } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-stores";
import Image from "next/image";
import "@/app/globals.css";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  AccountResType,
  ChangPasswordBody,
  ChangPasswordBodyType,
} from "@/schemas/account.schema";
import { useForm } from "react-hook-form";
import accountApiRequest from "@/app/apiRequests/account";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type ProfileProps = {
  id: string;
};

const ComponentChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState<AccountResType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChangPasswordBodyType>();

  const form = useForm<ChangPasswordBodyType>({
    resolver: zodResolver(ChangPasswordBody),
    defaultValues: {
      email: "",
      password_old: "",
      password_new: "",
    },
  });

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccount(result.payload);

        // Update form values with fetched chatbot data
        form.setValue("email", result.payload.email || "");
      } catch (error: any) {
        handleErrorApi({
          error,
        });
        router.push("/");
        router.refresh(); // Chuyển hướng người dùng về trang landing
      }
    };
    fetchRequest();
  }, [form, router]);

  async function onSubmit(values: ChangPasswordBodyType) {
    console.log(values);
    if (loading) return;
    setLoading(true);
    try {
      if (account?.id) {
        const result = await accountApiRequest.changePassword(
          values,
          account?.id
        );
        toast({
          title: "Success",
          description: "Update in successfully!",
        });
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
      {/* <div>{account?.id}</div> */}
      <div className="px-3 overflow-y-auto custom-scroll ">
        <div>
          <Separator className=" bg-slate-300" />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 space-x-6"
          >
            <div>
              <div className="pt-5 ">
                <FormField
                  control={form.control}
                  name="password_old"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                        Password Old
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter Password Old"
                            {...field}
                            disabled={isPending}
                            className="hide-password-icon w-[400px] h-12 pl-[20px] text-[14px] font-normal leading-[20px]"
                            type={showPassword ? "text" : "password"}
                          />
                          <div
                            className="eye-layout"
                            onClick={togglePasswordVisibility}
                          >
                            <Image
                              src="/Layer 16.svg"
                              alt="Layer 16"
                              width={20}
                              height={12.45}
                              className="absolute inset-y-4 right-10 flex items-center justify-between pr-0 "
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
              <div className="pt-2">
                <FormField
                  control={form.control}
                  name="password_new"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                        Password New
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter Password New"
                            {...field}
                            disabled={isPending}
                            className="hide-password-icon w-[400px] h-12 pl-[20px] text-[14px] font-normal leading-[20px]"
                            type={showPassword ? "text" : "password"}
                          />
                          <div
                            className="eye-layout"
                            onClick={togglePasswordVisibility}
                          >
                            <Image
                              src="/Layer 16.svg"
                              alt="Layer 16"
                              width={20}
                              height={12.45}
                              className="absolute inset-y-4 right-10 flex items-center justify-between pr-0 "
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
            <div className="flex justify-end items-center pr-10">
              <Button type="submit">Change Password</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ComponentChangePassword;
