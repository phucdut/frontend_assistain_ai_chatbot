import Image from "next/image";
import Link from "next/link";
import BuildButton from "../ui/build-button";
import { SignUpButton } from "../auth/sign-up/sign-up-button";

const Section1 = () => {
  return (
    <section className="hero">
      <div className="flex">
        <div className="pl-[150px]">
          <div className="pt-[140px] max-w-[492px]">
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
            <Link href="/">
              <Image
                src="/Rectangle50.svg"
                alt="Rectangle"
                width={452}
                height={339}
              ></Image>
            </Link>
          </div>
        </div>
        <div>
          <Link href="/" className=" flex pt-[121px] flex-shrink-0 ">
            <Image
              src="/Rectangle49.svg"
              alt="Rectangle"
              width={491}
              height={557}
            ></Image>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section1;
