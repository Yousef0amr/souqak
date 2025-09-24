import type React from "react";
import { useEffect, useRef, useState } from "react";
import { X, Plus, ChevronDown, ChevronUp, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/config/shadcnUtils";
import DotsLoading from "../shared/DotsLoading";

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options = [],
  placeholder = "Search...",
  isLoading = false,
  isMulti = false,
  isCreatable = false,
  fetchOptions,
  disabledOptions = [],
  disabled = false,
  styleSettings,
  error = false,
  dropdownPosition = "bottom",
}) => {
  const [internalOptions, setInternalOptions] = useState<SelectOption[]>(options);
  const [inputValue, setInputValue] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isSame =
      internalOptions.length === options.length &&
      internalOptions.every(
        (opt, idx) => opt.value === options[idx].value && opt.label === options[idx].label,
      );

    if (!isSame) {
      setInternalOptions(options);
    }
  }, [options, internalOptions]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option: SelectOption) => {
    if (disabledOptions.includes(option.value)) return;

    if (isMulti) {
      const currentValues = (value as SelectOption[]) || [];
      if (!currentValues.some((v) => v.value === option.value)) {
        onChange?.([...currentValues, option]);
      }
    } else {
      onChange?.(option);
      setShowOptions(false);
    }
    setInputValue("");
  };

  const handleRemove = (val: SelectOption) => {
    if (isMulti) {
      onChange?.((value as SelectOption[]).filter((v) => v.value !== val.value));
    } else {
      onChange?.(null);
    }
  };

  const handleCreateOption = () => {
    if (!inputValue.trim()) return;
    const newOption: SelectOption = {
      label: inputValue,
      value: inputValue.toLowerCase().replace(/\s+/g, "-"),
    };
    setInternalOptions((prev) => [...prev, newOption]);
    handleSelect(newOption);
  };

  const filteredOptions = internalOptions.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (fetchOptions && inputValue) {
        const fetched = await fetchOptions(inputValue);
        setInternalOptions(fetched);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [inputValue, fetchOptions]);

  const isMultiValue = isMulti && Array.isArray(value);

  return (
    <div
      className={cn("relative w-full", disabled ? "opacity-55 cursor-no-drop" : "")}
      ref={containerRef}
    >
      <div
        className={cn(
          "w-full border rounded-md py-2 px-3 min-h-[40px] bg-background  flex items-center flex-nowrap gap-1 cursor-text",
          error ? "border-destructive" : "border-input",
          styleSettings?.selectBoxClassName,
        )}
        onClick={() => setShowOptions(true)}
      >
        {isMultiValue &&
          (value as SelectOption[]).map((v) => (
            <div
              key={v.value}
              className={cn(
                "text-xs px-2 py-1  rounded-full flex items-center gap-1.5",
                disabled
                  ? "bg-secondary text-secondary-foreground cursor-no-drop"
                  : "bg-black text-white",
                styleSettings?.tagValueClassName,
              )}
            >
              {v.label}
              <X
                className={cn(disabled ? "cursor-no-drop" : "cursor-pointer")}
                size={12}
                onClick={
                  !disabled
                    ? (e) => {
                        e.stopPropagation();
                        handleRemove(v);
                      }
                    : undefined
                }
              />
            </div>
          ))}

        {!isMulti && value && (value as SelectOption)?.label && (
          <span className="text-sm shrink-0 w-fit">{(value as SelectOption).label}</span>
        )}

        <input
          type="text"
          className={cn(
            "w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground text-muted-foreground",
            disabled ? "cursor-no-drop" : "",
            styleSettings?.searchClassName,
          )}
          placeholder={value ? "" : placeholder}
          value={inputValue}
          disabled={disabled}
          onChange={!disabled ? (e) => setInputValue(e.target.value) : undefined}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isCreatable && !disabled) {
              e.preventDefault();
              handleCreateOption();
            }
          }}
        />

        {(isMultiValue && (value as SelectOption[]).length > 0 && !disabled) ||
        (!isMulti && (value as SelectOption)?.value && !disabled) ? (
          <X
            className="w-3 h-3 cursor-pointer shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onChange?.(isMulti ? [] : null);
            }}
          />
        ) : null}

        {isLoading ? (
          <DotsLoading />
        ) : showOptions ? (
          <ChevronUp className="shrink-0" size={14} />
        ) : (
          <ChevronDown className="shrink-0" size={14} />
        )}
      </div>

      <AnimatePresence>
        {showOptions && !disabled && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "absolute z-10 w-full bg-background border mt-1 rounded-md shadow-md max-h-60 overflow-y-auto text-sm",
              dropdownPosition === "bottom" ? "mt-1 top-full" : "mb-1 bottom-full",
            )}
          >
            {filteredOptions.length === 0 && <li className="p-2 text-gray-400">No options</li>}
            {filteredOptions.map((opt, index) => {
              const isSelected = isMulti
                ? (value as SelectOption[])?.some((v) => v.value === opt.value)
                : (value as SelectOption)?.value === opt.value;

              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <li
                  key={`${opt.value}-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelect(opt);
                  }}
                  className={`p-2 flex items-center justify-between gap-2 cursor-pointer hover:bg-secondary   ${
                    disabledOptions.includes(opt.value) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {opt.label}
                  {isSelected && <Check size={14} />}
                </li>
              );
            })}

            {isCreatable && inputValue && !internalOptions.find((o) => o.label === inputValue) && (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <li
                onClick={handleCreateOption}
                className="p-2 text-blue-500 cursor-pointer hover:bg-blue-50 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Create {inputValue}
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
