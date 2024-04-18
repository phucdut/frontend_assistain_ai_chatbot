import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import "@/app/globals.css";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;
function BuildButton({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "btn-container",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default BuildButton;
