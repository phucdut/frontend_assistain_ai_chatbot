"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { CustomizeRes, CustomizeResType } from "@/schemas/customize.schema";
import { Check, MoveRight, Undo2, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useTransition, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import CustomizeYourChatInterface from "./customize-your-chat-interface";
import PoweredByAllyAI from "./powered-by-ally-ai";
import CustomizeChatbotBehavior from "./customize-chatbot-behavior";
import ChatbotConfig from "./chatbot-config";
import "@/app/globals.css";

type CustomizeProps = {
  id: string;
};

const Customize: React.FC<CustomizeProps> = ({ id }) => {
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState(false);
  const [step, setStep] = useState(1); // Thêm state để theo dõi bước hiện tại

  const handleNextStep = () => {
    // Cập nhật bước hiện tại khi nhấn nút "Next"
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    // Cập nhật bước hiện tại khi nhấn nút "Previous"
    setStep(step - 1);
  };
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CustomizeResType>();

  const form = useForm<CustomizeResType>({
    resolver: zodResolver(CustomizeRes),
    defaultValues: {
      prompts: "👋 Hi, how can I help you?",
      initPrompts:
        "Give me a summary of this knowledge base\nWrite a pem about this knowledge base\nTell me five key points about this knowledge base",
    },
  });

  async function onSubmit(values: CustomizeResType) {
    console.log(values);
  }
  // bg-custom-gray-4
  return (
    <div className="bg-custom-gray-4 h-full w-full rounded-md overflow-y-auto custom-scroll">
      {/* <div className="flex justify-center bg-white">Customize</div> */}
      {/* <p>Chatbot ID: {id}</p> */}
      {/* Các phần tử tương ứng với bước 1 */}
      {step === 1 && <CustomizeChatbotBehavior />}
      {/* Các phần tử tương ứng với bước 2 */}
      {step === 2 && <CustomizeYourChatInterface />}
    </div>
  );
};

export default Customize;
