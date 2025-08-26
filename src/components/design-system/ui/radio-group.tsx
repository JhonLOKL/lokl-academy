"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-5 w-5 rounded-full border border-[#D1D1D1] text-[#5352F6] ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5352F6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3 w-3 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

interface RadioItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupItem> {
  label: string;
  description?: string;
}

const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupItem>,
  RadioItemProps
>(({ id, label, description, className, ...props }, ref) => {
  return (
    <div className={cn("flex items-start space-x-3", className)}>
      <RadioGroupItem id={id} ref={ref} {...props} className="mt-1" />
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
RadioItem.displayName = "RadioItem";

export { RadioGroup, RadioGroupItem, RadioItem };
