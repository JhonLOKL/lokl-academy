"use client";

import React from "react";
import { CartesianGrid, Legend, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export interface LineChartDataItem {
  name: string;
  [key: string]: string | number;
}

export interface LineChartProps {
  data: LineChartDataItem[];
  series: {
    key: string;
    name: string;
    color: string;
    strokeWidth?: number;
    dot?: boolean;
    activeDot?: boolean;
  }[];
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  xAxisDataKey?: string;
  yAxisWidth?: number;
  tooltipFormatter?: (value: ValueType) => string;
  title?: string;
  subtitle?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  formatter,
}: TooltipProps<ValueType, NameType> & { formatter?: (value: ValueType) => string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-[#E5E5E5] bg-white p-3 shadow-sm">
        <p className="mb-2 text-sm font-medium">{label}</p>
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
                  {formatter && entry.value !== undefined ? formatter(entry.value) : entry.value}
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

export function LineChart({
  data,
  series,
  height = 300,
  className,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  xAxisDataKey = "name",
  yAxisWidth = 40,
  tooltipFormatter,
  title,
  subtitle,
}: LineChartProps) {
  return (
    <div className={cn("w-full", className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm text-[#6D6C6C]">{subtitle}</p>}
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E5E5"
            />
          )}
          {showXAxis && (
            <XAxis
              dataKey={xAxisDataKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6D6C6C" }}
              dy={10}
            />
          )}
          {showYAxis && (
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6D6C6C" }}
              width={yAxisWidth}
            />
          )}
          {showTooltip && (
            <Tooltip
              cursor={{ stroke: "rgba(83, 82, 246, 0.2)" }}
              content={<CustomTooltip formatter={tooltipFormatter} />}
            />
          )}
          {showLegend && (
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "12px", paddingBottom: "10px" }}
            />
          )}
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color}
              strokeWidth={s.strokeWidth || 2}
              dot={s.dot !== false ? { fill: s.color, stroke: s.color, strokeWidth: 2, r: 4 } : false}
              activeDot={s.activeDot !== false ? { r: 6, stroke: s.color, strokeWidth: 2, fill: "#fff" } : false}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Componente simplificado para casos de uso más sencillos
export interface SimpleLineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  color?: string;
  title?: string;
  subtitle?: string;
}

export function SimpleLineChart({
  data,
  height = 300,
  className,
  valuePrefix = "",
  valueSuffix = "",
  color = "#5352F6",
  title,
  subtitle,
}: SimpleLineChartProps) {
  // Transformar datos al formato que espera el componente principal
  const transformedData = data.map(item => ({
    name: item.label,
    value: item.value
  }));

  const series = [{
    key: "value",
    name: "Valor",
    color: color
  }];

  const formatter = (value: ValueType) => {
    return `${valuePrefix}${value}${valueSuffix}`;
  };

  return (
    <LineChart
      data={transformedData}
      series={series}
      height={height}
      className={className}
      tooltipFormatter={formatter}
      title={title}
      subtitle={subtitle}
    />
  );
}
