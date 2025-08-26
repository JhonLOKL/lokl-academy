"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BenefitCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  iconBackground?: "purple" | "light-purple" | "white" | "transparent";
  variant?: "default" | "simple" | "compact";
  highlight?: boolean;
}

export function BenefitCard({
  className,
  title,
  subtitle,
  description,
  icon,
  iconBackground = "light-purple",
  variant = "default",
  highlight = false,
  children,
  ...props
}: BenefitCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-lg p-6",
        {
          "border border-[#E5E5E5] bg-white": variant === "default",
          "bg-transparent": variant === "simple",
          "border border-[#E5E5E5] bg-white p-4": variant === "compact",
        },
        highlight && "border-[#5352F6]",
        className
      )}
      {...props}
    >
      {icon && (
        <div className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-lg",
          {
            "bg-[#5352F6] text-white": iconBackground === "purple",
            "bg-[#EEEEFE] text-[#5352F6]": iconBackground === "light-purple",
            "bg-white text-[#5352F6] shadow-sm": iconBackground === "white",
            "bg-transparent text-[#5352F6]": iconBackground === "transparent",
          }
        )}>
          {icon}
        </div>
      )}
      
      {subtitle && (
        <div className="mb-1 text-sm font-medium text-[#5352F6]">
          {subtitle}
        </div>
      )}
      
      <h3 className={cn(
        "mb-2 font-bold tracking-tight",
        {
          "text-xl": variant === "default",
          "text-lg": variant === "simple" || variant === "compact",
        }
      )}>
        {title}
      </h3>
      
      {description && (
        <p className={cn(
          "text-[#6D6C6C]",
          {
            "text-base": variant === "default",
            "text-sm": variant === "simple" || variant === "compact",
          }
        )}>
          {description}
        </p>
      )}
      
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}

export interface BenefitCardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

export function BenefitCardGroup({
  className,
  children,
  columns = 3,
  ...props
}: BenefitCardGroupProps) {
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
