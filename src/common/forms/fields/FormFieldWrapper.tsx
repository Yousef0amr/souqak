"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/common/forms/form";
import { cn } from "@/config/shadcnUtils";
import { Control, FieldValues, ControllerRenderProps, Path } from "react-hook-form";
import { ReactNode, useState } from "react";

interface FormFieldWrapperProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<any>;
  name: Path<TFieldValues>;
  label?: string | (() => ReactNode);
  className?: string;
  childrenClassName?: string;
  note?: string;
  optional?: boolean;
  children: (field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>) => ReactNode;
  showErrorOnFocus?: boolean;
}

export const FormFieldWrapper = ({
  control,
  name,
  label,
  className,
  childrenClassName,
  note,
  optional,
  children,
  showErrorOnFocus = true,
}: FormFieldWrapperProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("w-full", className)}>
          {typeof label === "string" ? (
            <FormLabel className={"text-sm font-medium text-foreground "}>
              <span className="flex items-center ">
                {label}
                {optional && <span className="ml-1 text-sm text-foreground">(Optional)</span>}
              </span>
            </FormLabel>
          ) : (
            label?.()
          )}

          <FormControl
            className={cn("w-full", childrenClassName)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {children(field)}
          </FormControl>

          {note && (
            <FormDescription className="mt-1 text-neutral-400 text-xs">{note}</FormDescription>
          )}

          {fieldState.error && ((showErrorOnFocus && isFocused) || !showErrorOnFocus) && (
            <FormMessage className="text-red-500 text-[0.75rem] mx-1 mt-1" />
          )}
        </FormItem>
      )}
    />
  );
};
