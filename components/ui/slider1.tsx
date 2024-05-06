"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Slider1 = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, onValueChange, ...props }, ref) => {
  const [sliderValue, setMaxTokenValue] = useState(50);

  const handleMaxTokenValueChange = (values: number[]) => {
    if (values.length === 1) {
      setMaxTokenValue(values[0]);
    } else {
      const averageValue = values.reduce((a, b) => a + b, 0) / values.length;
      setMaxTokenValue(averageValue);
    }
    if (typeof onValueChange === 'function') {
      onValueChange([sliderValue]);
    }
  };

  useEffect(() => {
    console.log(`Slider value has changed to 1: ${sliderValue}`);
  }, [sliderValue]);

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      onValueChange={handleMaxTokenValueChange}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-[2px] w-full grow overflow-hidden rounded-full bg-[#D2D9E8]">
        <SliderPrimitive.Range className="absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-3 w-3 rounded-full border-2 border-primary bg-[#2C2C2C] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <div className="absolute top-[calc(-100% - 8px)] top-3 left-1/5 transform -translate-x-1/2 text-xs">
          {sliderValue}
        </div>
      </SliderPrimitive.Thumb>
      <div className="absolute right-[1px] top-1/2 transform -translate-y-1/2 w-[10px] h-[10px] rounded-full border-2 border-[#D2D9E8] bg-[#fff]" />
      <div className="absolute left-[1px] top-1/2 transform -translate-y-1/2 w-[10px] h-[10px] rounded-full border-2 border-[#D2D9E8] bg-[#fff]" />
      <div className="absolute left-[-4px] bottom-[-6px] transform translate-y-full text-xs">
        10
      </div>
      <div className="absolute right-[-1px] bottom-[-6px] transform translate-y-full text-xs">
        500
      </div>
    </SliderPrimitive.Root>
  );
});
Slider1.displayName = SliderPrimitive.Root.displayName;

export { Slider1 };
