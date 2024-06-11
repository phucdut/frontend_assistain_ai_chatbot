'use client';
import { X } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const Section3 = () => {

  
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[944px] pt-40 text-center text-neutral-900 text-2xl font-medium leading-9">
          The user-friendly no-code platform enables you to quickly go from data
          collection to publishing surprisingly accurate models.
        </div>
      </div>
      <div className="flex justify-center pt-10">
        <Image src="/image 17.svg" alt="Rectangle" width={738} height={531} />
      </div>
      <div className="text-center text-neutral-900 text-5xl font-medium pt-32 pb-10">
        From A to Z
      </div>
      <div className="flex justify-center items-center gap-10">
        <Image src="/image 13.svg" alt="Rectangle" width={733} height={568} />
        <div>
          <div className="w-[72px] h-[72px] bg-orange-100 rounded-md relative">
            <Image
              src="/icons/merge 1.svg"
              alt="merge 1"
              width={30}
              height={30}
              className="left-[21px] top-[21px] absolute"
            />
          </div>
          <div className="w-[393px] text-neutral-900 text-[40px] font-medium">
            Bring your data together in a snap
          </div>
          <div className="w-[393px] text-neutral-900 text-base font-normal leading-relaxed">
            Get the data you need, from anywhere, with ease!
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-[140px]">
        <div>
          <div className="w-[72px] h-[72px] bg-orange-100 rounded-md relative">
            <Image
              width={30}
              height={30}
              src="/icons/share 2.svg"
              alt="a"
              className="left-[21px] top-[21px] absolute"
            />
          </div>
          <div className="w-[393px] text-neutral-900 text-[40px] font-medium">
            Train your AI with confidence, with our easy-to-use tools.
          </div>
          <div className="w-[393px] text-neutral-900 text-base font-normal leading-relaxed">
            Apply your domain knowledge to train AI that solves real-world
            problems.
          </div>
        </div>
        <div className="relative">
          <div className="w-[370px] h-[572px] max-w-full max-h-full overflow-y-auto overflow-x-hidden bg-gray-50 rounded-xl shadow border border-slate-300">
            <div className="flex items-center justify-between px-4 pt-2 h-[60px] rounded-xl bg-white w-full">
              <Image
                src="/Horizontal-logo.png"
                alt="logo"
                width={36}
                height={36}
              />
              <div className="opacity-50 text-center text-neutral-900 text-[13px] font-normal leading-[18px]">
                Powered by AllyBy AI
              </div>
              <X className="w-4 h-4 relative" />
            </div>
            <div className="px-1 pb-0 relative">
              <div className="w-[370px] h-[440px] flex flex-col space-y-2">
                <div className="flex justify-start items-center w-[230px] h-[44px] rounded-xl shadow pl-5">
                  <div className="text-neutral-900 text-base font-normal leading-9">
                    👋 What is AllyBy AI
                  </div>
                </div>
                <div className="flex justify-start items-center w-[280px] h-[44px] rounded-xl shadow pl-5">
                  <div className="text-neutral-900 text-base font-normal leading-9">
                    Tell me ten things I can do with
                  </div>
                </div>
                <div className="flex justify-start items-center w-[230px] h-[44px] rounded-xl shadow pl-5">
                  <div className="text-neutral-900 text-base font-normal leading-9">
                    How do I get started with
                  </div>
                </div>
              </div>
              <div className="text-[16px] font-normal leading-[18px] relative w-full">
                <Input
                  placeholder="Write your message"
                  type="email"
                  className="h-[55px]"
                />
                <Button className="absolute inset-y-1.5 right-4 w-11 h-11">
                  <Image
                    src="/paper-plane 1.svg"
                    alt="send"
                    width={20}
                    height={20}
                  />
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-[520px] inset-x-[390px]">
            <div className="w-[50px] h-[50px] rounded-full bg-primary relative pt-5">
              <Image
                src="/icons/Horizontal 1.svg"
                alt="x"
                width={42}
                height={42}
                className="rounded-full absolute inset-y-[4px] inset-x-[4px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-[100px]">
        <div>
          <div className="w-[72px] h-[72px] bg-orange-100 rounded-md relative">
            <Image
              width={30}
              height={30}
              src="/icons/share 2.svg"
              alt="a"
              className="left-[21px] top-[21px] absolute"
            />
          </div>
          <div className="w-[393px] text-neutral-900 text-[40px] font-medium">
            Make your AI available to the world, with a few clicks.
          </div>
          <div className="w-[393px] text-neutral-900 text-base font-normal leading-relaxed">
            Get your AI up and running quickly and easily, with a variety of
            prebuilt options.
          </div>
        </div>
        <div className="pt-32">
          <Image width={648} height={559} src="/image 15.svg" alt="a" />
        </div>
      </div>
      <div className="flex justify-center items-center gap-10">
        <Image src="/image 16.svg" alt="Rectangle" width={685} height={606} />
        <div>
          <div className="w-[72px] h-[72px] bg-orange-100 rounded-md relative">
            <Image
              src="/icons/merge 1.svg"
              alt="merge 1"
              width={30}
              height={30}
              className="left-[21px] top-[21px] absolute"
            />
          </div>
          <div className="w-[393px] text-neutral-900 text-[40px] font-medium">
            Continuously improve and innovate.
          </div>
          <div className="w-[393px] text-neutral-900 text-base font-normal leading-relaxed">
            Our report is a roadmap to better AI, with clear recommendations for
            where to keep pushing.
          </div>
        </div>
      </div>
      <div className="text-center text-neutral-900 text-[40px] font-medium">
        And much more
      </div>
      <div className="flex justify-center items-center gap-40 pt-10">
        <div className="w-[240px] h-[224px]">
          <div className="flex justify-center">
            <div className="w-[72px] h-[72px] bg-orange-100 rounded-md relative">
              <Image
                src="/icons/laptop (1) 1.svg"
                alt="merge 1"
                width={30}
                height={30}
                className="left-[21px] top-[21px] absolute"
              />
            </div>
          </div>
          <div className="w-[237px] text-center text-neutral-900 text-2xl font-medium pt-7">
            We do the work
          </div>
          <div className="w-[237px] text-center text-neutral-900 text-sm font-normal leading-normal pt-4">
            You take care of business, we take care of your AI
          </div>
        </div>
        <div className="w-[240px] h-[224px]">
          <div className="flex justify-center">
            <div className="w-[72px] h-[72px] bg-orange-100 rounded-md relative">
              <Image
                src="/icons/booster 1.svg"
                alt="merge 1"
                width={30}
                height={30}
                className="left-[21px] top-[21px] absolute"
              />
            </div>
          </div>
          <div className="w-[237px] text-center text-neutral-900 text-2xl font-medium pt-7">
            Optimized to your specifications
          </div>
          <div className="w-[237px] text-center text-neutral-900 text-sm font-normal leading-normal pt-4">
            Customize your AI to perform precisely as you require
          </div>
        </div>
        <div className="w-[240px] h-[224px]">
          <div className="flex justify-center">
            <div className="w-[72px] h-[72px] bg-orange-100 rounded-md relative">
              <Image
                src="/icons/artificial-intelligence 1.svg"
                alt="merge 1"
                width={30}
                height={30}
                className="left-[21px] top-[21px] absolute"
              />
            </div>
          </div>
          <div className="w-[237px] text-center text-neutral-900 text-2xl font-medium pt-7">
            The best LLMs for your needs
          </div>
          <div className="w-[237px] text-center text-neutral-900 text-sm font-normal leading-normal pt-4">
            Open AI’s GPT-4, Bard, LLaMA 2, Falcon, and more
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-40 pt-10 pb-20">
        <div className="w-[240px] h-[224px]">
          <div className="flex justify-center">
            <div className="w-[72px] h-[72px] bg-orange-100 rounded-md relative">
              <Image
                src="/icons/shield (2) 1.svg"
                alt="merge 1"
                width={30}
                height={30}
                className="left-[21px] top-[21px] absolute"
              />
            </div>
          </div>
          <div className="w-[237px] text-center text-neutral-900 text-2xl font-medium pt-7">
            Next-generation security
          </div>
          <div className="w-[237px] text-center text-neutral-900 text-sm font-normal leading-normal pt-4">
            Take control of your data and work with it on your own cloud
            providers
          </div>
        </div>
        <div className="w-[240px] h-[224px]">
          <div className="flex justify-center">
            <div className="w-[72px] h-[72px] bg-orange-100 rounded-md relative">
              <Image
                src="/icons/api 1.svg"
                alt="merge 1"
                width={30}
                height={30}
                className="left-[21px] top-[21px] absolute"
              />
            </div>
          </div>
          <div className="w-[237px] text-center text-neutral-900 text-2xl font-medium pt-7">
            API
          </div>
          <div className="w-[237px] text-center text-neutral-900 text-sm font-normal leading-normal pt-4">
            Embed AllyBy AI’s power directly into your products
          </div>
        </div>
        <div className="w-[240px] h-[224px]">
          <div className="flex justify-center">
            <div className="w-[72px] h-[72px] bg-orange-100 rounded-md relative">
              <Image
                src="/icons/idea 1.svg"
                alt="merge 1"
                width={30}
                height={30}
                className="left-[21px] top-[21px] absolute"
              />
            </div>
          </div>
          <div className="w-[237px] text-center text-neutral-900 text-2xl font-medium pt-7">
            More than just a chatbot
          </div>
          <div className="w-[237px] text-center text-neutral-900 text-sm font-normal leading-normal pt-4">
            Pre-made building blocks for creating your own unique experiences of
            the world
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
