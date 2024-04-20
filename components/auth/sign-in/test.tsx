"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { SignInSchema, SignInBodyType } from "@/schemas";

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
import AuthButton from "../../ui/auth-button";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { SignUpButton } from "../sign-up/sign-up-button";
import ImageLogo from "../image-logo";
import { Social } from "../social";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import envConfig from "@/app/config";
import { CardWrapperSignIn } from "../card-wrapper-sign-in";

const SignInForm1 = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignInBodyType>();

  const form = useForm<SignInBodyType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: SignInBodyType) {
    try {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/sign-in`,
        {
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      toast({
        description: "Thành công",
      });
      const resultFromNextServer = await fetch("/api/auth/[...nextauth]", {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      console.log(resultFromNextServer);
      location.href = "/dashboard";
    } catch (error: any) {
      const errors = (error as any).payload.errors as {
        field: string;
        message: string;
        detail: string;
      }[];
      const status = error.status as number;
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as "email" | "password", {
            type: "server",
            message: error.detail,
          });
        });
      } else {
        toast({
          title: "error",
          description: error.payload.detail,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <CardWrapperSignIn>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 space-x-6">
            <div>
              <div>
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
              <div className="pt-[20px]">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your password"
                            {...field}
                            className="hide-password-icon pl-[20px] text-[16px] font-normal leading-[26px]"
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
                              className="absolute inset-y-6 right-9 flex items-center justify-between "
                            ></Image>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        {/* This is your public display password. */}
                      </FormDescription>
                      <FormMessage className="text-red-500 text-[14px] font-normal leading-[26px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-between  text-[16px] font-normal leading-[26px] text-gray-[#2C2C2C]">
                <div className="flex items-center justify-between">
                  <input
                    type="checkbox"
                    disabled={isPending}
                    className="checkbox gap-[10px]"
                    checked={form.getValues("rememberMe")}
                    onChange={(e) =>
                      form.setValue("rememberMe", e.target.checked)
                    }
                  ></input>
                  <p className="pl-[10px] pr-6">Remember me</p>
                  <div>
                    <Link href="/forgot-password">
                      <p className="underline">Forgot password</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="pb-3 pt-3">
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>
              <div className=" flex items-center justify-between text-[16px] leading-[26px] ">
                <AuthButton type="submit" className="font-semibold">
                  Sign in
                </AuthButton>
              </div>
              <div className=" ">
                <Social />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </CardWrapperSignIn>
  );
};

export default SignInForm1;