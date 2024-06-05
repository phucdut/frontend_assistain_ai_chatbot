import { cn } from "@/lib/utils";
import { BrainCircuit } from "lucide-react";

import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({ weight: "700", subsets: ["latin"] });

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-start", className)}>
      {/* <BrainCircuit color="#0ea5e9" size={40} /> */}
      {/* Thay thế <BrainCircuit> bằng <Image> */}
      <div className="absolute flex-shrink-0 pt-4">
        <Image
          src="/logo/allyby (2).png"
          alt="allyby"
          width={200}
          height={100}
          className="w-56 h-28"
        ></Image>
      </div>
      {/* <div className="absolute left-[69px] flex-shrink-0 text-[28px] font-semibold leading-[26px]" >
        <Image
            src="/Horizontal 3.png"
            alt="Horizontal 3"
            width={91}
            height={40}
          ></Image>
        ALLYBY
      </div> */}
    </div>
  );
};

export default Logo;
