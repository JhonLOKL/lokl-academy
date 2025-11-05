"use client";

import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { OptionType } from "@/schemas/lead-schema";

interface NestedSelectProps {
  options: OptionType[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function NestedSelect({
  options,
  value,
  onValueChange,
  placeholder = "Selecciona una opción",
  disabled = false,
  className,
}: NestedSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());
  const [selectedValue, setSelectedValue] = React.useState(value || "");

  // Función para obtener el label del valor seleccionado
  const getSelectedLabel = (value: string): string => {
    for (const option of options) {
      if (option.value === value) {
        return option.label;
      }
      if (option.children) {
        for (const child of option.children) {
          if (child.value === value) {
            return `${option.label} - ${child.label}`;
          }
        }
      }
    }
    return "";
  };

  // Función para manejar el clic en una opción principal
  const handleMainOptionClick = (option: OptionType) => {
    if (option.children && option.children.length > 0) {
      // Si tiene hijos, expandir/colapsar
      const newExpanded = new Set(expandedItems);
      if (expandedItems.has(option.value)) {
        newExpanded.delete(option.value);
      } else {
        newExpanded.add(option.value);
      }
      setExpandedItems(newExpanded);
    } else {
      // Si no tiene hijos, seleccionar y cerrar
      setSelectedValue(option.value);
      onValueChange?.(option.value);
      setIsOpen(false);
    }
  };

  // Función para manejar el clic en una sub-opción
  const handleSubOptionClick = (subOption: OptionType) => {
    setSelectedValue(subOption.value);
    onValueChange?.(subOption.value);
    setIsOpen(false);
  };


  return (
    <div className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-md border border-white/30 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 disabled:cursor-not-allowed disabled:opacity-50",
          isOpen && "ring-2 ring-white/50"
        )}
      >
        <span className={selectedValue ? "text-white" : "text-white/50"}>
          {selectedValue ? getSelectedLabel(selectedValue) : placeholder}
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-white/30 bg-white shadow-lg">
          <div className="max-h-60 overflow-y-auto p-1">
            {options.map((option) => (
              <div key={option.value}>
                {/* Opción principal */}
                <button
                  type="button"
                  onClick={() => handleMainOptionClick(option)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-sm px-2 py-2 text-left text-sm text-gray-900 hover:bg-gray-100",
                    selectedValue === option.value && "bg-blue-50 text-blue-900"
                  )}
                >
                  <span>{option.label}</span>
                  {option.children && option.children.length > 0 && (
                    <ChevronRight 
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedItems.has(option.value) && "rotate-90"
                      )} 
                    />
                  )}
                </button>

                {/* Sub-opciones */}
                {option.children && expandedItems.has(option.value) && (
                  <div className="ml-4 border-l border-gray-200 pl-2">
                    {option.children.map((subOption) => (
                      <button
                        key={subOption.value}
                        type="button"
                        onClick={() => handleSubOptionClick(subOption)}
                        className={cn(
                          "flex w-full items-center rounded-sm px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100",
                          selectedValue === subOption.value && "bg-blue-50 text-blue-900"
                        )}
                      >
                        {subOption.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overlay para cerrar al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
