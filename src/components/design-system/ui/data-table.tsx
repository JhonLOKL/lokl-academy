"use client";

import React from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  cell: (item: T) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  rowClassName?: string | ((item: T, index: number) => string);
  emptyState?: React.ReactNode;
  sortable?: boolean;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  loadingRows?: number;
  caption?: React.ReactNode;
  zebra?: boolean;
  compact?: boolean;
  bordered?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  className,
  rowClassName,
  emptyState = "No hay datos disponibles",
  sortable = true,
  onRowClick,
  isLoading = false,
  loadingRows = 5,
  caption,
  zebra = false,
  compact = false,
  bordered = true,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Función para ordenar los datos
  const sortedData = React.useMemo(() => {
    // Función para obtener el valor de una celda para ordenar
    const getCellValue = (item: T, key: string): unknown => {
      const keys = key.split(".");
      return keys.reduce((obj: Record<string, unknown> | unknown, key: string) => {
        if (obj && typeof obj === 'object') {
          return (obj as Record<string, unknown>)[key];
        }
        return undefined;
      }, item as Record<string, unknown>);
    };
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = getCellValue(a, sortConfig.key);
      const bValue = getCellValue(b, sortConfig.key);

      if (aValue === bValue) return 0;
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const modifier = sortConfig.direction === "asc" ? 1 : -1;
      
      // Ordenar según el tipo de dato
      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * modifier;
      } else {
        return (aValue > bValue ? 1 : -1) * modifier;
      }
    });
  }, [data, sortConfig]);

  // Función para cambiar la ordenación
  const requestSort = (key: string) => {
    if (!sortable) return;
    
    let direction: "asc" | "desc" = "asc";
    
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    
    setSortConfig({ key, direction });
  };

  // Renderizar el icono de ordenación
  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ChevronsUpDown className="ml-1 h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  // Renderizar filas de carga (skeleton)
  const renderLoadingRows = () => {
    return Array(loadingRows)
      .fill(0)
      .map((_, rowIndex) => (
        <tr
          key={`loading-row-${rowIndex}`}
          className={cn(
            "animate-pulse",
            zebra && rowIndex % 2 === 1 && "bg-[#F5F5F5]"
          )}
        >
          {columns.map((column, colIndex) => (
            <td
              key={`loading-cell-${rowIndex}-${colIndex}`}
              className={cn(
                "p-3",
                compact && "py-2",
                column.align === "center" && "text-center",
                column.align === "right" && "text-right",
                column.className
              )}
              style={{ width: column.width }}
            >
              <div className="h-4 w-3/4 rounded bg-[#E5E5E5]"></div>
            </td>
          ))}
        </tr>
      ));
  };

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className={cn(
          "w-full border-collapse",
          bordered && "border-separate border-spacing-0 rounded-lg border border-[#E5E5E5]"
        )}>
          {caption && <caption className="mb-2 text-sm text-[#6D6C6C]">{caption}</caption>}
          <thead>
            <tr className="bg-[#F5F5F5] text-left text-sm font-medium text-[#0F0F0F]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "p-3",
                    compact && "py-2",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    column.sortable !== false && sortable && "cursor-pointer hover:bg-[#E5E5E5]",
                    column.className,
                    bordered && "border-b border-[#E5E5E5]"
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable !== false && requestSort(column.key)}
                >
                  <div className="flex items-center">
                    <span>{column.header}</span>
                    {column.sortable !== false && sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              renderLoadingRows()
            ) : sortedData.length > 0 ? (
              sortedData.map((item, index) => (
                <tr
                  key={`row-${index}`}
                  className={cn(
                    "text-sm text-[#0F0F0F]",
                    zebra && index % 2 === 1 && "bg-[#F5F5F5]",
                    onRowClick && "cursor-pointer hover:bg-[#F5F5F5]",
                    typeof rowClassName === "function"
                      ? rowClassName(item, index)
                      : rowClassName
                  )}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column) => (
                    <td
                      key={`cell-${index}-${column.key}`}
                      className={cn(
                        "p-3",
                        compact && "py-2",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        column.className,
                        bordered && index !== sortedData.length - 1 && "border-b border-[#E5E5E5]"
                      )}
                      style={{ width: column.width }}
                    >
                      {column.cell(item)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-6 text-center text-[#6D6C6C]"
                >
                  {emptyState}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente Badge para estados
export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-[#F5F5F5] text-[#0F0F0F]",
        variant === "success" && "bg-green-100 text-green-700",
        variant === "warning" && "bg-yellow-100 text-yellow-700",
        variant === "error" && "bg-red-100 text-red-700",
        variant === "info" && "bg-blue-100 text-blue-700",
        className
      )}
    >
      {children}
    </span>
  );
}
