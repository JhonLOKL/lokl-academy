"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5352F6] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#5352F6] data-[state=unchecked]:bg-[#D1D1D1]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

interface SwitchItemProps extends React.ComponentPropsWithoutRef<typeof Switch> {
  label: string;
  description?: string;
}

const SwitchItem = React.forwardRef<
  React.ElementRef<typeof Switch>,
  SwitchItemProps
>(({ id, label, description, className, ...props }, ref) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div>
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none text-[#0F0F0F] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-[#6D6C6C] mt-1">{description}</p>
        )}
      </div>
      <Switch id={id} ref={ref} {...props} />
    </div>
  );
});
SwitchItem.displayName = "SwitchItem";

export { Switch, SwitchItem };
