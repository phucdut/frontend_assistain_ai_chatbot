"use client";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import UpgradeMembershipMonthlyForm from "../admin/upgrade-membership/upgrade-membership-monthly-form";
import UpgradeMembershipYearlyForm from "../admin/upgrade-membership/upgrade-membership-yearly-form";

type IndicatorProps = {
  checked: boolean;
  children: React.ReactNode;
};

const Indicator = ({ checked, children }: IndicatorProps) => (
  <div className={checked ? "indicator-checked" : "indicator-unchecked"}>
    {children}
  </div>
);

const SwitchUpgradeMembership = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & { onSwitch?: (checked: boolean) => void }
>(({ className, onSwitch, ...props }, ref) => {
  const [checked, setChecked] = React.useState(true);

  React.useEffect(() => {
    if (onSwitch) {
      onSwitch(checked);
    }
  }, [checked, onSwitch]);

  return (
    <>
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex w-[222px] h-[60px] bg-zinc-800 rounded-xl shrink-0 cursor-pointer items-center border-2 border-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ",
          className
        )}
        checked={checked}
        onCheckedChange={setChecked}
        {...props}
        ref={ref}
      >
        <Indicator checked={checked || false}>
          {checked ? (
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
          ) : (
            <div className="flex items-center justify-start pl-2.5">
              <div className="h-[40px] w-[96px] rounded-sm bg-zinc-800 flex items-center justify-center">
                <div className="text-white text-base font-normal leading-normal">
                  Monthly
                </div>
              </div>
              <div className="flex items-center justify-center">
                <SwitchPrimitives.Thumb
                  className={cn(
                    "pointer-events-none block h-[44px] w-[96px] rounded-lg bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-2 data-[state=unchecked]:translate-x-2"
                  )}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <div className="text-zinc-900 text-base font-normal leading-normal">
                      Yearly
                    </div>
                  </div>
                </SwitchPrimitives.Thumb>
              </div>
            </div>
          )}
        </Indicator>
      </SwitchPrimitives.Root>
    </>
  );
});
SwitchUpgradeMembership.displayName = SwitchPrimitives.Root.displayName;

export { SwitchUpgradeMembership };
