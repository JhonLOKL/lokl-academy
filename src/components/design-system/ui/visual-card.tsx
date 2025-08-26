"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface VisualCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  imageUrl?: string;
  ctaText?: string;
  ctaAction?: () => void;
  variant?: "vertical" | "horizontal";
  alignment?: "left" | "center";
  hasImage?: boolean;
}

export function VisualCard({
  className,
  title,
  subtitle,
  description,
  imageUrl,
  ctaText,
  ctaAction,
  variant = "vertical",
  alignment = "left",
  hasImage = true,
  ...props
}: VisualCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        variant === "vertical" ? "flex flex-col" : "flex flex-col md:flex-row",
        hasImage ? "text-white" : "bg-white text-[#0F0F0F] border border-[#E5E5E5]",
        className
      )}
      style={{
        letterSpacing: "-0.038em"
      }}
      {...props}
    >
      {/* Imagen de fondo y overlay */}
      {hasImage && imageUrl && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={typeof title === 'string' ? title : 'Card image'}
              fill
              className="object-cover grayscale"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          </div>
        </>
      )}

      {/* Contenido */}
      <div 
        className={cn(
          "relative z-10 flex flex-col",
          variant === "vertical" ? "p-6 md:p-8" : "p-6 md:p-8 md:flex-1",
          alignment === "center" && "items-center text-center"
        )}
      >
        {subtitle && (
          <div className={cn(
            "mb-2 text-sm font-medium italic",
            hasImage ? "text-gray-300" : "text-[#5352F6]"
          )}>
            {subtitle}
          </div>
        )}
        
        <h3 
          className={cn(
            "mb-3 text-2xl font-extrabold tracking-tight md:text-3xl",
            hasImage ? "text-white" : "text-[#0F0F0F]"
          )}
          style={{ letterSpacing: "-0.038em" }}
        >
          {title}
        </h3>
        
        {description && (
          <p 
            className={cn(
              "mb-6 max-w-md text-base",
              hasImage ? "text-gray-200" : "text-[#6D6C6C]"
            )}
            style={{ letterSpacing: "-0.03em" }}
          >
            {description}
          </p>
        )}
        
        {ctaText && (
          <div className="mt-auto">
            <Button 
              onClick={ctaAction}
              className={cn(
                "mt-2",
                hasImage ? "bg-[#5352F6] hover:bg-[#5352F6]/90" : ""
              )}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export function VisualCardGroup({
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
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": columns === 3,
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
