import http from "@/lib/http";
import { CreateKnowledgeBaseResType, KnowledgeBaseBodyType } from "@/schemas/create-knowledge-base.schema";

const knowledgeBaseApiRequest = {
    createKnowledgeBase: (body: FormData, id: string) =>
        http.post<CreateKnowledgeBaseResType>(`/api/v1/chatbot/${id}/knowledge-base`, body),
}

export default knowledgeBaseApiRequest;