import { cn } from "@/config/shadcnUtils";
import { FieldErrorMsg } from "./FieldErrorMsg";
import { Label } from "@/common/shared/label";
import { useState, useRef } from "react";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  labelWrapperClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  childrenClassName?: string;
  children: React.ReactNode;
  error?: string[] | [] | any;
  validated?: boolean;
  optional?: boolean;
  note?: string;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, "className" | "children">;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const {
    label,
    labelWrapperClassName,
    childrenClassName,
    labelClassName,
    error = [],
    validated = false,
    className,
    children,
    note,
    optional,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    if (!error?.length && !validated) return;
    setIsFocused(true);
  };

  // const handleBlur = () => {
  //   setTimeout(() => {
  //     const active = document.activeElement;
  //     if (wrapperRef.current && !wrapperRef.current.contains(active)) {
  //       setIsFocused(false);
  //     }
  //   }, 0);
  // };

  return (
    <div
      ref={wrapperRef}
      className={cn("w-full", className)}
      onFocus={handleFocus}
      // onBlur={handleBlur}
    >
      {label && (
        <Label className={cn("w-full text-sm font-normal", labelWrapperClassName)}>
          <p className={cn("h-10", labelClassName)}>
            <span className="flex items-center h-full">{label}</span>
            {optional && <span className="mx-2">OPTIONAL</span>}
          </p>
        </Label>
      )}

      <div className={cn("w-full", childrenClassName)}>{children}</div>

      {note && <p className="mt-1 text-neutral-400 text-xs">{note}</p>}

      {isFocused && <FieldErrorMsg validated={validated} errorMessages={error} />}
    </div>
  );
};
