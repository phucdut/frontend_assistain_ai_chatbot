"use client";

import React, { useRef } from "react";
import { Section1, Section2, Section3 } from "@/components/landing";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";

const LandingForm = () => {
  return (
    <div className="overflow-y-hidden">
      <Header />
      <div className="w-full pt-[100px] justify-center overflow-y-auto custom-scroll">
        <Section1 />
        <div>
          <Section2 />
        </div>
        <Section3 />
        <Footer />
      </div>
    </div>
  );
};

export default LandingForm;
