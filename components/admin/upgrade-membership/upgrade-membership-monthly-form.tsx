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
    <div className="flex justify-center pt-[30px] gap-10">
      <div className="w-[1440px] flex justify-center gap-16 pr-[200px]">
        {membership?.results
          .sort((a, b) => {
            // Sắp xếp các thành phần theo thứ tự ưu tiên: free, entry, premium, enterprise
            const order = [
              "monthly_free",
              "monthly_entry",
              "monthly_premium",
              "enterprise",
            ];
            return order.indexOf(a.plan_title) - order.indexOf(b.plan_title);
          })
          .map((membershipItem, index) => (
            <div key={index} className="">
              {membershipItem.plan_title === "monthly_free" &&
                account &&
                account.id && (
                  <UpgradeMembershipFree
                    membership_id={membershipItem.id}
                    plan_price={membershipItem.plan_price}
                    account_id={account?.id}
                  />
                )}
              {membershipItem.plan_title === "monthly_entry" &&
                account &&
                account.id && (
                  <UpgradeMembershipEntryMonthly
                    membership_id={membershipItem.id}
                    plan_price={membershipItem.plan_price}
                    account_id={account?.id}
                  />
                )}
              {membershipItem.plan_title === "monthly_premium" &&
                account &&
                account.id && (
                  <UpgradeMembershipPremiumMonthly
                    membership_id={membershipItem.id}
                    plan_price={membershipItem.plan_price}
                    account_id={account?.id}
                  />
                )}
              {membershipItem.plan_title === "enterprise" &&
                account &&
                account.id && (
                  <UpgradeMembershipEnterprise
                    membership_id={membershipItem.id}
                    plan_price={membershipItem.plan_price}
                    account_id={account?.id}
                  />
                )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UpgradeMembershipMonthlyForm;
