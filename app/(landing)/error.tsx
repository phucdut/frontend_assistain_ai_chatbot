// pages/_error.tsx
'use client';
import React from "react";
import { NextPageContext } from "next";
import Link from "next/link";
import Image from "next/image";

const lanDingError = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center">
            <Image
              src="/images/error.png" // Đường dẫn đến hình ảnh lỗi (nếu có)
              alt="Error Image"
              width={150}
              height={150}
            />
            <h1 className="text-3xl font-semibold mt-4">Oops!</h1>
            {/* <p className="text-gray-600 mt-2">
              {statusCode
                ? `An error ${statusCode} occurred on server`
                : "An error occurred on client"}
            </p> */}
            <Link href="/">
              <a className="mt-4 text-blue-500 hover:underline">
                Go back landing
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default lanDingError;
