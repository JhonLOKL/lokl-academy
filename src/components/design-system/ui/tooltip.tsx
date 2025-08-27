"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    variant?: "default" | "info" | "success" | "warning" | "error";
    size?: "sm" | "md" | "lg";
    withArrow?: boolean;
  }
>(({ className, variant = "default", size = "md", withArrow = true, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      size === "sm" && "px-2 py-1 text-xs",
      size === "lg" && "px-4 py-2",
      variant === "default" && "bg-[#0F0F0F] text-white",
      variant === "info" && "bg-blue-600 text-white",
      variant === "success" && "bg-green-600 text-white",
      variant === "warning" && "bg-yellow-600 text-white",
      variant === "error" && "bg-red-600 text-white",
      className
    )}
    {...props}
  >
    {props.children}
    {withArrow && (
      <TooltipPrimitive.Arrow 
        className={cn(
          "fill-current",
          variant === "default" && "fill-[#0F0F0F]",
          variant === "info" && "fill-blue-600",
          variant === "success" && "fill-green-600",
          variant === "warning" && "fill-yellow-600",
          variant === "error" && "fill-red-600"
        )}
        width={10} 
        height={5} 
      />
    )}
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Componente de tooltip avanzado con título, descripción e icono
interface InfoTooltipProps {
  trigger: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "default" | "info" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  className?: string;
}

const InfoTooltip = ({
  trigger,
  title,
  description,
  icon,
  variant = "default",
  size = "md",
  withArrow = true,
  side = "top",
  align = "center",
  delayDuration = 300,
  className,
}: InfoTooltipProps) => {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent 
        variant={variant} 
        size={size} 
        withArrow={withArrow} 
        side={side} 
        align={align}
        className={cn("max-w-xs", className)}
      >
        <div className="flex items-start gap-2">
          {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
          <div>
            {title && <div className="font-medium">{title}</div>}
            {description && <div className="opacity-90">{description}</div>}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, InfoTooltip };

