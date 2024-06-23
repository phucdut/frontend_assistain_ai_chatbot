"use client";
import React from "react";
import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Footer from "./footer";
import LiveDemo from "./live-demo";

const UnderForm = () => {
  return (
    <div>
      <div className="h-full justify-center overflow-y-auto custom-scroll">
        <Section1 />
        <div>
          <LiveDemo />
        </div>
        <Section3 />
        <Footer />
      </div>
    </div>
  );
};

export default UnderForm;
