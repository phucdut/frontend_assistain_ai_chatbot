import http from "@/lib/http";
import {
  EditSubscriptionPlanBodyType,
  EditSubscriptionPlanResType,
  SubscriptionPlanDeleteResType,
  SubscriptionPlanResListType,
} from "@/schemas/subscription-plan.schema";
const subscriptionPlanApiRequest = {
  createSubscriptionPlan: (body: EditSubscriptionPlanBodyType) =>
    http.post<EditSubscriptionPlanResType>(`/api/v1/subscription_plan/create`, body),

  listSubscriptionPlanClient: () =>
    http.get<SubscriptionPlanResListType>(
      "/api/v1/subscription_plan/get-all"
    ),

  updateSubscriptionPlan: (body: EditSubscriptionPlanBodyType, id: string) =>
    http.put<EditSubscriptionPlanResType>(
      `/api/v1/subscription_plan/edit-sub-plan/${id}`,
      body
    ),

  subscriptionPlanClient: (id: string) =>
    http.get<EditSubscriptionPlanResType>(
      `/api/v1/subscription_plan/sub-plan-detail/${id}`
    ),

  deleteSubscriptionPlan: (id: string) =>
    http.delete<SubscriptionPlanDeleteResType>(
      `/api/v1/subscription_plan/delete/${id}`
    ),
};
export default subscriptionPlanApiRequest;
