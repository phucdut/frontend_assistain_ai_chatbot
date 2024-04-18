
import Image from "next/image";
import "@/app/globals.css";

const Section3 = () => {
  return (
    <div>
      <div className="flex contain-layout-responsive">
        <div className="flex text-center pt-[148.56px] pl-[218.65px] text-[14px] font-normal ">
          <div className="relative layout-text-container    leading-9">
            Going beyond just a chatbot
            <p className="absolute top-[27.5px] left-[109.93px]  rectangle12"></p>
          </div>
        </div>
        <div>
          <div className="font-medium pt-[111.18px] pl-[230.32px] leading-[24px] text-[16px]">
            <p className="demo">LIVE DEMO</p>
          </div>
          <div>
            <p className="font-medium text-center pt-[26px] leading-[36px] text-[24px]">
              This assistant was created in minutes with AllyAI
            </p>
          </div>
        </div>
      </div>
      <div className="top-[4.5px] pl-[346px] flex-shrink-0">
        <Image src="/image 5.png" alt="..." width={78} height={111}></Image>
      </div>
    </div>
  );
};

export default Section3;
