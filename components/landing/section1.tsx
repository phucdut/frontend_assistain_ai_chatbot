'use client';
import Image from "next/image";
import Link from "next/link";
import BuildButton from "../ui/build-button";
import { SignUpButton } from "../auth/sign-up/sign-up-button";
import { useEffect } from "react";

const Section1 = () => {
  useEffect(() => {
    // Thêm script không đồng bộ vào khi component được tạo
    const script = document.createElement("script");
    script.src = "http://localhost:3000/bubble-embed.js";
    script.async = true; // Đặt script là không đồng bộ
    document.body.appendChild(script);

    // Xóa script khi component bị hủy
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <section className="hero">
      <div className="flex justify-center gap-16 pt-[100px]">
        <div className="">
          <div className=" max-w-[492px]">
            <h1 className=" text-[55px] font-semibold leading-[127.273%]">
              Build your own AI assistant in minutes
            </h1>
          </div>
          <div className=" pt-[24px] font-normal text-[14px]">
            <p>
              Easy to build, train and publish your AI Assistant without coding.
            </p>
          </div>
          <div
            className="flex items-center justify-between 
      pt-[24px] text-[14px] leading-[24px]
       "
          >
            <SignUpButton>
              <BuildButton className="p-[12px] px-[15px] max-w-[111px] font-medium">
                Get Started
              </BuildButton>
            </SignUpButton>

            <p className="pl-[34px]  pr-[348px] font-normal ">
              No credit cards required
            </p>
          </div>
          <div className="pt-[41px] ">
            <Image
              src="/Rectangle50.svg"
              alt="Rectangle"
              width={452}
              height={339}
            ></Image>
          </div>
        </div>
        <div>
          <Image
            src="/Rectangle49.svg"
            alt="Rectangle"
            width={491}
            height={557}
            className=" flex "
          ></Image>
        </div>
      </div>
      <div className="contain-layout-responsive">
        <div className="text-center font-medium pt-[160px] leading-[36px] text-[24px] ">
          Trusted by forward-thinling pioneers
        </div>
        <div className="flex items-center justify-center gap-20 ">
          <Link href="/" className="pt-[40px] flex-shrink-0">
            <Image
              src="/z4755566056940_97f95a2da4aa31658321547b547bc18d-transformed 1.png"
              alt="AVOCA AI"
              width={168.067}
              height={54}
            ></Image>
          </Link>
          <Link href="/" className="pt-[45px] flex-shrink-0">
            <Image
              src="/image 19.png"
              alt="DAT.BIKE"
              width={154}
              height={44.139}
            ></Image>
          </Link>
          <Link href="/" className="pt-[42px] flex-shrink-0">
            <Image
              src="/image 18.png"
              alt="SWIN BUR"
              width={100}
              height={50}
            ></Image>
          </Link>
          <Link href="/" className="pt-[47px] flex-shrink-0">
            <Image
              src="/image 127.png"
              alt="TEKUP"
              width={154}
              height={39.742}
            ></Image>
          </Link>
          <Link href="/" className="pt-[42px] flex-shrink-0">
            <Image
              src="/image 20.png"
              alt="SELLY"
              width={115.116}
              height={50}
            ></Image>
          </Link>
          <Link href="/" className="pt-[42px] flex-shrink-0">
            <Image
              src="/image 128.png"
              alt="SONCHAN"
              width={122.656}
              height={50}
            ></Image>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section1;
