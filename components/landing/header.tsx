"use client";
import React from "react";
import Image from "next/image";
import BuildButton from "@/components/ui/build-button";
import LgButton from "../ui/lg-button";
import { SignInButton } from "../auth/sign-in/sign-in-button";
import { SignUpButton } from "../auth/sign-up/sign-up-button";

const menuLinks = [
  { name: "Live demo", href: "#live-demo" },
  { name: "Features", href: "#" },
  { name: "Case Studies", href: "#" },
  { name: "FAQ", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Affiliate", href: "#" },
  { name: "Contact", href: "#" },
];

interface HeaderProps {
  onLinkClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLinkClick }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-white">
      <div className="flex items-center justify-center">
        <div className="pt-[30px] flex items-center justify-center gap-2">
          <Image
            src="/logo/2.png"
            alt="Horizontal"
            width={80}
            height={80}
            className="rounded-full"
          />
          <h1 className="text-[37px] font-semibold leading-[26px] uppercase pr-[58px] w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">
            ALLYBY AI
          </h1>
        </div>
        <ul className="flex items-center justify-between gap-9 pt-[38px] font-normal leading-normal text-[14px]">
          {menuLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => {
                  if (link.name === "Live demo") {
                    e.preventDefault();
                    onLinkClick();
                  }
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-4 pt-[38px] pl-[65px] text-[14px] font-medium leading-[24px]">
          <SignInButton>
            <LgButton className="text-[#161616] max-w-[68px]">Login</LgButton>
          </SignInButton>
          <SignUpButton>
            <BuildButton className="p-[8px] px-[15px] max-w-[173px]">
              Build a Brain for free
            </BuildButton>
          </SignUpButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
