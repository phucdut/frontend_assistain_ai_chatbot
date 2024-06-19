"use client";

import "@/app/globals.css";

import UpgradeMembershipLandingEnterprise from "./upgrade-membership-enterprise";
import UpgradeMembershipLandingPremiumMonthly from "./upgrade-membership-premium-monthly";
import UpgradeMembershipLandingEntryMonthly from "./upgrade-membership-entry-monthly";
import UpgradeMembershipLandingFree from "./upgrade-membership-free";

const UpgradeMembershipLandingMonthlyForm = () => {
  return (
    <div className="flex justify-center gap-12 pt-[30px] overflow-y-auto custom-scroll">
      <UpgradeMembershipLandingFree />
      <UpgradeMembershipLandingEntryMonthly />
      <UpgradeMembershipLandingPremiumMonthly />
      <UpgradeMembershipLandingEnterprise />
    </div>
  );
};

export default UpgradeMembershipLandingMonthlyForm;
