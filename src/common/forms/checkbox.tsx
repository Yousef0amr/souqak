"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/config/shadcnUtils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base
        "peer size-5 shrink-0 rounded-md border",
        "bg-[var(--glass-bg-strong)] backdrop-blur-md shadow-[var(--glass-inset)]",
        "border-[var(--glass-border-strong)]",
        // Transition
        "transition-all duration-150",
        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary",
        // Checked state
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        "data-[state=checked]:text-primary-foreground",
        "data-[state=checked]:shadow-[0_0_0_3px_rgb(var(--primary)/0.15)]",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Invalid
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="size-3.5 stroke-[2.5]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
