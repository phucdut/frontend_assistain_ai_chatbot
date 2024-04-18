import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SignInButton } from "./sign-in/sign-in-button";
import { Button } from "../ui/button";

// Khai báo biến poppins và áp dụng font chữ Poppins bằng CSS
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const HeaderSignUp = () => {
  return (
    <div>
      <div className="flex justify-end text-[14px] pt-[30px] leading-[24px]  gap-[10px] text-[#161616]">
        <span className="pt-[8px] font-normal text-right">
          Already have an account?
        </span>
        <SignInButton>
          <button className="btn-lg-container font-semibold">Sign in</button>
        </SignInButton>
      </div>
      <div className="pt-6">
        <div className=" max-w-[335px] ">
          <h1 className="text-center text-[36px] font-semibold leading-normal text-gray-[#1D1D1F]">
            Sign up to Ally AI
          </h1>
        </div>
        <div className="pt-[12px] max-w-[335px]">
          <p className="text-center text-[16px] font-normal leading-[26px] text-gray-[#2C2C2C]">
            Create an account to experience
          </p>
        </div>
      </div>
    </div>
  );
};
