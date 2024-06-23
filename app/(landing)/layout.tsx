import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import ChatEmbed from "@/components/admin/chatbots/share-chatbot/chat";

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
    <html
      lang="en"
      className=" bg-[#FFF] overflow-hidden"
    >
      <body className={poppins.className}>
        <Toaster />
        {children}
        <ChatEmbed id="9f40fa03-7a04-431e-ab24-3cede5ce6657"></ChatEmbed>
      </body>
    </html>
  );
}
