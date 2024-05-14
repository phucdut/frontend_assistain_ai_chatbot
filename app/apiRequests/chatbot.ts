import http from "@/lib/http";
import { ChatbotListResType, ChatbotMessageBodyType, ChatbotMessageResType, ChatbotResListType, ChatbotResType } from "@/schemas/chatbot.schema";
import {
  CreateChatbotBodyType,
  CreateChatbotResType,
} from "@/schemas/create-chatbot.schema";

const chatbotApiRequest = {
  chatbot: (sessionToken: string) =>
    http.get<ChatbotResType>("/api/v1/chatbot/get_all", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  chatbotClient: () => http.get<ChatbotResListType>("/api/v1/chatbot/get-all"),
  getList: (sessionToken: string) =>
    http.get<ChatbotListResType>("/api/v1/chatbot/get-all", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  getDetail: (sessionToken: string, id: string) =>
    http.get<ChatbotResType>(`/api/v1/chatbot/${id}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  createChatbot: (body: CreateChatbotBodyType) =>
    http.post<CreateChatbotResType>("/api/v1/chatbot/", body),
  setCookieConverSationId: (body: { conversation_id: string }) =>
    http.post("/api/admin", body, {
      baseUrl: "",
    }),
  sentMessage: (body: ChatbotMessageBodyType, id: string) =>
    http.post<ChatbotMessageResType>(`/api/v1/chatbot/${id}/message`, body),
};

export default chatbotApiRequest;
