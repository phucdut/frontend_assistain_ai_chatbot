"use client";

import { cn, handleErrorApi } from "@/lib/utils";
import accountApiRequest from "@/app/apiRequests/account";
import { AccountResType } from "@/schemas/account.schema";
import "@/app/globals.css";

import UpgradeMembershipFree from "./upgrade-membership-free";
import UpgradeMembershipEnterprise from "./upgrade-membership-enterprise";
import UpgradeMembershipEntryYearly from "./upgrade-membership-entry-yearly";
import UpgradeMembershipPremiumYearly from "./upgrade-membership-premium-yearly";
import { useEffect, useState } from "react";
import membershipApiRequest from "@/app/apiRequests/upgrade-membership";
import { UpgradeMembershipListType } from "@/schemas/upgrade-membership.schema";

const UpgradeMembershipYearlyForm = () => {
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
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, []);

  const plansToShow = [
    "yearly_free",
    "yearly_entry",
    "yearly_premium",
    "enterprise",
  ];

  return (
    <div className="flex justify-center pt-[30px] gap-10">
      <div className="w-full flex justify-center gap-16">
        {membership?.results
          .filter((membershipItem) =>
            plansToShow.includes(membershipItem.plan_title)
          )
          .sort((a, b) => {
            const order = [
              "yearly_free",
              "yearly_entry",
              "yearly_premium",
              "enterprise",
            ];
            return order.indexOf(a.plan_title) - order.indexOf(b.plan_title);
          })
          .map((membershipItem, index) => (
            <div key={index} className="">
              {membershipItem.plan_title === "yearly_free" && account?.id && (
                <UpgradeMembershipFree
                  membership_id={membershipItem.id}
                  plan_price={membershipItem.plan_price}
                  account_id={account?.id}
                />
              )}
              {membershipItem.plan_title === "yearly_entry" && account?.id && (
                <UpgradeMembershipEntryYearly
                  membership_id={membershipItem.id}
                  plan_price={membershipItem.plan_price}
                  account_id={account?.id}
                />
              )}
              {membershipItem.plan_title === "yearly_premium" &&
                account?.id && (
                  <UpgradeMembershipPremiumYearly
                    membership_id={membershipItem.id}
                    plan_price={membershipItem.plan_price}
                    account_id={account?.id}
                  />
                )}
              {membershipItem.plan_title === "enterprise" && account?.id && (
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

export default UpgradeMembershipYearlyForm;
