import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

type IndicatorProps = {
  value: number;
  children: React.ReactNode;
};

const Indicator = ({ value, children }: IndicatorProps) => (
  <div className={`indicator-${value}`}>{children}</div>
);

const SwitchDashboard = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    onSwitch?: (value: number) => void;
  }
>(({ className, onSwitch, ...props }, ref) => {
  const [value, setValue] = React.useState(1);

  const handleSwitch = () => {
    const newValue = value < 3 ? value + 1 : 1;
    setValue(newValue);
    if (onSwitch) {
      onSwitch(newValue);
    }
  };

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex w-[222px] h-[60px] bg-zinc-800 rounded-xl shrink-0 cursor-pointer items-center border-2 border-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ",
        className
      )}
      onClick={handleSwitch}
      ref={ref}
      {...props}
    >
      <Indicator value={value}>
        {value === 1 ? (
          <div className="flex items-center justify-start gap-5">
            <SwitchPrimitives.Thumb
              className={cn(
                "pointer-events-none block h-[44px] w-[96px] rounded-lg bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-2.5 data-[state=unchecked]:translate-x-2.5"
              )}
            >
              <div className="flex items-center justify-center w-full h-full">
                <div className="text-zinc-900 text-base font-normal leading-normal">
                  Monthly
                </div>
              </div>
            </SwitchPrimitives.Thumb>
            <div className="h-[40px] w-[96px] rounded-sm bg-zinc-800 flex items-center justify-center">
              <div className="text-white text-base font-normal leading-normal">
                Yearly
              </div>
            </div>
          </div>
        ) : value === 2 ? (
          <div className="flex items-center justify-start gap-5">
            <SwitchPrimitives.Thumb
              className={cn(
                "pointer-events-none block h-[44px] w-[96px] rounded-lg bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-2.5 data-[state=unchecked]:translate-x-2.5"
              )}
            >
              <div className="flex items-center justify-center w-full h-full">
                <div className="text-zinc-900 text-base font-normal leading-normal">
                  Monthly
                </div>
              </div>
            </SwitchPrimitives.Thumb>
            <div className="h-[40px] w-[96px] rounded-sm bg-zinc-800 flex items-center justify-center">
              <div className="text-white text-base font-normal leading-normal">
                Yearly1
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-start gap-5">
            <SwitchPrimitives.Thumb
              className={cn(
                "pointer-events-none block h-[44px] w-[96px] rounded-lg bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-2.5 data-[state=unchecked]:translate-x-2.5"
              )}
            >
              <div className="flex items-center justify-center w-full h-full">
                <div className="text-zinc-900 text-base font-normal leading-normal">
                  Monthly
                </div>
              </div>
            </SwitchPrimitives.Thumb>
            <div className="h-[40px] w-[96px] rounded-sm bg-zinc-800 flex items-center justify-center">
              <div className="text-white text-base font-normal leading-normal">
                Yearly2
              </div>
            </div>
          </div>
        )}
      </Indicator>
    </SwitchPrimitives.Root>
  );
});
SwitchDashboard.displayName = SwitchPrimitives.Root.displayName;

export { SwitchDashboard };
