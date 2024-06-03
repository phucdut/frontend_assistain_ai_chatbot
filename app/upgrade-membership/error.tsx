"use client";
import Image from "next/image";
import React from "react";

const UpgradeMembershipError = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0">
              <Image
                src="/381599_error_icon.svg"
                alt="Payment Failure"
                width={128}
                height={128}
              ></Image>
            </div>
            <h1 className="text-3xl font-semibold mt-4">Oops!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeMembershipError;
