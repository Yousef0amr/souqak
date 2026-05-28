import { cn } from "@/config/shadcnUtils";

interface InputWithIconsProps extends Omit<React.ComponentProps<"input">, "prefix" | "suffix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: boolean;
  wrapperClassName?: string;
}

const InputWithIcons = ({
  prefix,
  suffix,
  className,
  error,
  wrapperClassName,
  disabled,
  ...props
}: InputWithIconsProps) => {
  return (
    <div
      className={cn(
        "relative flex items-center",
        "h-11 rounded-xl border bg-background",
        "transition-[border-color,box-shadow] duration-200",
        "group",
        // Focus-within ring — mirrors Input focus styles
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        // Hover
        "hover:border-border",
        // Error
        error
          ? "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
          : "border-input",
        // Disabled
        disabled && "opacity-50 pointer-events-none bg-muted/50",
        wrapperClassName
      )}
    >
      {prefix && (
        <div className="absolute left-3 flex items-center justify-center text-muted-foreground group-focus-within:text-primary transition-colors duration-200 pointer-events-none">
          {prefix}
        </div>
      )}

      <input
        className={cn(
          "flex-1 h-full bg-transparent outline-none text-sm",
          "placeholder:text-muted-foreground/60",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          prefix ? "pl-9" : "pl-3.5",
          suffix ? "pr-9" : "pr-3.5",
          className
        )}
        disabled={disabled}
        {...props}
      />

      {suffix && (
        <div className="absolute right-3 flex items-center justify-center text-muted-foreground group-focus-within:text-primary transition-colors duration-200 pointer-events-none">
          {suffix}
        </div>
      )}
    </div>
  );
};

export default InputWithIcons;
