"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { ForgotPasswordSchema, ForgotPasswordBodyType } from "@/schemas";

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
import AuthButton from "../../ui/auth-button";
import LgButton from "../../ui/lg-button";
import { SignInButton } from "../sign-in/sign-in-button";
import ImageLogo from "../image-logo";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import envConfig from "@/app/config";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import authApiRequest from "@/app/apiRequests/auth";
import { handleErrorApi } from "@/lib/utils";

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ForgotPasswordBodyType>();

  const form = useForm<ForgotPasswordBodyType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordBodyType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.forgotPassword(values);
      toast({
        title: "Success",
        description: "Forgot password in successfully!",
      });
      router.push("/sign-in");
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
    <div className="flex">
      <ImageLogo />
      <div>
        <div className="flex text-[14px] leading-[24px] pt-[30px] pl-[214px] gap-[10px] text-[#161616]">
          <p className="pt-[8px] font-normal text-right">
            Already have an account?
          </p>
          <SignInButton>
            <LgButton className="font-semibold w-[84.9px] h-[40px]">
              Sign in
            </LgButton>
          </SignInButton>
        </div>
        <div className="pl-[90px] pr-[90px]">
          <div className="text-center max-w-[363px] pt-[60px] text-[36px] font-semibold leading-normal text-gray-[#1D1D1F]">
            <h1>Forgot password</h1>
          </div>
          <div className="pt-[12px] max-w-[363px] pr-[p90x]">
            <p className="text-center text-[16px] font-normal leading-[26px] text-gray-[#2C2C2C]">
              Please provide the email address that you used when you signed up
              for your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
              <div className="pt-[24px] ">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          disabled={isPending}
                          className="pl-5 w-[363px] h-[60px] bg-white rounded-xl border border-gray-200"
                          type="email"
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

              <div className="pb-3 pt-3">
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>
              <div className=" flex items-center justify-between  text-[16px] leading-[26px] ">
                <AuthButton
                  type="submit"
                  className="max-w-[363px] font-semibold"
                >
                  Submit
                </AuthButton>
              </div>

              <div className="text-center pt-[200px] text-[14px] font-normal leading-[24px]">
                <p>
                  <span className="underline">Term of Service&nbsp;</span>
                  <span className=" text-amber-[#2C2C2C] ">|&nbsp;</span>
                  <span className="underline">Privacy Statement</span>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
