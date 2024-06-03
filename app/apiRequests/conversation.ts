import http from "@/lib/http";
import { ConversationResListType, JoinResType, LiveAgentMessageBodyType, LiveAgentMessageResType } from "@/schemas/conversation.schema";

const conversationApiRequest = {
    conversationClient: (id: string) =>
        http.get<ConversationResListType>(`/api/v1/conversation/${id}`),
    joinConversationClient: (id: string) =>
        http.get<JoinResType>(`/api/v1/conversation/${id}/join`),
    sentMessageLiveAgent: (
        body: LiveAgentMessageBodyType,
        conversation_id: string
      ) =>
        http.post<LiveAgentMessageResType>(
          `/api/v1/conversation/${conversation_id}/message`,
          body
        ),
};
export default conversationApiRequest;