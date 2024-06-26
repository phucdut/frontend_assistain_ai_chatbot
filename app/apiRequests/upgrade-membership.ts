import http from "@/lib/http";
import { UpgradeMembershipListType } from "@/schemas/upgrade-membership.schema";

const membershipApiRequest = {
  membershipClient: () =>
    http.get<UpgradeMembershipListType>(`api/v1/subscription_plan/get-all`),
};
export default membershipApiRequest;