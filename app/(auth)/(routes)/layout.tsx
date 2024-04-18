import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
// import { db } from "@/lib/db";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await db.user.findMany;
  return (
    <html
      lang="en"
      className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] bg-[#fff] "
    >
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
