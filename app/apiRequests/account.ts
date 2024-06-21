import http from "@/lib/http";
import {
  AccountResListType,
  AccountResType,
  AccountSchemaResType,
  ChangPasswordBodyType,
  ChangPasswordRes,
  ChangPasswordResType,
  UpdateAccountBodyType,
  UserSubscriptionResType,
} from "@/schemas/account.schema";
const accountApiRequest = {
  accountClient: () => http.get<AccountResType>(`/api/v1/user/profile`),

  accountListClient: () => http.get<AccountResListType>("/api/v1/user/get-all"),

  updateAccount: (body: UpdateAccountBodyType, id: string) =>
    http.put<AccountResType>(`/api/v1/user/edit/${id}`, body),

  resetPlanId: (id: string) => http.get<AccountResType>(`/api/v1/user/reset-membership/${id}`),

  changePassword: (body: ChangPasswordBodyType, id: string) =>
    http.post<ChangPasswordResType>(`/api/v1/user/${id}/change-password`, body),

  userSubscriptionIdClient: (id: string) =>
    http.get<UserSubscriptionResType>(
      `/api/v1/user/${id}/get-user-subscription`
    ),
};
export default accountApiRequest;
