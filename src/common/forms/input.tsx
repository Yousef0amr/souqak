import { cn } from "@/config/shadcnUtils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
  warning?: boolean;
}

function Input({ className, error, type, warning, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base layout
        "flex h-11 w-full min-w-0 rounded-xl",
        "px-3.5 py-2.5 text-sm",
        // Background & border
        "bg-background border",
        // File input
        "file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "file:inline-flex file:h-7 file:items-center",
        // Placeholder
        "placeholder:text-muted-foreground/60",
        // Transition
        "transition-[border-color,box-shadow] duration-200",
        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:text-muted-foreground",
        // Outline
        "outline-none",
        // Error state
        error
          ? [
              "border-destructive",
              "focus-visible:border-destructive",
              "focus-visible:ring-2 focus-visible:ring-destructive/20",
            ]
          : warning
          ? [
              "border-amber-400",
              "focus-visible:border-amber-500",
              "focus-visible:ring-2 focus-visible:ring-amber-400/20",
            ]
          : [
              "border-input",
              "focus-visible:border-primary",
              "focus-visible:ring-2 focus-visible:ring-primary/20",
              "hover:border-border",
            ],
        // Aria invalid
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  );
}

export { Input };
