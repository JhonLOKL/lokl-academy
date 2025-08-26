"use client";

import React from "react";
import { ArrowDownIcon, ArrowUpIcon, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  trendSuffix?: string;
  trendPrefix?: string;
  trendReversed?: boolean;
  chart?: React.ReactNode;
  loading?: boolean;
  variant?: "default" | "bordered" | "subtle";
  size?: "sm" | "md" | "lg";
}

export function MetricCard({
  className,
  title,
  subtitle,
  value,
  description,
  icon,
  trend,
  trendLabel,
  trendSuffix = "%",
  trendPrefix = "",
  trendReversed = false,
  chart,
  loading = false,
  variant = "default",
  size = "md",
  ...props
}: MetricCardProps) {
  // Determinar si la tendencia es positiva o negativa
  const isTrendPositive = trendReversed ? trend! < 0 : trend! > 0;
  const isTrendNegative = trendReversed ? trend! > 0 : trend! < 0;
  
  // Formatear el valor de tendencia
  const formattedTrend = trend !== undefined ? (
    <span className={cn(
      "inline-flex items-center gap-1 text-xs font-medium",
      isTrendPositive && "text-green-600",
      isTrendNegative && "text-red-600",
      !isTrendPositive && !isTrendNegative && "text-[#6D6C6C]"
    )}>
      {isTrendPositive && <ArrowUpIcon className="h-3 w-3" />}
      {isTrendNegative && <ArrowDownIcon className="h-3 w-3" />}
      {trendPrefix}{Math.abs(trend).toFixed(1)}{trendSuffix}
    </span>
  ) : null;

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-lg p-5",
        variant === "default" && "bg-white shadow-sm",
        variant === "bordered" && "border border-[#E5E5E5] bg-white",
        variant === "subtle" && "bg-[#F5F5F5]",
        size === "sm" && "p-4",
        size === "lg" && "p-6",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-[#6D6C6C]">{title}</p>
            {subtitle && (
              <span className="text-xs text-[#919090]">{subtitle}</span>
            )}
          </div>
          {loading ? (
            <div className="mt-1 h-7 w-24 animate-pulse rounded bg-[#E5E5E5]"></div>
          ) : (
            <h3 className="mt-1 text-2xl font-bold tracking-tight">{value}</h3>
          )}
        </div>
        {icon && (
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            variant === "default" && "bg-[#F5F5F5]",
            variant === "bordered" && "bg-[#F5F5F5]",
            variant === "subtle" && "bg-white"
          )}>
            {icon}
          </div>
        )}
      </div>
      
      {(description || trend !== undefined) && (
        <div className="mt-2 flex items-center gap-2">
          {description && (
            <p className="text-xs text-[#6D6C6C]">{description}</p>
          )}
          {trend !== undefined && formattedTrend}
          {trendLabel && (
            <span className="text-xs text-[#919090]">{trendLabel}</span>
          )}
        </div>
      )}
      
      {chart && <div className="mt-4">{chart}</div>}
    </div>
  );
}

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  value: string | number;
  target?: string | number;
  progress?: number;
  progressLabel?: string;
  remainingLabel?: string;
  trend?: number;
  trendLabel?: string;
  trendSuffix?: string;
  trendPrefix?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function KpiCard({
  className,
  title,
  subtitle,
  value,
  target,
  progress,
  progressLabel,
  remainingLabel,
  trend,
  trendLabel,
  trendSuffix = "%",
  trendPrefix = "",
  icon,
  loading = false,
  ...props
}: KpiCardProps) {
  // Determinar si la tendencia es positiva o negativa
  const isTrendPositive = trend! > 0;
  const isTrendNegative = trend! < 0;
  
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-lg border border-[#E5E5E5] bg-white p-5",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-[#6D6C6C]">{title}</p>
            {subtitle && (
              <span className="text-xs text-[#919090]">{subtitle}</span>
            )}
          </div>
          {loading ? (
            <div className="mt-1 h-9 w-32 animate-pulse rounded bg-[#E5E5E5]"></div>
          ) : (
            <div className="mt-1 flex items-baseline gap-1">
              <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
              {target && (
                <span className="text-sm text-[#6D6C6C]">/ {target}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5]">
            {icon}
          </div>
        )}
      </div>
      
      {progress !== undefined && (
        <div className="mt-4 space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
            <div
              className="h-full rounded-full bg-[#5352F6]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#0F0F0F]">
              {progressLabel || `${progress.toFixed(1)}% completado`}
            </span>
            {remainingLabel && (
              <span className="text-[#6D6C6C]">{remainingLabel}</span>
            )}
          </div>
        </div>
      )}
      
      {trend !== undefined && (
        <div className="mt-4 flex items-center gap-1 text-sm">
          <span className="text-[#6D6C6C]">vs. periodo anterior</span>
          <span className={cn(
            "inline-flex items-center gap-1 font-medium",
            isTrendPositive && "text-green-600",
            isTrendNegative && "text-red-600",
            !isTrendPositive && !isTrendNegative && "text-[#6D6C6C]"
          )}>
            {isTrendPositive && <TrendingUp className="h-4 w-4" />}
            {isTrendNegative && <TrendingDown className="h-4 w-4" />}
            {trendPrefix}{trend > 0 ? "+" : ""}{trend.toFixed(1)}{trendSuffix}
          </span>
          {trendLabel && (
            <span className="text-[#919090]">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: number;
  changeText?: string;
  icon?: React.ReactNode;
  chart?: React.ReactNode;
  loading?: boolean;
}

export function StatCard({
  className,
  title,
  value,
  change,
  changeText,
  icon,
  chart,
  loading = false,
  ...props
}: StatCardProps) {
  // Determinar si el cambio es positivo o negativo
  const isChangePositive = change! > 0;
  const isChangeNegative = change! < 0;
  
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-lg border border-[#E5E5E5] bg-white p-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F5]">
              {icon}
            </div>
          )}
          <p className="text-sm font-medium text-[#6D6C6C]">{title}</p>
        </div>
        {change !== undefined && (
          <span className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium",
            isChangePositive && "bg-green-100 text-green-700",
            isChangeNegative && "bg-red-100 text-red-700",
            !isChangePositive && !isChangeNegative && "bg-[#F5F5F5] text-[#6D6C6C]"
          )}>
            {isChangePositive && "+"}
            {change.toFixed(1)}%
          </span>
        )}
      </div>
      
      <div className="mt-2 flex items-baseline justify-between">
        {loading ? (
          <div className="h-7 w-20 animate-pulse rounded bg-[#E5E5E5]"></div>
        ) : (
          <h3 className="text-2xl font-bold">{value}</h3>
        )}
        {changeText && (
          <span className="text-xs text-[#6D6C6C]">{changeText}</span>
        )}
      </div>
      
      {chart && <div className="mt-2">{chart}</div>}
    </div>
  );
}
