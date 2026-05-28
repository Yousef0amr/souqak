import * as React from "react";

import { cn } from "@/config/shadcnUtils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Match Input exactly
        "flex w-full min-h-[88px] rounded-xl border border-input bg-background",
        "px-3.5 py-2.5 text-sm",
        "placeholder:text-muted-foreground/60",
        "outline-none transition-[border-color,box-shadow] duration-200",
        // Focus — same glow as Input
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
        // Hover
        "hover:border-border",
        // Invalid
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
        // Resize handle
        "resize-y",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
