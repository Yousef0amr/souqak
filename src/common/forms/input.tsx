import { cn } from "@/config/shadcnUtils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
  warning?: boolean;
}

function Input({ className, error, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-10 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        error
          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
          : "border-input focus-visible:border-ring focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
