"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Locale } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  locale?: Locale;
  format?: string;
}

export function DatePicker({
  date,
  setDate,
  placeholder = "Selecciona una fecha",
  className,
  disabled = false,
  locale = es,
  format: dateFormat = "PP",
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-[#6D6C6C]",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, dateFormat, { locale }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={locale}
        />
      </PopoverContent>
    </Popover>
  );
}

interface DateRangePickerProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  setDateRange: React.Dispatch<
    React.SetStateAction<{
      from: Date | undefined;
      to: Date | undefined;
    }>
  >;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  locale?: Locale;
}

export function DateRangePicker({
  dateRange,
  setDateRange,
  placeholder = "Selecciona un rango de fechas",
  className,
  disabled = false,
  locale = es,
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange.from && "text-[#6D6C6C]",
              className
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "PP", { locale })} -{" "}
                  {format(dateRange.to, "PP", { locale })}
                </>
              ) : (
                format(dateRange.from, "PP", { locale })
              )
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange.from}
            selected={{
              from: dateRange.from,
              to: dateRange.to,
            }}
            onSelect={(range) => {
              if (range) {
                setDateRange({
                  from: range.from,
                  to: range.to || undefined
                });
              }
            }}
            numberOfMonths={2}
            locale={locale}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
