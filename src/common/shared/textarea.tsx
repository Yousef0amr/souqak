import * as React from "react";

import { cn } from "@/config/shadcnUtils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Match Glass Input
        "flex w-full min-h-[88px] rounded-xl border bg-[var(--glass-bg)] backdrop-blur-xl text-foreground",
        "px-3.5 py-2.5 text-sm shadow-[var(--glass-inset)]",
        "placeholder:text-muted-foreground/60",
        "outline-none transition-[border-color,box-shadow,background-color] duration-200",
        "border-[var(--glass-border-strong)]",
        // Focus — same glow as Input
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:bg-[var(--glass-bg-strong)]",
        // Hover
        "hover:border-[var(--glass-border-strong)]",
        // Invalid
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Resize handle
        "resize-y",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
