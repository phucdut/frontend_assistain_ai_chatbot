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

export default function EmbedLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#FFF] overflow-y-auto">
      <body className={poppins.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
