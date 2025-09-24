"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/config/shadcnUtils";
import { Button } from "../buttons/button";
import { Calendar } from "../shared/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../shared/popover";

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  buttonClassName?: string;
  onChange?: (date: Date) => void;
  value?: Date | null;
  disabled?: boolean;
  error?: string;
}

export function DatePicker({
  placeholder = "Pick a date",
  buttonClassName,
  onChange,
  value,
  disabled = false,
  error,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>(value as Date);

  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate as Date);
    onChange?.(newDate as Date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] px-3 py-2 h-10 justify-start text-left font-normal overflow-hidden !bg-background",
            !date && "text-muted-foreground",
            buttonClassName,
            error && "border-red-500",
          )}
          disabled={disabled}
        >
          <div className="flex items-center justify-between gap-2 w-full ">
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
            <CalendarIcon className="ml-2 h-4 w-4" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[9999]">
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
