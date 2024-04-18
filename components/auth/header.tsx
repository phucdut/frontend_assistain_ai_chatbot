import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SignUpButton } from "./sign-up/sign-up-button";
import { Button } from "../ui/button";

// Khai báo biến poppins và áp dụng font chữ Poppins bằng CSS
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const Header = () => {
  return (
    <div className="flex text-[14px] pt-[30px] leading-[24px] pl-[231px] gap-[10px] text-[#161616]">
      <span className="pt-[8px] font-normal text-right">Don’t have an account?</span>
      <SignUpButton>
        <button className="btn-lg-container font-semibold">
          Sign up
        </button>
      </SignUpButton>
    </div>
  );
};
