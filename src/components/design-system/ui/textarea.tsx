import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-[#D1D1D1] bg-white px-3 py-2 text-sm text-[#0F0F0F] transition-colors placeholder:text-[#919090] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5352F6] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[#FF3B30] focus-visible:ring-[#FF3B30]",
            className
          )}
          ref={ref}
          {...props}
        />
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
Textarea.displayName = "Textarea";

export { Textarea };
