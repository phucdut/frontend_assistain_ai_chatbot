"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { SignUpSchema, SignUpBodyType } from "@/schemas";

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
import authApiRequest from "@/app/apiRequests/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { handleErrorApi } from "@/lib/utils";

const SignUpForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignUpBodyType>();

  const form = useForm<SignUpBodyType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignUpBodyType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.signUp(values);
      toast({
        title: "Success",
        description: "Sign up successfully!",
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
            <h1>Sign in to AllyBy AI</h1>
          </div>
          <div className="pt-[12px] max-w-[363px] pr-[p90x]">
            <p className="text-center text-[16px] font-normal leading-[26px] text-gray-[#2C2C2C]">
              Welcome to AllyBy AI, please enter your login details below to
              using.
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
              <div className="pt-[20px] ">
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
                            disabled={isPending}
                            className=" hide-password-icon pl-[20px] text-[16px] font-normal leading-[26px] input"
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
              <div>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your password a second time"
                            {...field}
                            disabled={isPending}
                            className="hide-password-icon pl-[20px] text-[16px]  font-normal leading-[26px] input"
                            type={showConfirmPassword ? "text" : "password"}
                          />
                          <div
                            className="eye-layout"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            <Image
                              src="/Layer 16.svg"
                              alt="Layer 16"
                              width={20}
                              height={12.45}
                              className="absolute inset-y-6 right-5 flex items-center justify-between pr-0"
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
              <div className="pb-3 pt-3">
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>
              <div className=" flex items-center justify-between  text-[16px] leading-[26px] ">
                <AuthButton
                  type="submit"
                  className="max-w-[363px] font-semibold"
                >
                  Sign up
                </AuthButton>
              </div>
              <div className="text-center pt-6 text-[16px] font-normal leading-[26px]">
                <p>
                  New to AllyBy AI? Learn more&nbsp;
                  <span className="font-medium underline ">here</span>
                </p>
              </div>
              <div className="text-center pt-14 text-[14px] font-normal leading-[24px]">
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

export default SignUpForm;
