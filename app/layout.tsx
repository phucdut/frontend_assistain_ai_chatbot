import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppProvider from "./app-provider";
import { cookies } from 'next/headers'
// import { db } from "@/lib/db";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "AllyBy AI App",
  description: "AllyBy AI App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  // console.log(sessionToken);
  // const session = await db.user.findMany;
  return (
    <html lang="en" className="bg-[#FFF] lg:overflow-hidden">
      <body className={poppins.className}>
        <AppProvider inititalSessionToken={sessionToken?.value}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
