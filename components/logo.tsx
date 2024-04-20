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
    <div className={cn("flex items-center", className)}>
      {/* <BrainCircuit color="#0ea5e9" size={40} /> */}
        {/* Thay thế <BrainCircuit> bằng <Image> */}
        <div className="absolute left-[30px] flex-shrink-0">
          <Image
            src="/Horizontal 2.png"
            alt="Horizontal 2"
            width={130}
            height={40}
          ></Image>
        </div>
        <div className="absolute left-[69px] flex-shrink-0">
          <Image
            src="/Horizontal 3.png"
            alt="Horizontal 3"
            width={91}
            height={40}
          ></Image>
        </div>
    </div>
  );
};

export default Logo;
