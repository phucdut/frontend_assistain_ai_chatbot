import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProfileProps = {
  account_id: string;
  membership_id: string;
  plan_price: number;
};

// Hàm để sinh số nguyên ngẫu nhiên trong một khoảng
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min); // Làm tròn lên để đảm bảo số nguyên nhỏ nhất là min
  max = Math.floor(max); // Làm tròn xuống để đảm bảo số nguyên lớn nhất là max
  return Math.floor(Math.random() * (max - min + 1)) + min; // Sinh số nguyên ngẫu nhiên
}

const UpgradeMembershipEntryMonthly: React.FC<ProfileProps> = ({
  account_id,
  membership_id,
  plan_price,
}) => {
  const randomNumber = getRandomInt(0, 9999);
  return (
    <div>
      {/* <div>{ account_id}{membership_id}</div> */}
      <div className="w-full h-[614px] bg-white rounded-xl border border-slate-300">
        <div className="w-full h-[184px] bg-zinc-900 rounded-xl border border-slate-300 pl-6 py-6">
          <div className="text-white text-sm font-bold  uppercase leading-snug">
            Entry
          </div>
          <div className="relative pt-1 pb-4">
            <span className="text-white text-4xl font-bold font-['Oswald'] leading-[50px]">
              $30
            </span>
            <div className="text-white text-sm font-normal leading-tight absolute inset-y-7 inset-x-14">
              per month
            </div>
          </div>
          <Link
            href={`http://localhost:8000/api/v1/payment/payment?vnp_Amount=76372500&vnp_TxnRef=${randomNumber}&vnp_OrderInfo=user_id=${account_id} subscription_plan_id=${membership_id}`}
          >
            <div className="w-[273px] h-11 px-[15px] py-3 bg-white rounded-xl justify-center items-center gap-1.5 inline-flex">
              <div className="text-zinc-900 text-sm font-semibold leading-tight">
                1 month free trial
              </div>
            </div>
          </Link>
        </div>
        <div className="pl-6 pt-7">
          <div className="flex justify-start items-center gap-2 ">
            <Check className="w-3 h-3" />
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              GPT-4 LLM
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 pt-4">
            <Check className="w-3 h-3" />
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              2,000 message credits
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 pt-4">
            <Check className="w-3 h-3" />
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight">
              3 chatbot
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 pt-4 pb-6">
            <Check className="w-3 h-3" />
            <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight ">
              800,000 characters per chatbot
            </div>
          </div>
        </div>
        <div className="w-[321px] h-[268px] bg-orange-100 rounded-xl border border-slate-300">
          <div className="pt-6 pl-6">
            <Image src="/Group (3).svg" alt="x" width={24} height={22} />
            <div className="text-zinc-800 text-sm font-semibold leading-snug pt-2 pb-3">
              Everything in Free, plus
            </div>
            <div className="flex justify-start items-center gap-2">
              <Check className="w-3 h-3" />
              <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight ">
                Upload websites
              </div>
            </div>
            <div className="flex justify-start items-center gap-2 pt-4">
              <Check className="w-3 h-3" />
              <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight ">
                Voice to text
              </div>
            </div>
            <div className="flex justify-start items-center gap-2 pt-4">
              <Check className="w-3 h-3" />
              <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight ">
                Save conversations
              </div>
            </div>
            <div className="flex justify-start items-center gap-2 pt-4">
              <Check className="w-3 h-3" />
              <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight ">
                Share conversations
              </div>
            </div>
            <div className="flex justify-start items-center gap-2 pt-4">
              <Check className="w-3 h-3" />
              <div className="w-[253px] text-zinc-800 text-[13px] font-normal leading-tight ">
                Edit knowledge base
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeMembershipEntryMonthly;
