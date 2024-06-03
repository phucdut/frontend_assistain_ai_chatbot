"use client";

import Image from "next/image";
import "@/app/globals.css";
import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex-shrink-0">
        <Image
          src="/success-green-check-mark-icon.svg"
          alt="Payment Success"
          width={128}
          height={128}
        ></Image>
      </div>
      <div className="pt-[24px] text-[36px] font-semibold text-[#1D1D1F]">
        <h1>Payment Successful!</h1>
      </div>
      <div className="pt-[12px] text-[16px] font-normal leading-[26px] text-[#2C2C2C]">
        <p className="text-center max-w-[363px]">
          Your payment was processed successfully. Thank you for your purchase!
        </p>
      </div>
      <div className=" flex items-center justify-between pt-[24px] text-[16px]">
        <Link href="/home">
          <button className="lg text-[#FFF] bg-[#161616] w-[363px] h-[60px] max-w-[363px] font-semibold leading-[26px] ">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
