import * as React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, children, label, htmlFor, required = false, error = false, helperText, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <div className="flex items-center justify-between">
          <label
            htmlFor={htmlFor}
            className="text-sm font-medium text-[#0F0F0F]"
          >
            {label}
            {required && <span className="ml-1 text-[#FF3B30]">*</span>}
          </label>
        </div>
        {children}
        {helperText && (
          <p className={cn(
            "text-xs",
            error ? "text-[#FF3B30]" : "text-[#6D6C6C]"
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";

export { FormField };
