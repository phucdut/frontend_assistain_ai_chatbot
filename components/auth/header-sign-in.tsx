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

export const HeaderSignIn = () => {
  return (
    <div>
      <div className="flex justify-end text-[14px] pt-[30px] leading-[24px]  gap-[10px] text-[#161616]">
        <span className="pt-[8px] font-normal text-right">
          Don’t have an account?
        </span>
        <SignUpButton>
          <button className="btn-lg-container font-semibold">Sign up</button>
        </SignUpButton>
      </div>
      <div className="pt-6">
        <div className=" max-w-[353px] ">
          <h1 className="text-center text-[36px] font-semibold leading-normal text-gray-[#1D1D1F]">
            Sign in to Ally AI
          </h1>
        </div>
        <div className="pt-[12px] max-w-[353px]">
          <p className="text-center text-[16px] font-normal leading-[26px] text-gray-[#2C2C2C]">
            Welcome to Ally AI, please enter your login details below to using.
          </p>
        </div>
      </div>
    </div>
  );
};
