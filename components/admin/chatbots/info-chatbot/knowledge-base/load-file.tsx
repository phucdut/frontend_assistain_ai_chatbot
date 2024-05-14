import { ProgressLoadFile } from "@/components/ui/progress-load-file";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

const LoadFile = () => {
  return (
    <div className="w-[400px] h-[82px] px-4 bg-orange-100 rounded-md flex items-center justify-between">
      <div>
        <Image
          src="/Group-i-progress.svg"
          alt="Group-i-progress"
          width={16}
          height={16}
        ></Image>
      </div>
      <div className="">
        <div className="flex justify-between items-center">
          <div className="text-zinc-900 text-xs font-normal leading-[18px]">
            Training Test 1 knowledge base
          </div>
          <Image
            src="/x 1.svg"
            alt="x"
            width={24}
            height={24}
            className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-110"
          ></Image>
          {/* <div className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-110">
            <X />
          </div> */}
        </div>
        <div className="pb-2 pt-1">
          <ProgressLoadFile value={50} className="bg-white" />
        </div>
        <div className="text-zinc-900 text-xs font-normal leading-[18px]">
          7 seconds left
        </div>
      </div>
    </div>
  );
};

export default LoadFile;
