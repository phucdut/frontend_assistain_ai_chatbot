import chatbotApiRequest from "@/app/apiRequests/chatbot";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function GetAllChatbot() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const isAuthenticated = Boolean(sessionToken);
  const { payload } = await chatbotApiRequest.getList(
    sessionToken?.value ?? ""
  );
  const chatbotList = payload.results;

  return (
    <div className="space-y-5">
      {chatbotList?.map((chatbot) => (
        <div key={chatbot.id} className="flex space-x-4">
          <Link href={`/chatbots/${chatbot.id}`}>
            <h3>{chatbot.chatbot_name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
