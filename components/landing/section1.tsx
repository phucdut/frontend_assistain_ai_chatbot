"use client";
import Image from "next/image";
import Link from "next/link";
import "@/app/globals.css";
import BuildButton from "../ui/build-button";
import { SignUpButton } from "../auth/sign-up/sign-up-button";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Section1 = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true }, // Thêm loop và dragFree
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("init", () => {
        console.log("Carousel initialized");
      });

      return () => emblaApi.destroy();
    }
  }, [emblaApi]);

  const images = [
    {
      href: "/",
      src: "/z4755566056940_97f95a2da4aa31658321547b547bc18d-transformed 1.png",
      alt: "AVOCA AI",
      width: 168.067,
      height: 54,
      pt: 40,
    },
    {
      href: "/",
      src: "/image 19.png",
      alt: "DAT.BIKE",
      width: 154,
      height: 44.139,
      pt: 45,
    },
    {
      href: "/",
      src: "/image 18.png",
      alt: "SWIN BUR",
      width: 100,
      height: 50,
      pt: 42,
    },
    {
      href: "/",
      src: "/image 127.png",
      alt: "TEKUP",
      width: 154,
      height: 39.742,
      pt: 47,
    },
    {
      href: "/",
      src: "/image 20.png",
      alt: "SELLY",
      width: 115.116,
      height: 50,
      pt: 42,
    },
    {
      href: "/",
      src: "/image 128.png",
      alt: "SONCHAN",
      width: 122.656,
      height: 50,
      pt: 42,
    },
  ];

  useEffect(() => {
    // Thêm script không đồng bộ vào khi component được tạo
    const script = document.createElement("script");
    script.src = "http://localhost:3000/bubble-embed.js";
    script.async = true; // Đặt script là không đồng bộ
    document.body.appendChild(script);

    // Xóa script khi component bị hủy
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="hero">
      <div className="flex justify-center gap-16 pt-[100px]">
        <div className="">
          <div className="max-w-[492px]">
            <h1 className="text-[55px] font-semibold leading-[127.273%]">
              Build your own AI assistant in minutes
            </h1>
          </div>
          <div className="pt-[24px] font-normal text-[14px]">
            <p>
              Easy to build, train and publish your AI Assistant without coding.
            </p>
          </div>
          <div className="flex items-center justify-between pt-[24px] text-[14px] leading-[24px]">
            <SignUpButton>
              <BuildButton className="p-[12px] px-[15px] max-w-[111px] font-medium">
                Get Started
              </BuildButton>
            </SignUpButton>
            <p className="pl-[34px] pr-[348px] font-normal">
              No credit cards required
            </p>
          </div>
          <div className="pt-[41px]">
            <Image
              src="/Rectangle50.svg"
              alt="Rectangle"
              width={452}
              height={339}
            ></Image>
          </div>
        </div>
        <div>
          <Image
            src="/Rectangle49.svg"
            alt="Rectangle"
            width={491}
            height={557}
            className="flex"
          ></Image>
        </div>
      </div>
      <div className="contain-layout-responsive">
        <div className="text-center font-medium pt-[160px] leading-[36px] text-[24px] flex justify-center items-center">
          Trusted by forward-thinking pioneers
        </div>
        <div className="flex justify-center items-center pb-[111.18px]">
          <div className="overflow-x-hidden  pt-10 w-[900px]" ref={emblaRef}>
            <div className="flex space-x-10 pr-10">
              {" "}
              {/* thêm space-x-5 để tạo khoảng cách giữa các ảnh */}
              {images.map((image, index) => (
                <div
                  className="relative min-w-0  flex-shrink-0 p-2"
                  key={index}
                >
                  <Link
                    href={image.href}
                    className={`pt-${image.pt} flex-shrink-0`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
