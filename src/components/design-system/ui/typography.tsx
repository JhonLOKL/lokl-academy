"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Componente H1 con SEO optimizado
export interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  variant?: "default" | "hero" | "page-title";
  color?: "default" | "purple" | "white" | "black";
  align?: "left" | "center" | "right";
  className?: string;
}

export function H1({
  children,
  variant = "default",
  color = "default",
  align = "left",
  className,
  ...props
}: H1Props) {
  const baseClasses = "font-extrabold tracking-tight leading-tight";
  
  const variantClasses = {
    default: "text-4xl md:text-5xl lg:text-6xl",
    hero: "text-5xl md:text-6xl lg:text-7xl",
    "page-title": "text-3xl md:text-4xl lg:text-5xl",
  };

  const colorClasses = {
    default: "text-[#0F0F0F]",
    purple: "text-[#5352F6]",
    white: "text-white",
    black: "text-black",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <h1
      className={cn(
        baseClasses,
        variantClasses[variant],
        colorClasses[color],
        alignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

// Componente H2 con SEO optimizado
export interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  variant?: "default" | "section" | "card";
  color?: "default" | "purple" | "white" | "black";
  align?: "left" | "center" | "right";
  className?: string;
}

export function H2({
  children,
  variant = "default",
  color = "default",
  align = "left",
  className,
  ...props
}: H2Props) {
  const baseClasses = "font-bold tracking-tight leading-tight";
  
  const variantClasses = {
    default: "text-3xl md:text-4xl",
    section: "text-2xl md:text-3xl",
    card: "text-xl md:text-2xl",
  };

  const colorClasses = {
    default: "text-[#0F0F0F]",
    purple: "text-[#5352F6]",
    white: "text-white",
    black: "text-black",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <h2
      className={cn(
        baseClasses,
        variantClasses[variant],
        colorClasses[color],
        alignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

// Componente H3 con SEO optimizado
export interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  variant?: "default" | "subsection" | "feature";
  color?: "default" | "purple" | "white" | "black";
  align?: "left" | "center" | "right";
  className?: string;
}

export function H3({
  children,
  variant = "default",
  color = "default",
  align = "left",
  className,
  ...props
}: H3Props) {
  const baseClasses = "font-semibold tracking-tight leading-tight";
  
  const variantClasses = {
    default: "text-2xl md:text-3xl",
    subsection: "text-xl md:text-2xl",
    feature: "text-lg md:text-xl",
  };

  const colorClasses = {
    default: "text-[#0F0F0F]",
    purple: "text-[#5352F6]",
    white: "text-white",
    black: "text-black",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <h3
      className={cn(
        baseClasses,
        variantClasses[variant],
        colorClasses[color],
        alignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

// Componente Paragraph con SEO optimizado
export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: "default" | "lead" | "body" | "small" | "caption";
  color?: "default" | "muted" | "white" | "purple";
  align?: "left" | "center" | "right";
  weight?: "normal" | "medium" | "semibold";
  className?: string;
}

export function Paragraph({
  children,
  variant = "default",
  color = "default",
  align = "left",
  weight = "normal",
  className,
  ...props
}: ParagraphProps) {
  const baseClasses = "leading-relaxed";
  
  const variantClasses = {
    default: "text-base",
    lead: "text-lg md:text-xl",
    body: "text-base",
    small: "text-sm",
    caption: "text-xs",
  };

  const colorClasses = {
    default: "text-[#0F0F0F]",
    muted: "text-[#6D6C6C]",
    white: "text-white",
    purple: "text-[#5352F6]",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
  };

  return (
    <p
      className={cn(
        baseClasses,
        variantClasses[variant],
        colorClasses[color],
        alignClasses[align],
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// Componente Text con variantes adicionales
export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "highlight" | "accent" | "muted";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "default" | "purple" | "white" | "black" | "muted";
  className?: string;
}

export function Text({
  children,
  variant = "default",
  size = "base",
  weight = "normal",
  color = "default",
  className,
  ...props
}: TextProps) {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const colorClasses = {
    default: "text-[#0F0F0F]",
    purple: "text-[#5352F6]",
    white: "text-white",
    black: "text-black",
    muted: "text-[#6D6C6C]",
  };

  const variantClasses = {
    default: "",
    highlight: "bg-yellow-100 px-1 rounded",
    accent: "text-[#5352F6] font-medium",
    muted: "text-[#6D6C6C]",
  };

  return (
    <span
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
