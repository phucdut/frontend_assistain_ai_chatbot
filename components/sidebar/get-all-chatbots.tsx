"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSidebarStore } from "@/stores/sidebar-stores";
import { cn, handleErrorApi } from "@/lib/utils";
import { ChatbotResListType } from "@/schemas/chatbot.schema";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@/app/globals.css";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ComponentShareChatbot from "../admin/chatbots/share-chatbot/component-share-chatbot";
import { ComponentEditChatbot } from "../admin/chatbots/info-chatbot/edit-chatbot/component-edit-chatbot";
import { AccountResType } from "@/schemas/account.schema";
import accountApiRequest from "@/app/apiRequests/account";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const AllChatbots = () => {
  const { isMinimal, handleClose } = useSidebarStore();
  const MySwal = withReactContent(Swal);
  const [chatbot, setChatbot] = useState<ChatbotResListType | null>(null);
  const [selectedChatbotId, setSelectedChatbotId] = useState<string | null>(
    null
  );
  const [editChatbotId, setEditChatbotId] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountResType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccount(result.payload);
        // console.log(result);
      } catch (error) {
        handleErrorApi({
          error,
        });
        router.push("/");
        router.refresh(); // Chuyển hướng người dùng về trang landing
      }
    };
    fetchRequest();
  }, [router]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (account?.id) {
          const result = await chatbotApiRequest.chatbotClient(account?.id);
          setChatbot(result.payload);
          // console.log(result.payload);
        }
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, [account?.id]);

  const handleDelete = async (user_id: string, chatbot_id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary chatbot!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await chatbotApiRequest.deleteChatbot(user_id, chatbot_id);

          const result = await chatbotApiRequest.chatbotClient(user_id);
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
    <>
      <div
        className={cn(
          isMinimal && "px-3",
          "justify-between overflow-y-auto custom-scroll h-[180px] py-3" //chiều cao của khung chatbot
        )}
        onClick={handleClose}
      >
        {chatbot?.results.map(
          (chatbotItem: ChatbotResListType["results"][0], index: number) => (
            <div key={index}>
              <Link href={`/chatbots/${chatbotItem.id}`}>
                {isMinimal && (
                  <div>
                    <Image
                      width={21}
                      height={21}
                      src="/icons/Icon.svg"
                      alt="a"
                      className="py-1 transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 overflow-y-auto custom-scroll"
                    />
                  </div>
                )}
              </Link>
              {!isMinimal && (
                <div className="pt-0 overflow-y-auto custom-scroll">
                  <div className="mb-0">
                    <div className="flex items-center justify-between px-4 ">
                      <div className="flex items-center rounded-lg opacity-70 gap-2">
                        <Link href={`/chatbots/${chatbotItem.id}`}>
                          <Image
                            width={16}
                            height={16}
                            src="/icons/Icon.svg"
                            className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                            alt="a"
                          />
                        </Link>
                        <div className="flex items-center justify-between gap-5">
                          <span className="text-[#8E98A4] text-[14px] font-normal leading-[26px] uppercase pr-[58px] w-[144px] overflow-hidden whitespace-nowrap text-ellipsis">
                            <Link href={`/chatbots/${chatbotItem.id}`}>
                              <div className=" transition duration-500 ease-in-out hover:opacity-100 hover:scale-125">
                                {chatbotItem.chatbot_name}
                              </div>
                            </Link>
                          </span>
                          <Drawer>
                            <DrawerTrigger asChild>
                              <Image
                                width={16}
                                height={16}
                                src="/icons/Fill - Edit - Pen.svg"
                                className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                                alt="a"
                                onClick={() => setEditChatbotId(chatbotItem.id)}
                              />
                            </DrawerTrigger>
                            <DrawerContent className="lg:overflow-y-hidden rounded-lg">
                              <div className="max-w-lg">
                                <DrawerHeader>
                                  <div className="flex items-center justify-between text-[20px] leading-[30px] gap-[10px]">
                                    <div className="text-zinc-900 text-xl font-semibold leading-[30px]">
                                      Edit your chatbot
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
                                <Separator className="opacity-50 border border-slate-300" />
                                {editChatbotId && (
                                  <ComponentEditChatbot id={editChatbotId} />
                                )}
                                <DrawerFooter>
                                  <DrawerClose asChild>
                                    {/* <Button variant="outline">Cancel</Button> */}
                                  </DrawerClose>
                                </DrawerFooter>
                              </div>
                            </DrawerContent>
                          </Drawer>

                          <Drawer>
                            <DrawerTrigger asChild>
                              <Image
                                width={16}
                                height={16}
                                src="/icons/Fill - Share 6.svg"
                                alt="a"
                                className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                                onClick={() =>
                                  setSelectedChatbotId(chatbotItem.id)
                                }
                              />
                            </DrawerTrigger>
                            <DrawerContent>
                              <div className="max-w-lg h-[820px]">
                                <DrawerHeader>
                                  <div className="flex items-center justify-between text-[20px] leading-[30px] gap-[10px]">
                                    <div className="text-zinc-900 text-xl font-semibold leading-[30px]">
                                      Share your chatbot
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
                                {selectedChatbotId && (
                                  <ComponentShareChatbot
                                    id={selectedChatbotId}
                                  />
                                )}
                              </div>
                            </DrawerContent>
                          </Drawer>
                          <div>
                            <Image
                              src="/remove_icon 12.svg"
                              alt="x"
                              width={43}
                              height={43}
                              onClick={() => {
                                if (account?.id && chatbotItem?.id) {
                                  handleDelete(account.id, chatbotItem.id);
                                } else {
                                  console.error(
                                    "account.id or chatbotItem.id is undefined"
                                  );
                                }
                              }}
                              className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Render other chatbot information here */}
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default AllChatbots;
