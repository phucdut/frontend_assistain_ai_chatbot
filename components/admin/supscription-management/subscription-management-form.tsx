"use client";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState, useTransition } from "react";
import {
  TableDashboard,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-dashboard";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { cn, handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import accountApiRequest from "@/app/apiRequests/account";
import Link from "next/link";
import Image from "next/image";
import { ComponentEditSubPlan } from "./edit-subscription-plan/component-edit-subscription-plan";
import { Button } from "@/components/ui/button";
import subscriptionPlanApiRequest from "@/app/apiRequests/subscription-plan";
import { SubscriptionPlanResListType } from "@/schemas/subscription-plan.schema";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ComponentCreateSubPlan } from "./create-subscription-plan/component-create-subscription-plan";

const SupscriptionManagementForm = () => {
  const [subscriptionPlan, setSubscriptionPlan] =
    useState<SubscriptionPlanResListType | null>(null);
  const [editSubPlanId, setEditSubPlanId] = useState<string | null>(null);
  const MySwal = withReactContent(Swal);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result =
          await subscriptionPlanApiRequest.listSubscriptionPlanClient();
        // Sắp xếp danh sách gói đăng kí bằng giá tiền
        const sortedListSubscriptionPlanClient = result.payload.results.sort(
          (a, b) => {
            return a.plan_price - b.plan_price;
          }
        );

        setSubscriptionPlan(result.payload);
        // console.log(result.payload);
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, []);

  const handleDelete = async (id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this subscription plan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Gọi API logout
          await subscriptionPlanApiRequest.deleteSubscriptionPlan(id);
          const result =
            await subscriptionPlanApiRequest.listSubscriptionPlanClient();
          toast({
            title: "Success",
            description: "Delete successfully!",
          });
          router.refresh();
        } catch (error) {
          handleErrorApi({
            error,
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="w-full h-full bg:gray-50 shadow rounded-3xl">
        <div className="w-full h-[70px] bg:white flex justify-start items-center rounded-t-3xl">
          <div className="text-[24px] font-semibold leading-[141.667%] max-w-full px-7 flex justify-start items-center gap-10">
            <h1>Subscription Plan</h1>
            <Drawer>
              <div>
                <DrawerTrigger asChild>
                  <Image
                    width={25}
                    height={25}
                    src="/icons/Fill - Add - Plus (1).svg"
                    alt="a"
                    className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                  />
                </DrawerTrigger>
                <DrawerContent className="lg:overflow-y-hidden">
                  <div className="max-w-lg">
                    <DrawerHeader>
                      <div className="flex items-center justify-between text-[20px] leading-[30px]  gap-[10px]">
                        <span className="  font-semibold text-right">
                          Create New Subscription Plan
                        </span>
                        <DrawerClose asChild>
                          <Image
                            src="/x 1.svg"
                            alt="x"
                            width={24}
                            height={24}
                            className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                          ></Image>
                        </DrawerClose>
                      </div>
                    </DrawerHeader>
                    <div>
                      <Separator className="opacity-50 border border-slate-300" />
                    </div>
                    <ComponentCreateSubPlan />
                    <DrawerFooter>
                      <DrawerClose asChild>
                        {/* <Button variant="outline">Cancel</Button> */}
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </div>
            </Drawer>
          </div>
        </div>
        <Separator className=" bg-slate-300 " />
        <div className="w-full h-[660px] justify-center overflow-y-auto custom-scroll rounded-b-3xl">
          <div className="pt-0 w-full h-[660px] lg:pb-7 overflow-auto custom-scroll ">
            <TableDashboard className="">
              <TableCaption></TableCaption>
              <TableHeader className="bg:gray-50 ">
                <TableRow>
                  <TableHead className=" text-[13px] font-semibold leading-tight">
                    Plan title
                  </TableHead>
                  <TableHead className=" text-[13px] font-semibold leading-tight">
                    Number of chatbots
                  </TableHead>
                  <TableHead className=" text-[13px] font-semibold leading-tight">
                    Message credits
                  </TableHead>
                  <TableHead className=" text-[13px] font-semibold leading-tight">
                    Max character per chatbot
                  </TableHead>
                  <TableHead className=" text-[13px] font-semibold leading-tight">
                    Plan price
                  </TableHead>
                  <TableHead className="text-center  text-[13px] font-semibold leading-tight">
                    Available model
                  </TableHead>
                  <TableHead className="text-center  text-[13px] font-semibold leading-tight">
                    Date update
                  </TableHead>
                  <TableHead className="text-center  text-[13px] font-semibold leading-tight">
                    Edit
                  </TableHead>
                  <TableHead className="text-center  text-[13px] font-semibold leading-tight">
                    Delete
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg:white">
                {subscriptionPlan?.results.map(
                  (
                    subscriptionPlanItem: SubscriptionPlanResListType["results"][0],
                    index: number
                  ) => (
                    <TableRow key={index}>
                      <TableCell className="flex justify-start items-center gap-3">
                        <input
                          type="checkbox"
                          className="w-6 h-6 left-0 top-0 bg:white rounded-md border border-slate-300"
                          checked={subscriptionPlanItem?.live_agent_takeover}
                        ></input>
                        <div className=" text-[13px] font-semibold leading-tight uppercase">
                          {subscriptionPlanItem?.plan_title}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {subscriptionPlanItem &&
                          subscriptionPlanItem?.number_of_chatbots}
                      </TableCell>
                      <TableCell className="font-normal ">
                        {subscriptionPlanItem?.message_credits}
                      </TableCell>
                      <TableCell className="">
                        {subscriptionPlanItem?.max_character_per_chatbot}
                      </TableCell>
                      <TableCell className=" font-normal">
                        {subscriptionPlanItem?.plan_price}
                      </TableCell>
                      <TableCell className=" font-normal">
                        {subscriptionPlanItem?.available_model}
                      </TableCell>
                      <TableCell className="font-normal">
                        {subscriptionPlanItem?.updated_at?.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center flex justify-center pt-7">
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Image
                              width={16}
                              height={16}
                              src="/icons/Fill - Edit - Pen.svg"
                              className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                              alt="a"
                              onClick={() =>
                                setEditSubPlanId(subscriptionPlanItem.id)
                              }
                            />
                          </DrawerTrigger>
                          <DrawerContent className="lg:overflow-y-hidden ">
                            <div className="max-w-lg">
                              <DrawerHeader>
                                <div className="flex items-center justify-between text-[20px] leading-[30px] gap-[10px]">
                                  <div className=" text-xl font-semibold leading-[30px]">
                                    Edit your Subscription Plan
                                  </div>
                                  <DrawerClose asChild>
                                    <Image
                                      src="/x 1.svg"
                                      alt="x"
                                      width={24}
                                      height={24}
                                      className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                                    />
                                  </DrawerClose>
                                </div>
                              </DrawerHeader>
                              <div>
                                <Separator className="opacity-50 border border-slate-300" />
                              </div>
                              {editSubPlanId && (
                                <ComponentEditSubPlan id={editSubPlanId} />
                              )}
                              <DrawerFooter>
                                <DrawerClose asChild>
                                  {/* <Button variant="outline">Cancel</Button> */}
                                </DrawerClose>
                              </DrawerFooter>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      </TableCell>
                      <TableCell className="font-normal">
                        <Button
                          variant="edit"
                          onClick={() => handleDelete(subscriptionPlanItem.id)}
                        >
                          <Image
                            src="/remove_icon 12.svg"
                            alt="x"
                            width={43}
                            height={43}
                            className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
              <TableFooter>
                <TableRow></TableRow>
              </TableFooter>
            </TableDashboard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupscriptionManagementForm;
