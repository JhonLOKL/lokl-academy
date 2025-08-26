"use client";

import React from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3;

type TextStyle = {
  text: string;
  weight?: "thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  color?: "default" | "purple" | "white" | "black" | "muted";
  italic?: boolean;
};

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  parts: TextStyle[];
  align?: "left" | "center" | "right";
  tracking?: "normal" | "tight" | "tighter" | "wide";
  theme?: "light" | "dark" | "purple";
  className?: string;
}

export function Heading({
  level,
  parts,
  align = "left",
  tracking = "tight",
  theme = "light",
  className,
  ...props
}: HeadingProps) {
  // Mapping font weights to Tailwind classes
  const weightClasses = {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  };

  // Mapping colors to classes based on theme
  const getColorClass = (color: TextStyle["color"], currentTheme: HeadingProps["theme"]) => {
    if (!color || color === "default") {
      return currentTheme === "light" ? "text-black" : "text-white";
    }

    const colorMap = {
      purple: "text-[#5352F6]",
      white: "text-white",
      black: "text-black",
      muted: currentTheme === "light" ? "text-[#6D6C6C]" : "text-[#D1D1D1]",
    };

    return colorMap[color];
  };

  // Mapping tracking to classes
  const trackingClasses = {
    normal: "tracking-normal",
    tight: "tracking-tight",
    tighter: "tracking-tighter",
    wide: "tracking-wide",
  };

  // Mapping alignment to classes
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  // Size classes based on heading level
  const sizeClasses = {
    1: "text-4xl md:text-5xl lg:text-6xl",
    2: "text-3xl md:text-4xl",
    3: "text-2xl md:text-3xl",
  };

  const HeadingTag = `h${level}` as React.ElementType;

  return (
    <HeadingTag
      className={cn(
        sizeClasses[level],
        trackingClasses[tracking],
        alignClasses[align],
        "leading-tight",
        className
      )}
      {...props}
    >
      {parts.map((part, index) => (
        <span
          key={index}
          className={cn(
            part.weight ? weightClasses[part.weight] : "font-normal",
            getColorClass(part.color, theme),
            part.italic && "italic"
          )}
        >
          {part.text}
        </span>
      ))}
    </HeadingTag>
  );
}

export interface HighlightHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  text: string;
  highlight: string;
  highlightColor?: "purple" | "black" | "white";
  highlightWeight?: "thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  baseWeight?: "thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  align?: "left" | "center" | "right";
  theme?: "light" | "dark" | "purple";
  className?: string;
}

export function HighlightHeading({
  level,
  text,
  highlight,
  highlightColor = "purple",
  highlightWeight = "bold",
  baseWeight = "regular",
  align = "left",
  theme = "light",
  className,
  ...props
}: HighlightHeadingProps) {
  // Split the text to insert the highlight
  const parts = text.split(highlight).reduce<TextStyle[]>((acc, part, index, array) => {
    if (part) {
      acc.push({
        text: part,
        weight: baseWeight,
      });
    }
    
    // Add the highlight part except after the last split
    if (index < array.length - 1) {
      acc.push({
        text: highlight,
        weight: highlightWeight,
        color: highlightColor,
      });
    }
    
    return acc;
  }, []);

  return (
    <Heading
      level={level}
      parts={parts}
      align={align}
      theme={theme}
      className={className}
      {...props}
    />
  );
}

export interface MultiStyleHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  firstPart: {
    text: string;
    weight?: "thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black";
    color?: "default" | "purple" | "white" | "black" | "muted";
    italic?: boolean;
  };
  secondPart: {
    text: string;
    weight?: "thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black";
    color?: "default" | "purple" | "white" | "black" | "muted";
    italic?: boolean;
  };
  align?: "left" | "center" | "right";
  theme?: "light" | "dark" | "purple";
  className?: string;
}

export function MultiStyleHeading({
  level,
  firstPart,
  secondPart,
  align = "left",
  theme = "light",
  className,
  ...props
}: MultiStyleHeadingProps) {
  return (
    <Heading
      level={level}
      parts={[firstPart, secondPart]}
      align={align}
      theme={theme}
      className={className}
      {...props}
    />
  );
}
