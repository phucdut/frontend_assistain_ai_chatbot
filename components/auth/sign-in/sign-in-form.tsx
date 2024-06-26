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
import authApiRequest from "@/app/apiRequests/auth";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import chatbotApiRequest from "@/app/apiRequests/chatbot";

const SignInForm1 = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
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
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.signIn(values);
      toast({
        title: "Success",
        description: "Sign in successfully!",
      });
      await authApiRequest.auth({
        sessionToken: result.payload.access_token,
        // expiresAt: result.payload.data.expiresAt,
      });
      // await chatbotApiRequest.setCookieConverSationId({
      //   conversation_id: "99bc0984-f8de-407a990c-41651230e539",
      //   // expiresAt: result.payload.data.expiresAt,
      // });
      router.push("/home");
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
        <div className="flex text-[14px] pt-[30px] leading-[24px] pl-[231px] gap-[10px] text-[#161616]">
          <span className="pt-[8px] font-normal text-right">
            Don’t have an account?
          </span>
          <SignUpButton>
            <button className="btn-lg-container font-semibold h-[40px]">
              Sign up
            </button>
          </SignUpButton>
        </div>
        <div className="pl-[90px] pr-[90px]">
          <div className="max-w-[363px] pt-[60px]">
            <h1 className="text-center  text-[36px] font-semibold leading-normal text-gray-[#1D1D1F]">
              Sign in to AllyBy AI
            </h1>
          </div>
          <div className="pt-[12px] max-w-[363px]">
            <p className="text-center text-[16px] font-normal leading-[26px] text-gray-[#2C2C2C]">
              Welcome to AllyBy AI, please enter your login details below to
              using.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <div className=" pt-[24px] ">
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
                            className="pl-[20px] text-[16px] font-normal leading-[26px] input"
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
                              className="hide-password-icon pl-[20px] text-[16px] font-normal leading-[26px] input"
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
                                className="absolute inset-y-6 right-5 flex items-center justify-between pr-0 "
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
                      checked={form.getValues("rememberMe")}
                      onChange={(e) =>
                        form.setValue("rememberMe", e.target.checked)
                      }
                      className=" gap-[10px] w-8 h-8 bg-white rounded-md border border-gray-200"
                    ></input>
                    <p className="pl-[10px] pr-[67px]">Remember me</p>
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
                  <AuthButton
                    type="submit"
                    className="max-w-[363px] font-semibold"
                  >
                    Sign in
                  </AuthButton>
                </div>
                <div className=" ">
                  <Social />
                </div>
              </div>
              <div className="text-center text-[16px] font-normal leading-[26px]">
                <p>
                  New to AllyBy AI? Learn more&nbsp;
                  <span className="font-medium underline ">here</span>
                </p>
              </div>
              <div className="text-center  text-[14px] font-normal leading-[24px]">
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

export default SignInForm1;
