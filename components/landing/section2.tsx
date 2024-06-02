import Image from "next/image";
import "@/app/globals.css";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ShareChatbot from "../admin/chatbots/share-chatbot/share-chat";

const Section2 = () => {
  return (
    <div>
      <div className="flex contain-layout-responsive relative">
        <div className="flex text-center pt-[148.56px] pl-[218.65px] text-[14px] font-normal ">
          <div className="relative layout-text-container    leading-9">
            Going beyond just a chatbot
            <p className="absolute top-[27.5px] left-[109.93px]  rectangle12"></p>
          </div>
        </div>
        <div className="top-[200px] left-[340px] flex-shrink-0 absolute">
          <Image src="/image 5.png" alt="..." width={78} height={111}></Image>
        </div>
        <div>
          <div className="font-medium pt-[111.18px] pl-[100.32px] leading-[24px] text-[16px] flex justify-center">
            <p className="demo">LIVE DEMO</p>
          </div>
          <div className="w-full font-medium py-[26px] pl-[100.32px] leading-[36px] text-[24px] flex justify-center items-center">
            <div>This assistant was created in minutes with AllyAI</div>
          </div>
          <div className="flex justify-center pl-[100.32px]">
            <div className="w-[434px] h-[52px] bg-neutral-100 rounded-[100px] flex justify-center items-center gap-10">
              <div className="w-[114px] h-9 px-6 py-1.5 bg-white rounded-[100px] shadow justify-center items-center gap-2.5 inline-flex">
                <div className="text-center text-neutral-900 text-sm font-semibold leading-normal">
                  Ally FAQ
                </div>
              </div>
              <div className="text-center text-neutral-900 text-sm font-semibold leading-normal">
                Customer Support
              </div>
              <div className="text-center text-neutral-900 text-sm font-semibold leading-normal">
                Life Coach
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center pt-10">
        <div className="w-[1140px] h-[551px] bg-white rounded-xl shadow">
          {/* <div className="w-[1140px] h-[400px]">
            <div className="flex justify-start items-center w-[594px] h-[56px] bg-custom-color rounded-xl shadow pl-5 ">
              <div className="text-neutral-900 text-base font-normal leading-9">
                👋 Can I tell you more about AllyAI? Have you used any AI tools
                before?
              </div>
            </div>
            <div className="opacity-50 text-neutral-900 text-[13px] font-normal leading-[18px] pl-5 pt-1 pb-7">
              Today, 20:20
            </div>
            <div className="flex justify-start items-center w-[704px] h-[56px] bg-custom-color rounded-xl shadow pl-5 ">
              <div className="text-neutral-900 text-base font-normal leading-9">
                <div className="text-neutral-900 text-base font-normal leading-9">
                  Let&apos;s build your own AI in AllyAI, together! I&apos;ll be
                  here to help you every step of the way
                </div>
              </div>
            </div>
            <div className="opacity-50 text-neutral-900 text-[13px] font-normal leading-[18px] pl-5 pt-1">
              Today, 20:20
            </div>
          </div>
          <div className="flex justify-start items-center gap-10 pb-3">
            <div className="w-[211px] h-9 px-[15px] py-1.5 bg-orange-100 rounded-xl justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-neutral-900 text-sm font-medium leading-normal">
                What is your goal with AI?
              </div>
            </div>
            <div className="w-[190px] h-9 px-[15px] py-1.5 bg-orange-100 rounded-xl justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-neutral-900 text-sm font-medium leading-normal">
                Who is your audience?
              </div>
            </div>
          </div>
          <div className="relative">
            <Input
              placeholder="Write your message"
              className="inputChat relative"
            />
            <Button className="absolute inset-y-2 right-5 flex items-center justify-between w-[44px] h-[44px]">
              <Image
                src="/paper-plane 1.svg"
                alt="send"
                width={20}
                height={20}
                className="flex-shrink-0"
              />
            </Button>
          </div> */}
          {/* <iframe
            src="http://localhost:3000/embed/?chatbot_id=1d90c339-fb35-4c1a-9e9e-85451bb18fc8&modeltype=gpt-3.5-turbo&mode=false&logo=ZmFsc2U="
            allow="clipboard-write; *;microphone *"
            width="100%"
            height="950"
            frameBorder="0"
          ></iframe> */}
          <ShareChatbot id={"1d90c339-fb35-4c1a-9e9e-85451bb18fc8"} />
        </div>
      </div>
    </div>
  );
};

export default Section2;
