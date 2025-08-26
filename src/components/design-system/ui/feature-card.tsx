"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface FeatureCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  ctaText?: string;
  ctaAction?: () => void;
  variant?: "default" | "bordered" | "subtle";
  align?: "left" | "center";
}

export function FeatureCard({
  className,
  title,
  subtitle,
  description,
  ctaText,
  ctaAction,
  variant = "default",
  align = "left",
  children,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col",
        {
          "rounded-md border border-[#E5E5E5] bg-white p-6 shadow-sm": variant === "default",
          "rounded-md border border-[#E5E5E5] bg-white p-6": variant === "bordered",
          "bg-transparent p-6": variant === "subtle",
        },
        align === "center" && "items-center text-center",
        className
      )}
      {...props}
    >
      {subtitle && (
        <div className={cn(
          "mb-2 text-sm font-medium text-[#5352F6]"
        )}>
          {subtitle}
        </div>
      )}
      
      <h3 
        className={cn(
          "mb-3 text-2xl font-bold tracking-tight text-[#0F0F0F]"
        )}
      >
        {title}
      </h3>
      
      {description && (
        <p 
          className={cn(
            "mb-6 text-[#6D6C6C]",
            align === "center" ? "text-center" : "text-left"
          )}
        >
          {description}
        </p>
      )}
      
      {children}
      
      {ctaText && (
        <div className={cn("mt-auto", align === "center" && "text-center")}>
          <Button 
            onClick={ctaAction}
            variant="primary"
            className="mt-4"
          >
            {ctaText}
          </Button>
        </div>
      )}
    </div>
  );
}

export function FeatureCardGrid({
  className,
  children,
  columns = 3,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  columns?: 1 | 2 | 3 | 4;
}) {
  return (
    <div
      className={cn(
        "grid gap-6",
        {
          "grid-cols-1": columns === 1,
          "grid-cols-1 md:grid-cols-2": columns === 2,
          "grid-cols-1 md:grid-cols-3": columns === 3,
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4": columns === 4,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
