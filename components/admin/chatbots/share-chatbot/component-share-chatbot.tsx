"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ChatbotResType } from "@/schemas/chatbot.schema";
import { handleErrorApi } from "@/lib/utils";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import envConfig from "@/app/config";

type ComponentShareChatbotProps = {
  id: string;
};

const ComponentShareChatbot: React.FC<ComponentShareChatbotProps> = ({
  id,
}) => {
  const [selectedOption, setSelectedOption] = useState("directLink");
  const [copied, setCopied] = useState(false);
  const embedCodeRef = useRef<HTMLDivElement>(null);
  const [chatbot, setChatbot] = useState<ChatbotResType | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (id) {
          const result = await chatbotApiRequest.chatbotIdClient(id);

          setChatbot(result.payload);
          console.log(result);
        }
      } catch (error) {
        handleErrorApi({
          error,
        });
      }
    };
    fetchRequest();
  }, [id]);

  const handleCopy = () => {
    const embedCodeElement = embedCodeRef.current;
    if (embedCodeElement !== null) {
      const embedCode =
        embedCodeElement.innerText || embedCodeElement.textContent || "";
      navigator.clipboard
        .writeText(embedCode)
        .then(() => {
          setCopied(true);
          toast({
            title: "Success",
            description: "Content was copied successfully!",
            duration: 5000,
          });
        })
        .catch((error) => {
          // console.error("Error when copying to clipboard:", error);
          toast({
            title: "Error",
            description: "An error occurred while copying!",
            variant: "destructive",
            duration: 5000,
          });
        });
    }
  };

  const renderContent = () => {
    switch (selectedOption) {
      // case "bubble":
      //   return (
      //     <div>
      //       <div className="text-stone-500 text-sm font-normal leading-normal pt-6 pb-2">
      //         To display the chatbot as a convenient popup bubble, insert this
      //         code into the <code>&lt;header&gt;</code> section of your website:
      //       </div>
      //       <div className="w-full h-full px-[15px] py-3 bg-gray-100 rounded-md justify-between items-start inline-flex relative">
      //         <div
      //           ref={embedCodeRef}
      //           className="grow shrink basis-0 text-zinc-800 text-sm font-normal leading-tight text-left w-[100px] pr-5"
      //         >
      //           &lt;script&gt;window.allyByEmbed = &quot;
      //           {envConfig.NEXT_PUBLIC_EMBED}/embed/?chatbot_id={id}
      //           &amp;modeltype={chatbot?.model}
      //           &amp;mode=false&amp;bubble=true&amp;bubbleopen=false&quot;&lt;/script&gt;&lt;script
      //           src=&quot;{envConfig.NEXT_PUBLIC_EMBED}
      //           /bubble-embed.js&quot;&gt;&lt;/script&gt;
      //         </div>
      //         <Image
      //           src="/icons/Fill - Copy.svg"
      //           alt="Twitter"
      //           width={16}
      //           height={16}
      //           onClick={handleCopy}
      //           className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 absolute inset-y-3 right-4"
      //         />
      //       </div>
      //     </div>
      //   );
      case "iFrame":
        return (
          <div>
            <div className="text-stone-500 text-sm font-normal leading-normal pt-6 pb-2">
              To embed the chatbot using an iframe use the following code:
            </div>
            <div className="w-full h-full px-[15px] py-3 bg:gray-100 rounded-md justify-between items-start inline-flex relative">
              <div
                ref={embedCodeRef}
                className="grow shrink basis-0 text-zinc-800 text-sm font-normal leading-tight text-left "
              >
                &lt;iframe &nbsp;&nbsp;src=&quot;
                {`${envConfig.NEXT_PUBLIC_EMBED}`}/embed/?chatbot_id=
                {id}
                &amp;modeltype={chatbot?.model}
                &amp;mode=false&amp;logo=ZmFsc2U=&quot;
                &nbsp;&nbsp;allow=&quot;clipboard-write; *;microphone *&quot;
                &nbsp;&nbsp;width=&quot;100%&quot;
                &nbsp;&nbsp;height=&quot;950&quot;
                &nbsp;&nbsp;frameBorder=&quot;0&quot; &gt;&lt;/iframe&gt;
              </div>
              <Image
                src="/icons/Fill - Copy.svg"
                alt="Twitter"
                width={16}
                height={16}
                onClick={handleCopy}
                className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 absolute inset-y-3 right-4"
              />
            </div>
          </div>
        );
      case "directLink":
        return (
          <div>
            <div className="text-stone-500 text-sm font-normal leading-normal pt-6 pb-2">
              To share a direct link to the chatbot use this url:
            </div>
            <div className="w-full h-h-full px-[15px] py-3 bg-gray-100 rounded-md justify-between items-start inline-flex relative">
              <div
                ref={embedCodeRef}
                className="grow shrink basis-0 text-zinc-800 text-sm font-normal leading-tight text-left  pr-5"
              >
                {envConfig.NEXT_PUBLIC_EMBED}/embed/?chatbot_id={id}
                &amp;modeltype={chatbot?.model}
                &amp;logo=ZmFsc2U=&amp;smode=false
              </div>
              <Image
                src="/icons/Fill - Copy.svg"
                alt="Twitter"
                width={16}
                height={16}
                onClick={handleCopy}
                className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125 absolute inset-y-3 right-4"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-5">
      <Separator className="opacity-50 border border-slate-300" />
      <div className=" text-sm font-medium leading-normal pt-5 pb-2">
        Share your chatbot via
      </div>
      <Select onValueChange={setSelectedOption}>
        <SelectTrigger className="w-full">
          {/* <SelectValue placeholder="Direct link" /> */}
          <SelectValue placeholder="directLink" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Deploy chatbot</SelectLabel>
            {/* <SelectItem value="bubble">Bubble</SelectItem> */}
            <SelectItem value="directLink">Direct link</SelectItem>
            <SelectItem value="iFrame">iFrame (Embed)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {renderContent()}
      <div className="flex justify-center items-center gap-9 pt-8 ">
        <Image
          src="/icons/Fill - Whatapp.svg"
          alt="WhatsApp"
          width={16}
          height={16}
          className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
        />
        <Image
          src="/icons/Fill - Linkedin.svg"
          alt="LinkedIn"
          width={16}
          height={16}
          className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
        />
        <Image
          src="/icons/Fill - Twitter.svg"
          alt="Twitter"
          width={16}
          height={16}
          className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
        />
        <Image
          src="/icons/Fill - Facebook.svg"
          alt="Facebook"
          width={16}
          height={16}
          className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
        />
        <Image
          src="/icons/Fill - Mail.svg"
          alt="Mail"
          width={16}
          height={16}
          className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
        />
      </div>
    </div>
  );
};

export default ComponentShareChatbot;
