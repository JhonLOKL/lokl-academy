"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[#F5F5F5]">
      <SliderPrimitive.Range className="absolute h-full bg-[#5352F6]" />
    </SliderPrimitive.Track>
    {props.defaultValue?.map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-5 w-5 rounded-full border-2 border-[#5352F6] bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5352F6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

interface RangeSliderProps extends React.ComponentPropsWithoutRef<typeof Slider> {
  label?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  showValue?: boolean;
  minLabel?: string;
  maxLabel?: string;
}

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof Slider>,
  RangeSliderProps
>(({ 
  label, 
  value, 
  defaultValue, 
  min = 0, 
  max = 100, 
  step = 1, 
  valuePrefix = "", 
  valueSuffix = "", 
  showValue = true,
  minLabel,
  maxLabel,
  className,
  ...props 
}, ref) => {
  // Use controlled value if provided, otherwise use defaultValue
  const displayValue = value || defaultValue;
  
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        {label && <div className="text-sm font-medium">{label}</div>}
        {showValue && displayValue && (
          <div className="text-sm font-medium text-[#5352F6]">
            {Array.isArray(displayValue) && displayValue.length === 2
              ? `${valuePrefix}${displayValue[0]}${valueSuffix} - ${valuePrefix}${displayValue[1]}${valueSuffix}`
              : `${valuePrefix}${displayValue}${valueSuffix}`}
          </div>
        )}
      </div>
      <Slider
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue}
        {...props}
      />
      {(minLabel || maxLabel) && (
        <div className="flex justify-between">
          {minLabel && <div className="text-xs text-[#6D6C6C]">{minLabel}</div>}
          {maxLabel && <div className="text-xs text-[#6D6C6C]">{maxLabel}</div>}
        </div>
      )}
    </div>
  );
});
RangeSlider.displayName = "RangeSlider";

export { Slider, RangeSlider };
