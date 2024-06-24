"use client";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn, handleErrorApi } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import accountApiRequest from "@/app/apiRequests/account";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import { ChatbotResListType } from "@/schemas/chatbot.schema";
import DashboardTableAdminForm from "./dashboard-table-admin";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});


const ChatbotListOfUserForm = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const userName = searchParams.get("user_name");
  const [selectedOption, setSelectedOption] = useState("Hourly");
  const [newState, setNewState] = useState<{ type: string; date: string }>({
    type: "day",
    date: new Date().toISOString().split("T")[0],
  });
  const [chatbot, setChatbot] = useState<ChatbotResListType | null>(null);

  const handleClick = (option: "Hourly" | "Daily" | "Monthly") => {
    setSelectedOption(option);
    switch (option) {
      case "Hourly":
        setNewState({
          type: "day",
          date: new Date().toISOString().split("T")[0],
        });
        break;
      case "Daily":
        setNewState({
          type: "month",
          date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
            .toString()
            .padStart(2, "0")}`,
        });
        break;
      case "Monthly":
        setNewState({ type: "year", date: `${new Date().getFullYear()}` });
        break;
      default:
        setNewState({
          type: "day",
          date: new Date().toISOString().split("T")[0],
        });
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (userId) {
          const result = await chatbotApiRequest.chatbotClient(userId);
          // Sắp xếp danh sách cuộc trò chuyện theo thời gian cập nhật mới nhất
          const sortedChatbots = result.payload.results.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );
          setChatbot(result.payload);

          // console.log(result.payload);
        }
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, [userId]);

  return (
    <div>
      <div className="w-full h-full bg:gray-50 shadow rounded-3xl">
        <div className="w-full h-[70px] bg:white flex justify-start items-center rounded-t-3xl relative">
          <div className="text-[24px] font-semibold leading-[141.667%] max-w-full px-7">
            <h1>Managing Chatbots with User</h1>
          </div>
          <h1 className="absolute right-10 text-[20px] font-semibold leading-[141.667%] text-sky-600 uppercase w-[244px] overflow-hidden whitespace-nowrap text-ellipsis flex justify-end">
            {userName}
          </h1>
          <div className="absolute right-64">
            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      {/* <FormLabel>Date of birth</FormLabel> */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[170px] text-left font-normal bg:white",
                                !field.value && "text-muted-foreground",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" // Lớp để làm cho nút nổi bật khi được chọn
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span className="grow shrink basis-0 text-sm font-normal leading-tight">
                                  Pick a date
                                </span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg:white border border-gray-200 shadow-lg rounded-lg">
                          {/* Thay đổi màu sắc và kiểu dáng của nội dung Popover */}
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              if (date) {
                                // Cập nhật newState thành 'day' và ngày được chọn
                                setNewState({
                                  type: "day",
                                  date: new Date(
                                    date.getTime() -
                                      date.getTimezoneOffset() * 60000
                                  )
                                    .toISOString()
                                    .split("T")[0],
                                });
                                // Cập nhật field.value (giá trị của trường ngày tháng) khi người dùng chọn một ngày
                                field.onChange(date);
                              }
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {/* <FormDescription>
                        Your date of birth is used to calculate your age.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <Button type="submit">Submit</Button> */}
              </form>
            </Form>
          </div>
          <div className="w-[268px] h-11 bg-gray-100 rounded-xl absolute left-[450px] flex justify-center items-center">
            <div
              className={`w-20 h-[30px] px-4 py-[5px] ${
                selectedOption === "Hourly" ? "bg-zinc-900" : ""
              } rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer`}
              onClick={() => handleClick("Hourly")}
            >
              <div
                className={`${
                  selectedOption === "Hourly" ? "text-white" : "text-zinc-900"
                } text-sm font-normal leading-tight`}
              >
                Hourly
              </div>
            </div>
            <div
              className={`w-20 h-[30px] px-4 py-[5px] ${
                selectedOption === "Daily" ? "bg-zinc-900" : ""
              } rounded-lg  justify-center items-center gap-2.5 inline-flex cursor-pointer`}
              onClick={() => handleClick("Daily")}
            >
              <div
                className={`${
                  selectedOption === "Daily" ? "text-white" : "text-zinc-900"
                } text-sm font-normal leading-tight`}
              >
                Daily
              </div>
            </div>
            <div
              className={`w-20 h-[30px] px-4 py-[5px] ${
                selectedOption === "Monthly" ? "bg-zinc-900" : ""
              } rounded-lg  justify-center items-center gap-2.5 inline-flex cursor-pointer`}
              onClick={() => handleClick("Monthly")}
            >
              <div
                className={`${
                  selectedOption === "Monthly" ? "text-white" : "text-zinc-900"
                } text-sm font-normal leading-tight`}
              >
                Monthly
              </div>
            </div>
          </div>
        </div>
        <Separator className=" bg-slate-300 " />
        <div className="w-full h-[660px] justify-center overflow-y-auto custom-scroll rounded-b-3xl">
          <div className=" flex justify-center items-center">
            <DashboardTableAdminForm
              formData={newState}
              user_id={userId || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotListOfUserForm;
