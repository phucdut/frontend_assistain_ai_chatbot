import { cookies } from "next/headers";
import type { Metadata } from "next";
import AdminForm from "@/components/admin/admin-form";
import envConfig from "@/app/config";

export const metadata: Metadata = {
  title: "form admin",
};

export default async function AdminPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  return (
    <div>
      <AdminForm />
    </div>
  );
}
