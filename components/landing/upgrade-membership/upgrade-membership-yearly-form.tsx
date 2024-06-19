"use client";

import "@/app/globals.css";

import UpgradeMembershipLandingFree from "./upgrade-membership-free";
import UpgradeMembershipLandingEntryYearly from "./upgrade-membership-entry-yearly";
import UpgradeMembershipLandingPremiumYearly from "./upgrade-membership-premium-yearly";
import UpgradeMembershipLandingEnterprise from "./upgrade-membership-enterprise";

const UpgradeMembershipLandingYearlyForm = () => {

  return ( 
    <div className="flex justify-center gap-12 pt-[30px] overflow-y-auto custom-scroll">
      <UpgradeMembershipLandingFree />
      <UpgradeMembershipLandingEntryYearly />
      <UpgradeMembershipLandingPremiumYearly />
      <UpgradeMembershipLandingEnterprise />
    </div>
  );
};
export default UpgradeMembershipLandingYearlyForm;
