import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  imageUrl?: string;
  imageBw?: boolean;
  overlay?: boolean;
  align?: "left" | "center" | "right";
  fullHeight?: boolean;
  children?: React.ReactNode;
}

export function HeroSection({
  className,
  title,
  subtitle,
  imageUrl,
  imageBw = false,
  overlay = true,
  align = "left",
  fullHeight = false,
  children,
  ...props
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        fullHeight ? "min-h-screen" : "min-h-[70vh]",
        className
      )}
      {...props}
    >
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl}
            alt="Hero background"
            fill
            className={cn(
              "object-cover",
              imageBw && "grayscale",
              overlay && "brightness-[0.7]"
            )}
            priority
          />
        </div>
      )}
      
      <div className="relative z-10 flex h-full w-full items-center">
        <div className={cn(
          "container mx-auto px-4 py-16 md:py-20",
          {
            "text-center": align === "center",
            "text-right": align === "right",
          }
        )}>
          <div className={cn(
            "max-w-3xl",
            {
              "mx-auto": align === "center",
              "ml-auto": align === "right",
            }
          )}>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>
            
            {subtitle && (
              <p className="mb-8 text-lg md:text-xl lg:text-2xl">
                {subtitle}
              </p>
            )}
            
            <div className={cn(
              "flex gap-4 flex-wrap",
              {
                "justify-center": align === "center",
                "justify-end": align === "right",
              }
            )}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
