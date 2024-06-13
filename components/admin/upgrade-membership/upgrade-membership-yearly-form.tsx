"use client";

import { cn, handleErrorApi } from "@/lib/utils";
import accountApiRequest from "@/app/apiRequests/account";
import { AccountResType } from "@/schemas/account.schema";
import "@/app/globals.css";

import { useRouter } from "next/navigation";
import UpgradeMembershipFree from "./upgrade-membership-free";
import UpgradeMembershipEnterprise from "./upgrade-membership-enterprise";
import UpgradeMembershipEntryYearly from "./upgrade-membership-entry-yearly";
import UpgradeMembershipPremiumYearly from "./upgrade-membership-premium-yearly";
import { useEffect, useState, useTransition } from "react";
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
        // console.log(result.payload);
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, []);

  return (
    // <div className="flex justify-between pt-[30px] w-full">
    //   {membership?.results.map(
    //     (
    //       membershipItem: UpgradeMembershipListType["results"][0],
    //       index: number
    //     ) => (
    //       <div key={index} className="pl-10">
    //         {index === 0 && account && account.id && <UpgradeMembershipFree />}
    //         {index === 1 && account && account.id && (
    //           <UpgradeMembershipEntryYearly
    //             membership_id={membershipItem.id}
    //             plan_price={membershipItem.plan_price}
    //             account_id={account?.id}
    //           />
    //         )}
    //         {index === 2 && account && account.id && (
    //           <UpgradeMembershipPremiumYearly
    //             membership_id={membershipItem.id}
    //             plan_price={membershipItem.plan_price}
    //             account_id={account?.id}
    //           />
    //         )}
    //         {index === 3 && account && account.id && (
    //           <UpgradeMembershipEnterprise />
    //         )}
    //       </div>
    //     )
    //   )}
    // </div>
    <div className="flex justify-center pt-[30px] gap-10">
      <div className="w-[1440px] flex justify-center gap-16 pr-[200px]">
        {membership?.results
          .sort((a, b) => {
            // Sắp xếp các thành phần theo thứ tự ưu tiên: free, entry, premium, enterprise
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
              {membershipItem.plan_title === "yearly_free" &&
                account &&
                account.id && <UpgradeMembershipFree />}
              {membershipItem.plan_title === "yearly_entry" &&
                account &&
                account.id && (
                  <UpgradeMembershipEntryYearly
                    membership_id={membershipItem.id}
                    plan_price={membershipItem.plan_price}
                    account_id={account?.id}
                  />
                )}
              {membershipItem.plan_title === "yearly_premium" &&
                account &&
                account.id && (
                  <UpgradeMembershipPremiumYearly
                    membership_id={membershipItem.id}
                    plan_price={membershipItem.plan_price}
                    account_id={account?.id}
                  />
                )}
              {membershipItem.plan_title === "enterprise" &&
                account &&
                account.id && <UpgradeMembershipEnterprise />}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UpgradeMembershipYearlyForm;
