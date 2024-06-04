"use client";

import React, { useState } from "react";
import "@/app/globals.css";
import { Separator } from "@/components/ui/separator";
import DashboardTableForm from "./dashboard-table";

import ValidJsonDashboardFrom from "./rating-dashboard-from";
import LatencySecondDashboardForm from "./latency-second-dashboard-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import VisitorForm from "./visitors-dashboard-form";
import InboxesDashboardForm from "./inboxes-dashboard-form";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

const DashBoardForm = () => {
  const [selectedOption, setSelectedOption] = useState("Daily");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [newState, setNewState] = useState<{ type: string; date: string }>({
    type: "day",
    date: new Date().toISOString().split("T")[0],
  });
  // console.log(newState);

  const handleClick = (option: "Daily" | "Monthly" | "Yearly") => {
    setSelectedOption(option);
    switch (option) {
      case "Daily":
        setNewState({
          type: "day",
          date: new Date().toISOString().split("T")[0],
        });
        break;
      case "Monthly":
        setNewState({
          type: "month",
          date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
            .toString()
            .padStart(2, "0")}`,
        });
        break;
      case "Yearly":
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div>
      <div className="w-full h-full bg-gray-50 shadow rounded-3xl ">
        <div className="w-full h-[70px] bg-white flex justify-start items-center rounded-t-3xl relative">
          <div className=" text-[24px] font-semibold leading-[141.667%] max-w-full px-7 ">
            <h1>Dashboard</h1>
          </div>
          <div className="absolute right-14">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                                "w-[170px] text-left font-normal",
                                !field.value && "text-muted-foreground",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" // Lớp để làm cho nút nổi bật khi được chọn
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span className="grow shrink basis-0 text-zinc-800 text-sm font-normal leading-tight">
                                  Pick a date
                                </span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg rounded-lg">
                          {" "}
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
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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
          <div className="w-[268px] h-11 bg-gray-100 rounded-xl absolute right-64 flex justify-center items-center">
            <div
              className={`w-20 h-[30px] px-4 py-[5px] ${
                selectedOption === "Daily" ? "bg-zinc-900" : ""
              } rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer`}
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
            <div
              className={`w-20 h-[30px] px-4 py-[5px] ${
                selectedOption === "Yearly" ? "bg-zinc-900" : ""
              } rounded-lg  justify-center items-center gap-2.5 inline-flex cursor-pointer`}
              onClick={() => handleClick("Yearly")}
            >
              <div
                className={`${
                  selectedOption === "Yearly" ? "text-white" : "text-zinc-900"
                } text-sm font-normal leading-tight`}
              >
                Yearly
              </div>
            </div>
          </div>
        </div>
        <Separator className=" bg-slate-300 " />
        <div className="w-full h-[660px] justify-center overflow-y-auto custom-scroll">
          <div className="flex justify-center items-center gap gap-12 pt-8">
            <div className="w-[502px] h-[222px] bg-white rounded-xl border border-slate-300 overflow-y-auto custom-scroll">
              <VisitorForm formData={newState} />
            </div>
            <div className="w-[502px] h-[222px] bg-white rounded-xl border border-slate-300 overflow-y-auto custom-scroll">
              <InboxesDashboardForm formData={newState} />
            </div>
          </div>
          <div className="flex justify-center items-center gap gap-12 py-8">
            <div className="w-[502px] h-[222px] bg-white rounded-xl border border-slate-300 overflow-y-auto custom-scroll">
              <LatencySecondDashboardForm formData={newState} />
            </div>
            <div className="w-[502px] h-[222px] bg-white rounded-xl border border-slate-300 overflow-y-auto custom-scroll">
              <ValidJsonDashboardFrom formData={newState} />
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <DashboardTableForm formData={newState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardForm;
