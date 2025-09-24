"use client";
import { Input } from "../input";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/shared/popover";
import { useRef, useState } from "react";

export interface Suggestion {
  value: string;
  label: string;
}

interface InputWithSuggestionsProps {
  value: string | SelectOption;
  onChange: (value: string) => void;
  suggestions?: Suggestion[];
  placeholder?: string;
  inputClassName?: string;
  disabled?: boolean;
  onSelect?: (value: SelectOption) => void;
  error?: boolean;
}

export function InputWithSuggestions({
  value,
  onChange,
  suggestions = [],
  placeholder = "Select or type...",
  inputClassName,
  disabled,
  onSelect,
  error = false,
}: InputWithSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (currentValue: SelectOption) => {
    onChange(currentValue.value);
    setIsOpen(false);
    onSelect?.(currentValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const rawValue = e.target.value;
    onChange(rawValue);
  };

  const handleInputBlur = () => {
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="flex w-full items-center justify-between gap-2">
        <Input
          ref={inputRef}
          type="text"
          value={value as string}
          onChange={handleInputChange}
          className={inputClassName}
          placeholder={placeholder}
          disabled={disabled}
          onClick={handleInputFocus}
          onBlur={handleInputBlur}
          error={error}
        />
      </PopoverTrigger>
      {/* if getSuggestionsData is true, then show  */}
      {suggestions.length > 0 && isOpen && (
        <PopoverContent
          align="start"
          side="bottom"
          className="py-3 px-1  w-full"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(suggestion);
              }}
              className="cursor-pointer p-2 px-8 hover:bg-accent rounded-md"
            >
              {suggestion.label}
            </div>
          ))}
        </PopoverContent>
      )}
    </Popover>
  );
}
