import Sidebar from "@/components/sidebar";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import Topbar from "@/components/topbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AppProvider from "../app-provider";
import { cookies } from 'next/headers'
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "AllyBy AI App",
  description: "AllyBy AI App",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>
            <header>
              <Topbar />
            </header>
            <main className="lg:bg-gray-170 lg:overflow-auto lg:pl-80 [&:has([is-navbar-minimal])]:lg:pl-20 lg:pr-7 lg:py-7">
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
                  "lg:rounded-3xl "
                  // styte cho giao diện: "lg:p-7"
                )}
              >
                <AppProvider inititalSessionToken={sessionToken?.value}>
                <Toaster />
                  {children}
                </AppProvider>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
