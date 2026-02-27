"use client";

import React from "react";
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Sector, Tooltip, TooltipProps } from "recharts";
import { cn } from "@/lib/utils";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export interface PieChartDataItem {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartDataItem[];
  height?: number;

  className?: string;
  innerRadius?: number;
  outerRadius?: number;
  showTooltip?: boolean;
  showLabels?: boolean;
  tooltipFormatter?: (value: ValueType) => string;
  colors?: string[];
  activeIndex?: number;
  onActiveIndexChange?: (index: number | undefined) => void;
  title?: string;
  subtitle?: string;
  legendPosition?: "right" | "left" | "bottom";
}

const defaultColors = ["#5352F6", "#7A79F9", "#A1A0FB", "#D1D1FB", "#0F0F0F", "#444444", "#6D6C6C", "#919090"];

const CustomTooltip = ({
  active,
  payload,
  formatter,
}: TooltipProps<ValueType, NameType> & { formatter?: (value: ValueType) => string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-[#E5E5E5] bg-white p-3 shadow-sm">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-xs font-medium text-[#6D6C6C]">
          {formatter && payload[0].value !== undefined ? formatter(payload[0].value) : payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

// Usamos unknown para el tipo de props ya que Recharts espera un tipo específico
// que es difícil de definir completamente
const renderActiveShape = (props: unknown) => {
  // Hacemos una aserción de tipo para trabajar con las propiedades que necesitamos
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props as {
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: {
      name: string;
    };
    percent: number;
  };

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <text x={cx} y={cy} dy={-10} textAnchor="middle" fill="#0F0F0F" fontSize={14} fontWeight={600}>
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#6D6C6C" fontSize={12}>
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

export function PieChart({
  data,
  height = 300,
  className,
  innerRadius = 0,
  outerRadius = 100,
  showTooltip = true,
  showLabels = false,
  tooltipFormatter,
  colors = defaultColors,
  activeIndex,
  onActiveIndexChange,
  title,
  subtitle,
  legendPosition = "right",
}: PieChartProps) {
  const [activeIdx, setActiveIdx] = React.useState<number | undefined>(activeIndex);

  const handleMouseEnter = (_: unknown, index: number) => {
    setActiveIdx(index);
    if (onActiveIndexChange) {
      onActiveIndexChange(index);
    }
  };

  const handleMouseLeave = () => {
    setActiveIdx(undefined);
    if (onActiveIndexChange) {
      onActiveIndexChange(undefined);
    }
  };

  // Asignar colores personalizados si se proporcionan en los datos
  const getColor = (item: PieChartDataItem, index: number) => {
    return item.color || colors[index % colors.length];
  };

  // Renderizar la leyenda manualmente
  const renderLegend = () => {
    return (
      <div className={cn(
        "grid gap-2",
        (legendPosition === "right" || legendPosition === "left") ? "grid-cols-2 sm:grid-cols-1" : "grid-cols-2 sm:grid-cols-4"
      )}>
        {data.map((entry, index) => (
          <div
            key={`legend-item-${index}`}
            className="flex items-center gap-2"
            onMouseEnter={() => handleMouseEnter(null, index)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={cn(
                "h-3 w-3 rounded-full",
                activeIdx === index && "ring-2 ring-offset-2"
              )}
              style={{ backgroundColor: getColor(entry, index) }}
            />
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-medium">{entry.name}</span>
              <span className="text-xs text-[#6D6C6C]">{entry.value}%</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm text-[#6D6C6C]">{subtitle}</p>}
        </div>
      )}
      <div className={cn(
        "flex w-full",
        legendPosition === "right" || legendPosition === "left" ? "flex-col md:flex-row items-center gap-6" : "flex-col gap-4",
        legendPosition === "left" && "md:flex-row-reverse"
      )}>
        <div className={cn(
          "mx-auto flex justify-center",
          (legendPosition === "right" || legendPosition === "left") ? "w-full md:w-1/2" : "w-full"
        )}>
          <ResponsiveContainer width="100%" height={height}>
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={showLabels}
                label={showLabels ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : undefined}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                dataKey="value"
                activeIndex={activeIdx}
                activeShape={renderActiveShape}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry, index)} />
                ))}
              </Pie>
              {showTooltip && (
                <Tooltip content={<CustomTooltip formatter={tooltipFormatter} />} />
              )}
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        <div className={cn(
          (legendPosition === "right" || legendPosition === "left") ? "w-full md:w-1/2" : "w-full mt-2"
        )}>
          {renderLegend()}
        </div>
      </div>
    </div>
  );
}

// Componente de dona (donut chart) - una variante del pie chart
export function DonutChart(props: PieChartProps) {
  return <PieChart {...props} innerRadius={props.innerRadius || 70} />;
}
