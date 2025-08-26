"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InfoCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "light" | "dark" | "accent";
  tag?: string;
  highlight?: React.ReactNode;
  align?: "left" | "center" | "right";
}

export function InfoCard({
  className,
  title,
  subtitle,
  description,
  variant = "light",
  tag,
  highlight,
  align = "left",
  children,
  ...props
}: InfoCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-lg p-8",
        {
          "bg-white text-[#0F0F0F]": variant === "light",
          "bg-[#0F0F0F] text-white": variant === "dark",
          "bg-[#5352F6] text-white": variant === "accent",
        },
        {
          "text-left": align === "left",
          "items-center text-center": align === "center",
          "text-right": align === "right",
        },
        className
      )}
      {...props}
    >
      {tag && (
        <div className={cn(
          "mb-6 text-sm font-medium uppercase tracking-wider",
          {
            "text-[#5352F6]": variant === "light",
            "text-white/80": variant === "dark" || variant === "accent",
          }
        )}>
          {tag}
        </div>
      )}
      
      <div className="mb-6">
        {title && (
          <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
            {title}
            {highlight && (
              <span className={cn(
                "block",
                {
                  "text-[#5352F6]": variant === "light" || variant === "dark",
                  "text-white": variant === "accent",
                }
              )}>
                {highlight}
              </span>
            )}
          </h2>
        )}
        
        {subtitle && (
          <p className={cn(
            "text-lg font-medium",
            {
              "text-[#0F0F0F]/80": variant === "light",
              "text-white/80": variant === "dark" || variant === "accent",
            }
          )}>
            {subtitle}
          </p>
        )}
      </div>
      
      {description && (
        <div className={cn(
          "max-w-2xl text-base",
          {
            "text-[#6D6C6C]": variant === "light",
            "text-white/70": variant === "dark" || variant === "accent",
          }
        )}>
          {description}
        </div>
      )}
      
      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  );
}

export interface InfoCardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "split";
}

export function InfoCardGroup({
  className,
  children,
  variant = "default",
  ...props
}: InfoCardGroupProps) {
  return (
    <div
      className={cn(
        {
          "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2": variant === "default",
          "grid grid-cols-1 md:grid-cols-2": variant === "split",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
