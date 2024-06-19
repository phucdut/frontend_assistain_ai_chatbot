import http from "@/lib/http";
import { AccountResType, BanResType, UnBanResType } from "@/schemas/account.schema";
import { ChatbotResListType } from "@/schemas/chatbot.schema";
const adminApiRequest = {
    ban: (id: string) => http.get<BanResType>(`/api/v1/admin/ban/${id}`),
    unBan: (id: string) => http.get<UnBanResType>(`/api/v1/admin/unban/${id}`),
    detailUser: (id: string) => http.get<AccountResType>(`/api/v1/admin/user/${id}`),
    chatbotClient: () =>
        http.get<ChatbotResListType>(`/api/v1/admin/chatbot/all`),
    
  };
  export default adminApiRequest;