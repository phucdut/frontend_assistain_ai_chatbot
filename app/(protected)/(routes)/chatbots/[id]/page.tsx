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
import { Separator } from "@/components/ui/separator";

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
      <div className="text-[24px] font-semibold leading-[141.667%] max-w-full pt-7 pl-7 ">
        <h1>{chatbot && chatbot.chatbot_name}</h1>
      </div>
      <Tabs defaultValue="chatGPT" className="w-full">
        <TabsList className="grid w-[600px] grid-cols-3">
          <TabsTrigger value="chatGPT" className="py-3">
            Chat
            {/* <AllVersionChatGPTs /> */}
          </TabsTrigger>
          <TabsTrigger value="knowledgeBase" className="py-3">
            Knowledge base
          </TabsTrigger>
          {/* <TabsTrigger value="customize" className="py-3">Customize</TabsTrigger> */}
        </TabsList>
        <div className="pt-[13px]">
          <Separator className=" bg-slate-300 " />
        </div>
        <TabsContent value="chatGPT">
          <div className="h-full w-full">
            {/* <Chat params={{ id: chatbot ? chatbot.id : "" }} /> */}
            {chatbot && (
              <Chat
                id={chatbot.id}
                conversation_id="99bc0984-f8de-407a990c-41651230e539"
              />
            )}
          </div>
        </TabsContent>
        <TabsContent value="knowledgeBase">
          <div className="h-full w-full">
            {chatbot && <KnowledgeBase id={chatbot.id} />}
          </div>
        </TabsContent>
        {/* <TabsContent value="customize">
          <div className="h-full w-full">
            {chatbot && <Customize id={chatbot.id} />}
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
