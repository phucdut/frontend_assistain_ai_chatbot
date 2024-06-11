"use client";

import Image from "next/image";
import BuildButton from "@/components/ui/build-button";
import LgButton from "../ui/lg-button";
import { SignInButton } from "../auth/sign-in/sign-in-button";
import { SignUpButton } from "../auth/sign-up/sign-up-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useState } from "react";
import { Section1, Section2, Section3 } from "@/components/landing";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import UnderForm from "./under-form";
import UpgradeMembershipLandingForm from "./upgrade-membership/upgrade-mebership-form";

const LandingForm = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className="overflow-y-hidden">
      <header className="w-full bg-white flex items-center justify-center">
        <div className="flex items-center justify-center gap-32 max-w-[1440px] h-[60px] pt-[40px]">
          <div className="w-[400px] flex items-center justify-center gap-2">
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
          <Tabs defaultValue="">
            <TabsList className="grid w-[300px] grid-cols-3">
              <TabsTrigger
                value="liveDemo"
                className="text-[#161616]"
                onClick={() => setActiveTab("liveDemo")}
              >
                Live Demo
              </TabsTrigger>
              <TabsTrigger
                value="pricing"
                className="text-[#161616]"
                onClick={() => setActiveTab("pricing")}
              >
                Pricing
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="text-[#161616]"
                onClick={() => setActiveTab("contact")}
              >
                Contact
              </TabsTrigger>
            </TabsList>
            <TabsContent value="liveDemo" className="">
              {activeTab === "liveDemo"}
            </TabsContent>
            <TabsContent value="pricing">{activeTab === "pricing"}</TabsContent>
            <TabsContent value="contact">{activeTab === "contact"}</TabsContent>
          </Tabs>
          <div className="w-[400px] flex items-center justify-center gap-4 pl-[65px] text-[14px] font-medium leading-[24px]">
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
      <div className="pt-[20px] justify-center overflow-y-hidden custom-scroll">
        {activeTab === null && <UnderForm />}
        {activeTab === "liveDemo" && <Section2 />}
        {activeTab === "pricing" && <UpgradeMembershipLandingForm />}
        {activeTab === "contact" && <Footer />}
      </div>
    </div>
  );
};

export default LandingForm;
