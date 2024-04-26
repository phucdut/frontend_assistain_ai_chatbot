"use client";

import React from "react";
import AllVersionChatGPTs from "./get-all-select-versions-chatGPT";
import Headers from "./header";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chat from "./chat";
import KnowledgeBase from "./knowledge-base";
import Prompt from "./prompt";
import Customize from "./customize";
import Performance from "./performance";

const InfoChatbotForm = () => {
  return (
    <div>
      <div className="text-[24px] font-semibold leading-[141.667%] text-custom-gray max-w-[151px]">
        <h1>Elon Musk AI</h1>
      </div>
      <Tabs defaultValue="chatGPT" className="w-[700px] ">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="chatGPT" className="pr-28">
            <AllVersionChatGPTs />
          </TabsTrigger>
          <TabsTrigger value="knowledgeBase">Knowledge base</TabsTrigger>
          <TabsTrigger value="prompt">Prompt.</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="chatGPT">
          <div>
            <Chat />
          </div>
        </TabsContent>
        <TabsContent value="knowledgeBase">
          <div>
            <KnowledgeBase />
          </div>
        </TabsContent>
        <TabsContent value="prompt">
          <div>
            <Prompt />
          </div>
        </TabsContent>
        <TabsContent value="customize">
          <div>
            <Customize />
          </div>
        </TabsContent>
        <TabsContent value="performance">
          <div>
            <Performance />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InfoChatbotForm;
