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
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import envConfig from "@/app/config";
import { useAppContext } from "@/app/app-provider";
import { CardWrapperSignUp } from "../card-wrapper-sign-up";
import authApiRequest from "@/app/apiRequests/auth";

import { useToast } from '@/components/ui/use-toast'
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";

const SignUpForm1 = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const { setSessionToken } = useAppContext();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

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
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.signUp(values);
      toast({
        description: "Thành công",
      });
      // router.push("/sign-in");
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
    <CardWrapperSignUp>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
            <div className="">
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
                            className="absolute inset-y-6 right-9 flex items-center justify-between"
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
                          className="hide-password-icon pl-[20px] text-[16px]  font-normal leading-[26px]"
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
                            className="absolute inset-y-6 right-9 flex items-center justify-between"
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
              <AuthButton type="submit" className="font-semibold">
                Sign up
              </AuthButton>
            </div>
          </form>
        </Form>
      </div>
    </CardWrapperSignUp>
  );
};

export default SignUpForm1;
