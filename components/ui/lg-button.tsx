import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import "@/app/globals.css";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;
function LgButton({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={twMerge(
          "btn-lg-container",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default LgButton;
