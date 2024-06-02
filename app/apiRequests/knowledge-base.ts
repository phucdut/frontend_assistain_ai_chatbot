import http from "@/lib/http";
import {
  CreateKnowledgeBaseResType,
  KnowledgeBaseBodyType,
  KnowledgeBaseResListType,
  KnowledgeBaseResType,
} from "@/schemas/knowledge-base.schema";

const knowledgeBaseApiRequest = {
  createKnowledgeBase: (body: FormData, id: string) =>
    http.post<CreateKnowledgeBaseResType>(
      `/api/v1/chatbot/${id}/knowledge-base`,
      body
    ),

  getAllKnowledgeBase: (id: string) =>
    http.get<KnowledgeBaseResListType>(
      `/api/v1/chatbot/${id}/get-all-knowledge-base`
    ),
    
  deleteKnowledgeBase: (chatbot_id: string, knowledgeBase_id: string) =>
    http.delete<KnowledgeBaseResType>(
      `/api/v1/chatbot/${chatbot_id}/knowledge-base/${knowledgeBase_id}`
    ),
};

export default knowledgeBaseApiRequest;
