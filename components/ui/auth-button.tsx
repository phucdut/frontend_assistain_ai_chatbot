import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import "@/app/globals.css";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;
function AuthButton({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "lg",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default AuthButton;
