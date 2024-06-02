import Image from "next/image";
import React, { useEffect, useState } from "react";

import { useSidebarStore } from "@/stores/sidebar-stores";
import { cn, handleErrorApi } from "@/lib/utils";
import { UpgradeMembershipButton } from "./upgrade-membership-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { AccountResType } from "@/schemas/account.schema";
import accountApiRequest from "@/app/apiRequests/account";
import { useRouter } from "next/navigation";

const UpgradeMembershipComponent = () => {
  const { isMinimal, handleClose } = useSidebarStore();
  const [account, setAccount] = useState<AccountResType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccount(result.payload);

        // Update form values with fetched chatbot data
      } catch (error: any) {
        handleErrorApi({
          error,
        });
        router.push("/");
        router.refresh(); // Chuyển hướng người dùng về trang landing
      }
    };
    fetchRequest();
  }, [router]);

  return (
    <div
      className={cn(isMinimal && "px-3", "flex items-center justify-between")}
      onClick={handleClose}
    >
      {isMinimal && (
        <div>
          <Link href={`/upgrade-membership/${account?.id}`}>
            <Image
              src="/Group (3).svg"
              alt="x"
              width={24}
              height={22}
              className="pb-3"
            />
          </Link>
        </div>
      )}
      {!isMinimal && (
        <div className="flex items-center justify-between pt-3 pb-5">
          <UpgradeMembershipButton>
            <Button className=" w-[287px] h-[54px] bg-zinc-900 rounded-md border-2 border-zinc-800 gap-2 text-custom-gray-6">
              <Image src="/Group (3).svg" alt="x" width={24} height={22} />
              Upgrade membership
            </Button>
          </UpgradeMembershipButton>
        </div>
      )}
    </div>
  );
};

export default UpgradeMembershipComponent;
