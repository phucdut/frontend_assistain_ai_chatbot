"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  DrawerProfile,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer-profile";
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
import { Button } from "../ui/button";
import Link from "next/link";
import ProfileForm from "../admin/profile/profile-form";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { UpgradeMembershipButton } from "./upgrade-membership-button";
import accountApiRequest from "@/app/apiRequests/account";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AccountResType,
  AccountSchema,
  UpdateAccountBodyType,
  UserSubscriptionResType,
} from "@/schemas/account.schema";
import { LogOut } from "lucide-react";
import "@/app/globals.css";

import authApiRequest from "@/app/apiRequests/auth";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { CreateChatbotBodyType } from "@/schemas/create-chatbot.schema";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { isMinimal, handleClose } = useSidebarStore();
  const [account, setAccount] = useState<AccountResType | null>(null);
  const [userSubscription, setUserSubscription] =
    useState<UserSubscriptionResType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const [newState, setNewState] = useState({
    type: "day",
    date: new Date()
      .toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-"),
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateAccountBodyType>();

  const form = useForm<UpdateAccountBodyType>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      email: "",
      display_name: "",
    },
  });

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      toast({
        title: "Success",
        description: "Sign out successfully!",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccount(result.payload);
        form.setValue("email", result.payload.email || "");
        form.setValue("display_name", result.payload.display_name || "");
        if (account?.is_active === false) {
          toast({
            title: "Error",
            description: "The user has been banned from using the service!",
            variant: "destructive",
          });
          router.push("/");
        }
      } catch (error) {
        handleErrorApi({ error });
        router.push("/");
        router.refresh();
      }
    };
    fetchAccount();
  }, [form, router, account?.is_active, toast]);

  useEffect(() => {
    const fetchUserSubscription = async () => {
      try {
        if (account?.id) {
          const result = await accountApiRequest.userSubscriptionIdClient(
            account.id
          );
          setUserSubscription(result.payload);
        }
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchUserSubscription();
  }, [router, account?.id]);

  useEffect(() => {
    const checkAndResetPlanId = async () => {
      try {
        if (
          userSubscription?.expire_at &&
          new Date(userSubscription.expire_at) <= new Date()
        ) {
          const result = await accountApiRequest.resetPlanId(account?.id || "");
          // setAccount(result.payload);
        }
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    checkAndResetPlanId();
  }, [account?.id, userSubscription?.expire_at]);

  async function onSubmit(values: UpdateAccountBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      if (account?.id) {
        const result = await accountApiRequest.updateAccount(
          values,
          account.id
        );
        toast({
          title: "Success",
          description: "Update successfully!",
        });
      }
      setIsEditing(false);
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <DrawerProfile>
      <div
        onClick={handleClose}
        className="flex items-center justify-between px-1"
      >
        <div className={cn(!isMinimal && "px-1")}>
          {isMinimal && (
            <DrawerTrigger asChild>
              <Image
                src="/Ellipse 1.svg"
                alt="x"
                width={24}
                height={22}
                className="w-9 h-9 rounded-full my-3"
              ></Image>
            </DrawerTrigger>
          )}
          {!isMinimal && (
            <div className="flex items-center justify-between pt-5 ">
              <div className="flex items-center justify-between gap-5">
                <DrawerTrigger asChild>
                  {account?.avatar_url && (
                    <Image
                      // src="/Ellipse 1.svg"
                      src={account.avatar_url}
                      alt="x"
                      width={24}
                      height={22}
                      className="w-9 h-9 rounded-full transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                    ></Image>
                  )}
                </DrawerTrigger>
                <div className="text-white text-sm font-normal leading-relaxed uppercase w-[180px] overflow-hidden whitespace-nowrap text-ellipsis">
                  {account?.display_name}
                </div>
              </div>
              <Switch />
            </div>
          )}
        </div>
      </div>
      <DrawerContent>
        <div className="max-w-lg overflow-y-hidden">
          <DrawerHeader>
            <div className="relative text-[20px] leading-[30px] w-[440px] h-[170px] mb-20">
              <Image
                className="w-[440px] h-[170px] rounded-t-xl"
                src="/Rectangle 3764.svg"
                alt="x"
                width={440}
                height={170}
              />
              <DrawerClose asChild>
                <Image
                  src="/x 1.svg"
                  alt="x"
                  width={24}
                  height={24}
                  className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 absolute inset-y-6 right-5"
                ></Image>
              </DrawerClose>
              <div>
                <Image
                  src="/logo/Horizontal 2.svg"
                  alt="x"
                  width={26}
                  height={28}
                  className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 absolute inset-x-[210px]  inset-y-1/3 "
                ></Image>
                <h1 className="text-white text-[21px] transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 absolute inset-x-[190px] inset-y-[80px] ">
                  ALLYBY
                </h1>
              </div>
              <div className="w-[110px] h-[110px] rounded-full bg-custom-gray-6 absolute inset-y-32 inset-x-5">
                <div className="w-[110px] h-[110px] rounded-full bg-custom-gray-6 relative pt-5">
                  {account?.avatar_url && (
                    <Image
                      // src="/Ellipse 1.svg"
                      src={account.avatar_url}
                      alt="x"
                      width={100}
                      height={100}
                      className="w-[100px] h-[100px] rounded-full absolute inset-y-[5px] inset-x-[5px]"
                    ></Image>
                  )}
                </div>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 space-x-6"
                >
                  <div className="pl-36 pt-3 flex gap-1 relative">
                    <div>
                      <div className="flex items-center justify-start gap-1 ">
                        {isEditing ? (
                          <FormField
                            control={form.control}
                            name="display_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Enter"
                                    {...field}
                                    disabled={isPending}
                                    className="text-zinc-900 text-sm font-semibold leading-[30px] w-40 h-8"
                                  />
                                </FormControl>
                                <FormDescription>
                                  {/* This is your public display email. */}
                                </FormDescription>
                                <FormMessage className="text-red-500 text-[14px] font-normal leading-[26px]" />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <div className="text-zinc-900 text-xl font-semibold leading-[30px] ">
                            {account?.display_name}
                            {/* David */}
                          </div>
                        )}
                        <div>
                          {isEditing ? (
                            <Button type="submit" variant="edit">
                              <Image
                                src="/icons/Fill - Save.svg"
                                alt="x"
                                width={15}
                                height={15}
                                className=""
                              ></Image>
                            </Button>
                          ) : (
                            <Button
                              onClick={handleEdit}
                              type="button"
                              variant="edit"
                            >
                              <Image
                                src="/Fill - Edit - Pen.svg"
                                alt="x"
                                width={15}
                                height={15}
                                className=""
                              ></Image>
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="text-zinc-900 text-sm font-normal leading-tight w-40 overflow-hidden whitespace-nowrap text-ellipsis">
                        {account?.email}
                        {/* davidman@gmail.com */}
                      </div>
                    </div>
                    <Skeleton className="bg-primary text-primary-foreground hover:bg-primary/90 flex justify-center items-center absolute right-5 ">
                      <Button onClick={handleLogout} type="button" className="">
                        <LogOut />
                      </Button>
                    </Skeleton>
                  </div>
                </form>
              </Form>
            </div>
          </DrawerHeader>
          <div className="px-5">
            <Separator className=" bg-slate-300" />
          </div>
          {account && <ProfileForm id={account?.id} />}
          {/* <ProfileForm id={"3e352cd0-17f7-4754-b721-39ac08cff7ce"} /> */}
          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </DrawerProfile>
  );
};

export default Profile;
