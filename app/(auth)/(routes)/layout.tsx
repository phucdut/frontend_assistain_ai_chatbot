import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
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

export default function AuthLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="max-w-[1440px] max-h-[750px] bg-[#FFF] overflow-y-auto">
      <body className={poppins.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
