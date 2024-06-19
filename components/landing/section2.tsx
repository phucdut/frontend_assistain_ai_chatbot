"use client";

import Image from "next/image";
import "@/app/globals.css";
import { forwardRef, useState } from "react";

const Section2 = forwardRef<HTMLDivElement>((props) => {
  const [selectedOption, setSelectedOption] = useState<
    "0" | "1" | "2" | "3" | null
  >(null);

  const handleClick = (option: "0" | "1" | "2" | "3") => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  return (
    <div className="">
      <div className="flex justify-center h-[250px] overflow-y-hidden">
        <div>
          <div className="font-medium pt-[41.18px] leading-[24px] text-[16px] flex justify-center items-center relative">
            <p className="demo relative" onClick={() => handleClick("0")}>
              LIVE DEMO
            </p>
            <div className="absolute flex text-center left-[-218.04px] pt-[88.56px] text-[14px] font-normal ">
              <div className="relative layout-text-container leading-9">
                Going beyond just a chatbot
                <p className="absolute top-[27.5px] left-[109.93px] rectangle12"></p>
              </div>
            </div>
          </div>
          <div className="w-full font-medium py-[26px] leading-[36px] text-[24px] flex justify-center items-center">
            <div>This assistant was created in minutes with AllyBy AI</div>
          </div>
          <div className="flex justify-center items-center relative">
            <div className="w-[454px] h-[52px] bg-neutral-100 rounded-[100px] flex justify-center items-center gap-[-4px] ">
              <div
                className={`w-[162px] h-9  py-1.5 ${
                  selectedOption === "1" ? "bg-white" : ""
                } rounded-[100px] justify-center items-center gap-2.5 inline-flex cursor-pointer`}
                onClick={() => handleClick("1")}
              >
                <div className="w-[90px] text-center text-neutral-900 text-sm font-semibold leading-normal">
                  AllyBy FAQ
                </div>
              </div>
              <div
                className={`w-[192px] h-9  py-1.5 ${
                  selectedOption === "2" ? "bg-white" : ""
                } rounded-[100px] justify-center items-center gap-2.5 inline-flex cursor-pointer`}
                onClick={() => handleClick("2")}
              >
                <div className="w-[135px] text-center text-neutral-900 text-sm font-semibold leading-normal">
                  Customer Support
                </div>
              </div>
              <div
                className={`w-[162px] h-9  py-1.5 ${
                  selectedOption === "3" ? "bg-white" : ""
                } rounded-[100px] justify-center items-center gap-2.5 inline-flex cursor-pointer`}
                onClick={() => handleClick("3")}
              >
                <div className="w-[90px] text-center text-neutral-900 text-sm font-semibold leading-normal">
                  Life Coach
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 absolute left-[-100px]">
              <Image src="/image 5.png" alt="..." width={78} height={111} />
            </div>
          </div>
        </div>
      </div>
      {selectedOption && (
        <div className="flex justify-center items-center pt-10">
          <div className="w-[1140px] h-[571px] bg-white rounded-xl">
            <iframe
              src="http://localhost:3000/embed/?chatbot_id=9f40fa03-7a04-431e-ab24-3cede5ce6657&modeltype=gpt-3.5-turbo&mode=false&logo=ZmFsc2U="
              allow="clipboard-write; *;microphone *"
              width="100%"
              height="950"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
});

Section2.displayName = "Section2";

export default Section2;
