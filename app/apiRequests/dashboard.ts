import http from "@/lib/http";
import { ConversationAndChatbotResType, InboxesAndLatencyListType, VisitorAndRatingListType } from "@/schemas/dashboard.schema";

const dashboardApiRequest = {
  dashboardConversationValueClient: (filter: string, value: string, chatbot_id: string ) =>
    http.get<ConversationAndChatbotResType>(`/api/v1/dashboard/conversation/${filter}/${value}/${chatbot_id}`),

  dashboardConversationChartClient: (filter: string, value: string, chatbot_id: string) =>
    http.get<VisitorAndRatingListType>(`/api/v1/dashboard/chart/${filter}/${value}/${chatbot_id}`),

  dashboardMessageChartClient: (filter: string, value: string) =>
    http.get<InboxesAndLatencyListType>(`/api/v1/dashboard/chart/${filter}/${value}`),
};
export default dashboardApiRequest;