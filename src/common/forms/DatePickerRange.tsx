"use client";

import { Button } from "../buttons/button";
import { Popover, PopoverContent, PopoverTrigger } from "../shared/popover";
import { cn } from "@/config/shadcnUtils";
import { Calendar } from "../shared/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  placeholder?: string;
  btnClassName?: string;
  className?: string;
  value?: DateRange;
  onChange?: (value: DateRange | undefined) => void;
  error?: boolean;
}

export default function DateRangePicker({
  className,
  placeholder = "Pick a date",
  btnClassName,
  value,
  onChange,
  error,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value);

  const handleChange = (date: DateRange | undefined) => {
    setDate(date);
    onChange?.(date);
  };

  return (
    <div className={cn("grid gap-2 h-10", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] px-3 py-2 justify-start text-left font-normal h-full !bg-background",
              !date && "text-muted-foreground",
              error && "border-destructive",
              btnClassName,
            )}
          >
            <div className="flex items-center justify-between gap-2 w-full">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>{placeholder}</span>
              )}
              <CalendarIcon className="ml-2 h-4 w-4" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50" align="center">
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
