import React from "react";
import AllVersionChatGPTs from "./get-all-select-versions-chatGPT";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cache } from "react";
import Chat from "./chat/chat";
import KnowledgeBase from "./knowledge-base/knowledge-base";
import Customize from "./customize/customize";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import { cookies } from "next/headers";
import { Metadata, ResolvingMetadata } from "next";
import envConfig from "@/app/config";

export async function InfoChatbotForm(params: { chatbotId: string }) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const isAuthenticated = Boolean(sessionToken);

  const sessionTokenValue = sessionToken?.value ?? "";
  let chatbot = null;
  try {
    const { payload } = await chatbotApiRequest.getDetail(
      sessionTokenValue,
      params.chatbotId
    );
    chatbot = payload;
  } catch (error: any) {
    console.error(error);
  }
  return (
    <div>
      <div className="text-[24px] font-semibold leading-[141.667%] max-w-[151px]">
        <h1>Elon Musk AI</h1>
      </div>
      <Tabs defaultValue="chatGPT" className="w-full">
        <TabsList className="grid w-full grid-cols-5 pl-10 ">
          <TabsTrigger value="chatGPT" className="">
            <AllVersionChatGPTs />
          </TabsTrigger>
          <TabsTrigger value="knowledgeBase">Knowledge base</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="chatGPT">
          <div className="h-full w-full">
            <Chat />
          </div>
        </TabsContent>
        <TabsContent value="knowledgeBase">
          <div className="h-full w-full">
            <KnowledgeBase />
          </div>
        </TabsContent>
        <TabsContent value="customize">
          <div className="h-full w-full">
            <Customize />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
