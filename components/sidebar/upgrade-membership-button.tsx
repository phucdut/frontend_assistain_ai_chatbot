"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpgradeMembershipForm from "../admin/upgrade-membership/upgrade-membership-monthly-form";

interface UpgradeMembershipButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const UpgradeMembershipButton = ({
  children,
  mode = "redirect",
  asChild,
}: UpgradeMembershipButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/upgrade-membership");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="">
          <UpgradeMembershipForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
