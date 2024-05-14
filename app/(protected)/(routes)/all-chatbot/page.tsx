import { cookies } from "next/headers";
import type { Metadata } from "next";
import envConfig from "@/app/config";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import GetAllChatbot from "@/components/all-chatbot";

export const metadata: Metadata = {
  title: "form admin",
};

export default async function AdminPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  // const result = await chatbotApiRequest.chatbot(sessionToken?.value ?? '')
  return (
    <div>
      <h1 className=" flex justify-center">Chat</h1>
      <span></span>

      <div>{/* <p>Thông tin {result.payload.total}</p> */}</div>
      {/* <GetAllChatbot /> */}
    </div>
  );
}
