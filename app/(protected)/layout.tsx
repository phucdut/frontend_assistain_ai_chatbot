import Sidebar from "@/components/sidebar";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import Topbar from "@/components/topbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div>
          <header>
            <Topbar />
          </header>
          <main className="lg:bg-gray-170 lg:overflow lg:pl-80 [&:has([is-navbar-minimal])]:lg:pl-20 lg:pr-7 lg:py-7">
            <Sidebar
              isProPlan={false}
              userLimitCount={0}
              clasName={cn(
                "fixed left-0 z-20 w-80 [&:has([is-navbar-minimal])]:w-fit hidden",
                "lg:block"
              )}
            />
            {/* <MobileSidebar isProPlan={false} userLimitCount={0} />
        <UpgradeProModal isProPlan={false} /> */}
            <div
              className={cn(
                "bg-background h-[calc(100vh-56px)]",
                "lg:rounded-3xl lg:p-7"
              )}
            >
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
