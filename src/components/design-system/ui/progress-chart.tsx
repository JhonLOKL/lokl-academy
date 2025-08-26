import React from "react";
import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  label?: React.ReactNode;
  className?: string;
}

export function ProgressCircle({
  value,
  size = 120,
  strokeWidth = 8,
  color = "#5352F6",
  backgroundColor = "#E5E5E5",
  label,
  className,
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={backgroundColor}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          fill="none"
        />
      </svg>
      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          {label}
        </div>
      )}
    </div>
  );
}

interface BarChartProps {
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
  height?: number;
  maxValue?: number;
  className?: string;
}

export function BarChart({
  data,
  height = 200,
  maxValue: propMaxValue,
  className,
}: BarChartProps) {
  const maxValue = propMaxValue || Math.max(...data.map(item => item.value));

  return (
    <div className={cn("w-full", className)}>
      <div className="flex h-[200px] items-end justify-between gap-2">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * height;
          return (
            <div
              key={index}
              className="group flex flex-1 flex-col items-center"
            >
              <div className="relative w-full">
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${barHeight}px`,
                    backgroundColor: item.color || "#5352F6",
                  }}
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {item.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between">
        {data.map((item, index) => (
          <div key={index} className="flex-1 text-center text-xs">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
