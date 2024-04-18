import Image from "next/image";
import "@/app/globals.css";
import Link from "next/link";
import BuildButton from "@/components/ui/build-button";
import LgButton from "../ui/lg-button";
import { LoginButton } from "../auth/sign-in/sign-in-button";
import { SignUpButton } from "../auth/sign-up/sign-up-button";

const menuLinks = [
  "Live demo",
  "Features",
  "Case Studies",
  "FAQ",
  "Pricing",
  "Affiliate",
  "Contact",
];

const Header = () => {
  return (
    <header className="mb-10">
      <div className=" flex items-center justify-between ">
        <div className="pt-[30px] pl-[100px] flex-shrink-0">
          <Image
            src="/Horizontal1.png"
            alt="Horizontal"
            width={130}
            height={40}
          ></Image>
        </div>
        <ul className=" flex items-center justify-between gap-9 pt-[38px] font-normal leading-normal text-[14px]">
          {menuLinks.map((link) => (
            <li key={link}>
              <Link href={"#"}>{link}</Link>
            </li>
          ))}
        </ul>
        <div
          className=" flex items-center justify-between gap-4 
          pt-[38px] pr-[65px] text-[14px]
          font-medium leading-[24px] "
        >
          <LoginButton>
            <LgButton className="text-[#161616] max-w-[68px]">Login</LgButton>
          </LoginButton>
          <SignUpButton>
            <BuildButton className="p-[8px] px-[15px]  max-w-[173px] ">
              Build a Brain for free
            </BuildButton>
          </SignUpButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
