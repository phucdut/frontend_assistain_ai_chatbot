"use client";

import { SwitchUpgradeMembership } from "@/components/ui/switch-upgrade-membership";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UpgradeMembershipLandingMonthlyForm from "./upgrade-membership-monthly-form";
import UpgradeMembershipLandingYearlyForm from "./upgrade-membership-yearly-form";

const UpgradeMembershipLandingForm = () => {
  const [isYearly, setIsYearly] = React.useState(false);

  const handleSwitch = (checked: boolean) => {
    setIsYearly(checked);
  };

  return (
    <div className="w-full h-[700px] bg-gray-50 rounded-xl overflow-y-auto custom-scroll">
      <div className="w-full h-full bg-gray-50 rounded-xl">
        <div className="flex items-center justify-center w-full  rounded-xl pt-10">
          <div className="rounded-xl flex items-center justify-center">
            <h1 className="text-[32px] font-semibold">Pricing That Scales</h1>
          </div>
        </div>
        <div className="flex items-center justify-center pb-5">
          <div className="flex items-center justify-center">
            <div>(with no hidden costs!)</div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-[94px]  rounded-xl  gap-[300px]">
          <div className="w-[270px] h-[60px] bg-zinc-800 rounded-full flex items-center justify-center">
            <SwitchUpgradeMembership onSwitch={handleSwitch} />
          </div>
        </div>
        <div className="p-4">
          {isYearly ? (
            <UpgradeMembershipLandingMonthlyForm />
          ) : (
            <UpgradeMembershipLandingYearlyForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpgradeMembershipLandingForm;
