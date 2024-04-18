
// export default DashBoardLayout;
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
    <html lang="en" className="max-w-[1440px] max-h-[810px] bg-[#FFF]">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
