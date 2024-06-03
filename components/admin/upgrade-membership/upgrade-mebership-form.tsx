"use client";

import UpgradeMembershipMonthlyForm from "@/components/admin/upgrade-membership/upgrade-membership-monthly-form";
import UpgradeMembershipYearlyForm from "@/components/admin/upgrade-membership/upgrade-membership-yearly-form";
import { SwitchUpgradeMembership } from "@/components/ui/switch-upgrade-membership";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UpgradeMembershipForm = () => {
  const [isYearly, setIsYearly] = React.useState(false);

  const handleSwitch = (checked: boolean) => {
    setIsYearly(checked);
  };

  return (
    <div className="w-full h-full bg-gray-50 rounded-xl">
      <div className="w-full h-full bg-gray-50 rounded-xl">
        <div className="flex items-center justify-center w-full h-[94px] bg-zinc-900 rounded-xl  gap-[300px]">
          <div className="text-white text-2xl font-semibold leading-[34px] w-[270px] h-[34px]">
            Upgrade membership
          </div>
          <div className="w-[270px] h-[60px] bg-zinc-800 rounded-xl flex items-center justify-center">
            
          </div>
          <div className="w-[270px] relative"></div>
          <Link href="/home" className="absolute right-20">
            <Image
              src="/x 1.svg"
              alt="x"
              width={24}
              height={24}
              className=" transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
            />
          </Link>
        </div>
        <div className="p-4">
          {isYearly ? (
            <UpgradeMembershipMonthlyForm />
          ) : (
            <UpgradeMembershipYearlyForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpgradeMembershipForm;
