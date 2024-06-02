import Image from "next/image";
import React from "react";

const PositiveForm = () => {
  return (
    <div className="w-full h-full shadow rounded-xl relative">
      <div className="text-zinc-900 text-base font-semibold leading-normal py-5 pl-5">
        % Positive
      </div>
      <div className="absolute right-6 top-6">
        <Image
          src="/icons/OL - Fullscreen.svg"
          alt="x"
          width={14.5}
          height={14.5}
          className=" transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
        />
      </div>
      <div className="">
        <div></div>
      </div>
    </div>
  );
};

export default PositiveForm;
