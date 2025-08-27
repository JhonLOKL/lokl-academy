"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface ProgramCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  ctaText?: string;
  ctaAction?: () => void;
  benefits?: {
    icon?: React.ReactNode;
    text: string;
  }[];
  stats?: {
    value: string;
    label: string;
  }[];
  hashtag?: string;
}

export function ProgramCard({
  className,
  title,
  subtitle,
  description,
  ctaText,
  ctaAction,
  benefits,
  stats,
  hashtag,
  children,
  ...props
}: ProgramCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-[#5352F6] p-8 text-white",
        className
      )}
      {...props}
    >
      {hashtag && (
        <div className="mb-6 text-sm font-medium uppercase tracking-wider opacity-80">
          #{hashtag}
        </div>
      )}
      
      <div className="mb-6">
        <h2 className="mb-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {title}
        </h2>
        
        {subtitle && (
          <p className="text-lg font-medium opacity-90">
            {subtitle}
          </p>
        )}
      </div>
      
      {description && (
        <div className="mb-8 max-w-2xl text-base md:text-lg">
          {description}
        </div>
      )}
      
      {benefits && benefits.length > 0 && (
        <div className="mb-8 space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 rounded-lg bg-white/10 p-4">
              {benefit.icon && (
                <div className="flex-shrink-0">
                  {benefit.icon}
                </div>
              )}
              <div className="text-sm font-medium">{benefit.text}</div>
            </div>
          ))}
        </div>
      )}
      
      {children}
      
      <div className="mt-8">
        {ctaText && (
          <Button
            onClick={ctaAction}
            variant="outline"
            className="border-white bg-transparent text-white hover:bg-white/20"
          >
            {ctaText}
          </Button>
        )}
      </div>
      
      {stats && stats.length > 0 && (
        <div className="mt-12 flex items-center justify-between border-t border-white/20 pt-6">
          <div className="flex items-center gap-2">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className="h-2 w-2 rounded-full bg-white/30"></div>}
                <div className="flex items-center gap-1">
                  <span className="font-bold">{stat.value}</span>
                  <span className="text-sm opacity-80">{stat.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          
          <div className="text-xl font-bold">¡Tú ganas!</div>
        </div>
      )}
    </div>
  );
}

export interface BenefitItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
}

export function BenefitItem({
  className,
  icon,
  title,
  ...props
}: BenefitItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg bg-white/10 p-4",
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="text-sm font-medium">{title}</div>
    </div>
  );
}
