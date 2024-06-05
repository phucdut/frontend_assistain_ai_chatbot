'use client';

import React, { useRef } from "react";
import { Section1, Section2, Section3 } from "@/components/landing";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";

const PageHome: React.FC = () => {
  const section2Ref = useRef<HTMLDivElement>(null);

  const scrollToSection2 = () => {
    section2Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overflow-y-hidden">
      <Header onLinkClick={scrollToSection2} />
      <div className="w-full pt-[100px] justify-center overflow-y-auto custom-scroll">
        <Section1 />
        <div ref={section2Ref}>
          <Section2 />
        </div>
        <Section3 />
        <Footer />
      </div>
    </div>
  );
};

export default PageHome;
