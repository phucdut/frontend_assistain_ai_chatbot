"use client";

import React, { useEffect, useState } from "react";
import "@/app/globals.css";


import { cn, handleErrorApi } from "@/lib/utils";

import accountApiRequest from "@/app/apiRequests/account";
import { useRouter } from "next/navigation";

import DashBoardAdminForm from "./dashboard-form-admin";
import DashBoardUserForm from "./dashboard-form-user";

const DashBoardForm = () => {
  const [accountRole, setAccountRole] = useState<String | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccountRole(result.payload.user_role);
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
    <div>
      {accountRole === "admin" ? <DashBoardAdminForm /> : <DashBoardUserForm />}
    </div>
  );
};

export default DashBoardForm;
