"use client";

import { cn, handleErrorApi } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-stores";
import accountApiRequest from "@/app/apiRequests/account";
import {
  AccountResType,
  AccountSchema,
  UpdateAccountBodyType,
} from "@/schemas/account.schema";
import "@/app/globals.css";

import UpgradeMembershipFree from "./upgrade-membership-free";
import UpgradeMembershipEnterprise from "./upgrade-membership-enterprise";
import UpgradeMembershipEntryMonthly from "./upgrade-membership-entry-monthly";
import UpgradeMembershipPremiumMonthly from "./upgrade-membership-premium-monthly";
import { useEffect, useState, useTransition } from "react";
import { UpgradeMembershipListType } from "@/schemas/upgrade-membership.schema";
import membershipApiRequest from "@/app/apiRequests/upgrade-membership";

const UpgradeMembershipMonthlyForm = () => {
  const [account, setAccount] = useState<AccountResType | null>(null);
  const [membership, setMembership] =
    useState<UpgradeMembershipListType | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccount(result.payload);
      } catch (error: any) {
        handleErrorApi({
          error,
        });
      }
    };
    fetchRequest();
  }, []);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await membershipApiRequest.membershipClient();
        setMembership(result.payload);
        // console.log(result.payload);
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, []);

  return (
    <div className="flex justify-between pt-[30px]">
      {membership?.results.map(
        (
          membershipItem: UpgradeMembershipListType["results"][0],
          index: number
        ) => (
          <div key={index} className="pl-10">
            {index === 0 && account && account.id && (
              <UpgradeMembershipFree
              />
            )}
            {index === 1 && account && account.id && (
              <UpgradeMembershipEntryMonthly
                membership_id={membershipItem.id}
                plan_price={membershipItem.plan_price}
                account_id={account?.id}
              />
            )}
            {index === 2 && account && account.id && (
              <UpgradeMembershipPremiumMonthly
                membership_id={membershipItem.id}
                plan_price={membershipItem.plan_price}
                account_id={account?.id}
              />
            )}
            {index === 3 && (
              <>
                <UpgradeMembershipEnterprise />
              </>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default UpgradeMembershipMonthlyForm;
