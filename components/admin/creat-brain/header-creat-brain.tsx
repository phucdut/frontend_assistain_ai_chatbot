import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

// Khai báo biến poppins và áp dụng font chữ Poppins bằng CSS
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const HeaderCreatBrain = () => {
  return (
    <div>
      <div className="flex items-center justify-between text-[20px] leading-[30px]  gap-[10px]">
        <span className="pt-[8px] text-custom-gray font-semibold text-right">
        Create New Brain
        </span>
        <Link href="http://localhost:3000/home">
          <Image
            src="/x 1.svg"
            alt="x"
            width={24}
            height={24}
          ></Image>
        </Link>
      </div>
    </div>
  );
};
