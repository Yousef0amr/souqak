import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/config/shadcnUtils";

/**
 * Glass Button — liquid-glass styling driven by per-theme tokens
 * (see `--glass-*` in globals.css). Preserves the shadcn Button API:
 * variants { default, destructive, outline, secondary, ghost, link },
 * sizes, `asChild`, and `data-slot="button"`.
 */
const buttonVariants = cva(
  [
    // Base
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-xl text-sm font-semibold",
    // Transition
    "transition-all duration-200 ease-out",
    // Focus ring
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-1",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
    // SVG
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    // Cursor
    "cursor-pointer select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // ── Default — frosted primary fill with glass sheen
        default: [
          "text-primary-foreground",
          "bg-primary shadow-[0_4px_16px_var(--shadow-1)]",
          "hover:brightness-110 hover:-translate-y-px hover:shadow-[0_6px_20px_var(--shadow-1)]",
          "active:translate-y-0 active:brightness-100",
          "before:absolute before:inset-0 before:rounded-xl before:pointer-events-none before:opacity-60",
          "before:bg-linear-to-b before:from-white/25 before:to-transparent",
        ].join(" "),

        // ── Destructive — red glass
        destructive: [
          "bg-destructive text-white",
          "shadow-[0_4px_16px_rgba(239,68,68,0.3)]",
          "hover:bg-destructive/90 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(239,68,68,0.35)]",
          "active:translate-y-0",
          "focus-visible:ring-destructive/40",
          "before:absolute before:inset-0 before:rounded-xl before:pointer-events-none before:opacity-50",
          "before:bg-linear-to-b before:from-white/20 before:to-transparent",
        ].join(" "),

        // ── Outline — glass-bordered, fill on hover
        outline: [
          "border bg-[var(--glass-bg-strong)] text-foreground backdrop-blur-xl",
          "border-[var(--glass-border-strong)] shadow-[var(--glass-inset)]",
          "hover:-translate-y-px hover:bg-[var(--glass-bg)]",
          "active:translate-y-0",
        ].join(" "),

        // ── Secondary — muted glass fill
        secondary: [
          "bg-secondary text-secondary-foreground backdrop-blur-md",
          "hover:bg-secondary/80 hover:-translate-y-px",
          "active:translate-y-0",
        ].join(" "),

        // ── Ghost — no chrome until hover
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-accent hover:text-accent-foreground",
        ].join(" "),

        // ── Link
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3.5",
        sm:      "h-8 rounded-lg gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg:      "h-11 rounded-xl px-6 has-[>svg]:px-4 text-base",
        icon:    "size-10 rounded-xl",
        "icon-sm": "size-8 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
