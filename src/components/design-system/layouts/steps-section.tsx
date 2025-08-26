import React from "react";
import { cn } from "@/lib/utils";

export interface StepsSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  variant?: "default" | "dark" | "purple" | "gray";
  centered?: boolean;
  children: React.ReactNode;
}

export function StepsSection({
  className,
  title,
  subtitle,
  variant = "default",
  centered = true,
  children,
  ...props
}: StepsSectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-20",
        {
          "bg-black text-white": variant === "dark",
          "bg-[#5352F6] text-white": variant === "purple",
          "bg-[#F5F5F5]": variant === "gray",
        },
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className={cn("max-w-3xl mb-12", centered && "mx-auto text-center")}>
          <h2 className="text-3xl font-bold md:text-4xl mb-4">{title}</h2>
          {subtitle && <p className="text-lg opacity-90">{subtitle}</p>}
        </div>
        
        <div className="mt-12">
          {children}
        </div>
      </div>
    </section>
  );
}

export interface StepsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  layout?: "horizontal" | "vertical";
}

export function StepsContainer({
  className,
  children,
  layout = "horizontal",
  ...props
}: StepsContainerProps) {
  return (
    <div
      className={cn(
        {
          "flex flex-col md:flex-row justify-between gap-8": layout === "horizontal",
          "flex flex-col gap-12": layout === "vertical",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface StepItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  number?: number;
  title: string;
  description?: string;
}

export function StepItem({
  className,
  icon,
  number,
  title,
  description,
  children,
  ...props
}: StepItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center",
        className
      )}
      {...props}
    >
      {(icon || number !== undefined) && (
        <div className="w-16 h-16 rounded-full bg-[#5352F6] text-white flex items-center justify-center mb-6 text-xl font-bold">
          {icon || number}
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      
      {description && (
        <p className="text-[#6D6C6C] dark:text-[#D1D1D1]">{description}</p>
      )}
      
      {children}
    </div>
  );
}
