import http from "@/lib/http";
import {
  ChatbotDeleteResType,
  ChatbotListResType,
  ChatbotMessageBodyType,
  ChatbotMessageResType,
  ChatbotResListType,
  ChatbotResMessageType,
  ChatbotResType,
  EditChatbotBodyType,
  EditChatbotResType,
} from "@/schemas/chatbot.schema";
import {
  CreateChatbotBodyType,
  CreateChatbotResType,
} from "@/schemas/create-chatbot.schema";

const chatbotApiRequest = {
  chatbotClient: (id: string) =>
    http.get<ChatbotResListType>(`/api/v1/chatbot/${id}/get-all-chatbot`),

  chatbotIdClient: (id: string) =>
    http.get<ChatbotResType>(`/api/v1/chatbot/${id}`),

  getDetail: (sessionToken: string, id: string) =>
    http.get<ChatbotResType>(`/api/v1/chatbot/${id}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  createChatbot: (body: CreateChatbotBodyType, user_id: string) =>
    http.post<CreateChatbotResType>(`/api/v1/chatbot/${user_id}/create`, body),

  setCookieConverSationId: (body: { conversation_id: string }) =>
    http.post("/api/admin", body, {
      baseUrl: "",
    }),

  loadMessage: (conversation_id: string) =>
    http.get<ChatbotResMessageType>(`/api/v1/conversation/${conversation_id}`),

  sentMessage: (
    body: ChatbotMessageBodyType,
    id: string,
    conversation_id: string
  ) =>
    http.post<ChatbotMessageResType>(
      `/api/v1/chatbot/${id}/message/${conversation_id}`,
      body
    ),

  sentMessageWithAuth: (
    body: ChatbotMessageBodyType,
    id: string,
    knowledge_base_id: string
  ) =>
    http.post<ChatbotMessageResType>(
      `/api/v1/chatbot/${id}/message/${knowledge_base_id}/with-auth`,
      body
    ),

  updateChatbot: (body: EditChatbotBodyType, id: string) =>
    http.put<EditChatbotResType>(`/api/v1/chatbot/edit/${id}`, body),

  deleteChatbot: (user_id: string, chatbot_id: string) =>
    http.delete<ChatbotDeleteResType>(
      `/api/v1/chatbot/${user_id}/delete/${chatbot_id}`
    ),
};

export default chatbotApiRequest;
