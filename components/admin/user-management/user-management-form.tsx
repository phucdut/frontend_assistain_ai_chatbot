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

import { cn, handleErrorApi } from "@/lib/utils";
import { AccountResListType } from "@/schemas/account.schema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import accountApiRequest from "@/app/apiRequests/account";
import Link from "next/link";
import ShowQuantityChatbots from "./show-quantity-chatbots";
import ShowTotalMessagesChatbot from "./show-total-messages-user";
import ShowTotalTokensChatbot from "./show-total-tokens-user";
import BanUser from "./ban-user";

const UserManagementForm = () => {
  const [user, setUser] = useState<AccountResListType | null>(null);
  const [isBanting, setIsBanting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleBan = async () => {
    try {
      setIsBanting(true);
    } catch (error) {
      handleErrorApi({
        error,
      });
    }
  };
  const handleUnBan = async () => {
    try {
      setIsBanting(false);
    } catch (error) {
      handleErrorApi({
        error,
      });
    }
  };

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.accountListClient();
        setUser(result.payload);
        // console.log(result.payload);
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, []);

  return (
    <div>
      <div className="w-full h-full bg-gray-50 shadow rounded-3xl">
        <div className="w-full h-[70px] bg-white flex justify-start items-center rounded-t-3xl">
          <div className="text-[24px] font-semibold leading-[141.667%] max-w-full px-7">
            <h1>User Management</h1>
          </div>
        </div>
        <Separator className=" bg-slate-300 " />
        <div className="w-full h-[660px] justify-center overflow-y-auto custom-scroll rounded-b-3xl">
          <div className="pt-0 w-full h-[660px] lg:pb-7 overflow-auto custom-scroll ">
            <TableDashboard className="border border-slate-300">
              <TableCaption></TableCaption>
              <TableHeader className="bg-gray-50 ">
                <TableRow>
                  <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight">
                    Name User
                  </TableHead>
                  <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight">
                    Email
                  </TableHead>
                  <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight ">
                    Quantity chatbots
                  </TableHead>
                  <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight ">
                    Total messages
                  </TableHead>
                  <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight ">
                    Total tokens
                  </TableHead>
                  {/* <TableHead className="text-center text-zinc-900 text-[13px] font-semibold leading-tight">
                    Date create
                  </TableHead> */}
                  <TableHead className="text-center text-zinc-900 text-[13px] font-semibold leading-tight">
                    Date update
                  </TableHead>
                  <TableHead className="text-center text-zinc-900 text-[13px] font-semibold leading-tight">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {user?.results.map(
                  (
                    userItem: AccountResListType["results"][0],
                    index: number
                  ) => (
                    <TableRow key={index}>
                      <TableCell className="">
                        <Link
                          className="flex justify-start items-center gap-3 font-semibold uppercase"
                          href={`user-management/chatbots-list?user_id=${userItem?.id}&user_name=${userItem?.display_name}`}
                        >
                          <input
                            type="checkbox"
                            className="w-6 h-6 left-0 top-0 bg-white rounded-md border border-slate-300"
                            checked={userItem?.is_active || false}
                          ></input>
                          <div className="text-zinc-900 text-[13px]  leading-tight">
                            {userItem?.display_name}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium">
                        {userItem &&
                          //   <ShowChatbot
                          //     chatbot_id={conversationItem?.chatbot_id}
                          //   />
                          userItem.email}
                      </TableCell>
                      <TableCell className="font-normal text-center">
                        {userItem && (
                          <ShowQuantityChatbots user_id={userItem?.id} />
                        )}
                      </TableCell>
                      <TableCell className="font-normal text-center">
                        {userItem && (
                          <ShowTotalMessagesChatbot user_id={userItem?.id} />
                        )}
                      </TableCell>
                      <TableCell className="font-normal text-center">
                        {userItem && (
                          <ShowTotalTokensChatbot user_id={userItem?.id} />
                        )}
                      </TableCell>
                      {/* <TableCell className="text-center">
                        {userItem?.created_at?.toLocaleString()}
                      </TableCell> */}
                      <TableCell className="text-center font-normal">
                        {userItem?.updated_at?.toLocaleString()}
                      </TableCell>
                      <TableCell className="flex justify-center font-normal">
                        {userItem && (
                          <BanUser user_id={userItem?.id} />
                        )}
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

export default UserManagementForm;
