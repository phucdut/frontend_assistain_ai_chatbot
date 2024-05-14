import chatbotApiRequest from "@/app/apiRequests/chatbot";
import Customize from "@/components/admin/chatbots/info-chatbot/customize/customize";
import AllVersionChatGPTs from "@/components/admin/chatbots/info-chatbot/get-all-select-versions-chatGPT";
import KnowledgeBase from "@/components/admin/chatbots/info-chatbot/knowledge-base/knowledge-base";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomizeRes } from "@/schemas/customize.schema";
import { Prompt } from "next/font/google";
import { cookies } from "next/headers";
import { cache } from "react";
import Chat from "../../../../../components/admin/chatbots/info-chatbot/chat/chat";

const getDetail = cache(chatbotApiRequest.getDetail);
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ChatbotPage({ params, searchParams }: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  let chatbot = null;
  try {
    const { payload } = await getDetail(sessionToken?.value ?? "", params.id);
    chatbot = payload;
  } catch (error) {}

  return (
    <div>
      {!chatbot && <div>Không tìm thấy chat bot</div>}
      <div className="text-[24px] font-semibold leading-[141.667%] max-w-[151px]">
        <h1>{chatbot && chatbot.chatbot_name}</h1>
      </div>
      <Tabs defaultValue="chatGPT" className="w-full">
        <TabsList className="grid w-full grid-cols-5 pl-10 ">
          <TabsTrigger value="chatGPT" className="">
            <AllVersionChatGPTs />
          </TabsTrigger>
          <TabsTrigger value="knowledgeBase">Knowledge base</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
        </TabsList>
        <TabsContent value="chatGPT">
          <div className="h-full w-full">
            {/* <Chat params={{ id: chatbot ? chatbot.id : "" }} /> */}
            {chatbot && <Chat id={chatbot.id} />}
          </div>
        </TabsContent>
        <TabsContent value="knowledgeBase">
          <div className="h-full w-full">
            {chatbot && <KnowledgeBase id={chatbot.id} />}
          </div>
        </TabsContent>
        <TabsContent value="customize">
          <div className="h-full w-full">
            {chatbot && <Customize id={chatbot.id} />}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
