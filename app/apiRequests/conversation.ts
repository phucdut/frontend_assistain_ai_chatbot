import http from "@/lib/http";
import { ConversationResListType } from "@/schemas/conversation.schema";

const conversationApiRequest = {
    conversationClient: (id: string) =>
        http.get<ConversationResListType>(`/api/v1/conversation/${id}`),
};
export default conversationApiRequest;