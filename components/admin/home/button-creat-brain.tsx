"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreatBrainForm from "../creat-brain/creat-brain-form";

interface SignInButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const CreatBrainButton = ({
  children,
  mode = "redirect",
  asChild,
}: SignInButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/creat-brain");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <CreatBrainForm />
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
