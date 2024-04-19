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
import { CardWrapperPorgotPassword } from "../card-wrapper-forgot-password";

const ForgotPasswordForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowPassword(!showConfirmPassword);
  };
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
    const result = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/forgot-password`,
      {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    ).then((res) => res.json());
    console.log(result);
  }

  return (
    <CardWrapperPorgotPassword>
      <div>
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
                        className="pl-[20px] text-[16px] font-normal leading-[26px]"
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
              <AuthButton type="submit" className="max-w-[363px] font-semibold">
                Submit
              </AuthButton>
            </div>
          </form>
        </Form>
      </div>
    </CardWrapperPorgotPassword>
  );
};

export default ForgotPasswordForm;
