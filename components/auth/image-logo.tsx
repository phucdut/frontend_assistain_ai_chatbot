import Image from "next/image";
import React from "react";

const ImageLogo = () => {
  return (
    <div className="relative flex-shrink-0 pr-0">
      <Image
        src="/Rectangle 9.png"
        alt="Rectangle9"
        width={897}
        height={805}
      ></Image>
      {/* <div className="absolute top-[30px] left-[30px] flex-shrink-0">
        <Image
          src="/Horizontal 2.png"
          alt="Horizontal 2"
          width={130}
          height={40}
        ></Image>
      </div>
      <div className="absolute top-[30px] left-[69px] flex-shrink-0">
        <Image
          src="/Horizontal 3.png"
          alt="Horizontal 3"
          width={91}
          height={40}
        ></Image>
      </div> */}
    </div>
  );
};

export default ImageLogo;
