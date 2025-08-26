"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-5 w-5 shrink-0 rounded-md border border-[#D1D1D1] ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5352F6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#5352F6] data-[state=checked]:text-white",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

interface CheckboxItemProps extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  label: string;
  description?: string;
}

const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxItemProps
>(({ id, label, description, className, ...props }, ref) => {
  return (
    <div className={cn("flex items-start space-x-3", className)}>
      <Checkbox id={id} ref={ref} {...props} className="mt-1" />
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
    </div>
  );
});
CheckboxItem.displayName = "CheckboxItem";

export { Checkbox, CheckboxItem };
