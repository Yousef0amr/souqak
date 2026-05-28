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
import { ReactNode } from "react";

interface FormFieldWrapperProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<any>;
  name: Path<TFieldValues>;
  label?: string | (() => ReactNode);
  className?: string;
  childrenClassName?: string;
  note?: string;
  optional?: boolean;
  children: (field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>) => ReactNode;
  /** @deprecated - errors now always show */
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
}: FormFieldWrapperProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {label !== undefined && (
            typeof label === "string" ? (
              <FormLabel>
                {label}
                {optional && (
                  <span className="ml-1 text-[11px] font-normal text-muted-foreground/70 tracking-wide">
                    (optional)
                  </span>
                )}
              </FormLabel>
            ) : (
              label()
            )
          )}

          <FormControl className={cn("w-full", childrenClassName)}>
            {children(field)}
          </FormControl>

          {note && <FormDescription>{note}</FormDescription>}

          {/* Always show errors — no focus gating */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
