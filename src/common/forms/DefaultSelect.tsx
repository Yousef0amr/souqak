"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/common/buttons/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/common/shared/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/shared/popover";
import React from "react";
import { cn } from "@/config/shadcnUtils";

const DefaultSelect: React.FC<DefaultSelectProps> = ({
  options = [],
  placeholder = "select...",
  elementWidth = "w-[100px]",
  onChange,
  defValue = "",
  withCheckIcon = true,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`justify-between ${elementWidth}`}
        >
          {value ? options.find((item) => item.value === value)?.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`p-0 ${elementWidth}`}>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue: string) => {
                    const selectedValue = currentValue === value ? "" : currentValue;
                    setValue(selectedValue);
                    onChange(selectedValue);
                    setOpen(false);
                  }}
                >
                  {withCheckIcon ? (
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  ) : null}
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DefaultSelect;
