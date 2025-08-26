"use client";

import React from "react";
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadarChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";
import { cn } from "@/lib/utils";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export interface RadarChartDataItem {
  subject: string;
  [key: string]: string | number;
}

export interface RadarChartProps {
  data: RadarChartDataItem[];
  series: {
    key: string;
    name: string;
    color: string;
    fillOpacity?: number;
    strokeWidth?: number;
  }[];
  height?: number;
  width?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  tooltipFormatter?: (value: number | string) => string;
  title?: string;
  subtitle?: string;
  maxValue?: number;
  angleAxisProps?: Record<string, any>;
  radiusAxisProps?: Record<string, any>;
}

const CustomTooltip = ({
  active,
  payload,
  formatter,
}: TooltipProps<ValueType, NameType> & { formatter?: (value: number | string) => string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-[#E5E5E5] bg-white p-3 shadow-sm">
        <p className="mb-2 text-sm font-medium">{payload[0].payload.subject}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={`tooltip-item-${index}`} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-xs">
                <span className="font-medium">{entry.name}: </span>
                <span>
                  {formatter ? formatter(entry.value as number | string) : entry.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export function RadarChart({
  data,
  series,
  height = 300,
  width,
  className,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  tooltipFormatter,
  title,
  subtitle,
  maxValue,
  angleAxisProps = {},
  radiusAxisProps = {},
}: RadarChartProps) {
  return (
    <div className={cn("w-full", className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm text-[#6D6C6C]">{subtitle}</p>}
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          {showGrid && <PolarGrid stroke="#E5E5E5" />}
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 12, fill: "#6D6C6C" }}
            {...angleAxisProps}
          />
          <PolarRadiusAxis
            angle={90}
            domain={maxValue ? [0, maxValue] : undefined}
            tick={{ fontSize: 10, fill: "#6D6C6C" }}
            {...radiusAxisProps}
          />
          {series.map((s) => (
            <Radar
              key={s.key}
              name={s.name}
              dataKey={s.key}
              stroke={s.color}
              fill={s.color}
              fillOpacity={s.fillOpacity || 0.3}
              strokeWidth={s.strokeWidth || 2}
            />
          ))}
          {showLegend && (
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
            />
          )}
          {showTooltip && (
            <Tooltip content={<CustomTooltip formatter={tooltipFormatter} />} />
          )}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Componente simplificado para casos de uso más sencillos
export interface SimpleRadarChartProps {
  data: { category: string; value: number }[];
  height?: number;
  width?: number;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  color?: string;
  title?: string;
  subtitle?: string;
  maxValue?: number;
}

export function SimpleRadarChart({
  data,
  height = 300,
  width,
  className,
  valuePrefix = "",
  valueSuffix = "",
  color = "#5352F6",
  title,
  subtitle,
  maxValue,
}: SimpleRadarChartProps) {
  // Transformar datos al formato que espera el componente principal
  const transformedData = data.map(item => ({
    subject: item.category,
    value: item.value
  }));

  const series = [{
    key: "value",
    name: "Valor",
    color: color
  }];

  const formatter = (value: number | string) => {
    return `${valuePrefix}${value}${valueSuffix}`;
  };

  return (
    <RadarChart
      data={transformedData}
      series={series}
      height={height}
      width={width}
      className={className}
      tooltipFormatter={formatter}
      title={title}
      subtitle={subtitle}
      maxValue={maxValue}
    />
  );
}
