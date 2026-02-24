import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: boolean;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, suffix, error, helperText, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6C6C]">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-[#D1D1D1] bg-white px-3 py-2 text-sm text-[#0F0F0F] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#919090] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5352F6] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-10",
            suffix && "pr-10",
            error && "border-[#FF3B30] focus-visible:ring-[#FF3B30]",
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6D6C6C]">
            {suffix}
          </div>
        )}
        {helperText && (
          <p className={cn(
            "mt-1 text-xs",
            error ? "text-[#FF3B30]" : "text-[#6D6C6C]"
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
