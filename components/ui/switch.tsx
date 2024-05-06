"use client";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type IndicatorProps = {
  checked: boolean;
  children: React.ReactNode;
};

const Indicator = ({ checked, children }: IndicatorProps) => (
  <div className={checked ? "indicator-checked" : "indicator-unchecked"}>
    {children}
  </div>
);

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
    const { setTheme } = useTheme();
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setTheme(checked ? "dark" : "light");
  }, [checked, setTheme]);


  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-8 w-[76px] shrink-0 cursor-pointer items-center rounded-full border-2 border-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-170 data-[state=unchecked]:bg-input",
        className
      )}
      checked={checked}
      onCheckedChange={setChecked}
      {...props}
      ref={ref}
    >
      <Indicator checked={checked || false}>
        {checked ? (
          <div className="flex items-center justify-start">
            <SwitchPrimitives.Thumb
              className={cn(
                "pointer-events-none block h-7 w-7 rounded-full bg-black shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-0  data-[state=unchecked]:translate-x-0"
              )}
            >
              <div className="flex items-center justify-center w-full h-full">
                <Moon className="w-4 h-4 text-primary" />
              </div>
            </SwitchPrimitives.Thumb>
            <span className="text-center text-gray-400 text-[13px] font-normal leading-snug pl-1">
              Night
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-start">
            <span className="text-left text-gray-950 text-[13px] font-normal leading-snug pl-2">
              Light
            </span>
            <div className="flex items-center justify-center">
              <SwitchPrimitives.Thumb
                className={cn(
                  "pointer-events-none block h-7 w-7 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-11 data-[state=unchecked]:translate-x-1.5"
                )}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <Sun className="w-4 h-4 text-primary" />
                </div>
              </SwitchPrimitives.Thumb>
            </div>
          </div>
        )}
      </Indicator>
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
