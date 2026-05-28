import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/config/shadcnUtils";

const buttonVariants = cva(
  [
    // Base
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-xl text-sm font-semibold",
    // Transition — lift + color
    "transition-all duration-200",
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
        // ── Primary — solid, lifts on hover
        default: [
          "bg-primary text-primary-foreground",
          "shadow-[0_1px_3px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "hover:brightness-110 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]",
          "active:translate-y-0 active:brightness-100",
        ].join(" "),

        // ── Destructive — red, same lift
        destructive: [
          "bg-destructive text-white",
          "shadow-[0_1px_3px_rgba(239,68,68,0.3)]",
          "hover:bg-destructive/90 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(239,68,68,0.3)]",
          "active:translate-y-0",
          "focus-visible:ring-destructive/40",
        ].join(" "),

        // ── Outline — bordered, ghost fill on hover
        outline: [
          "border-2 border-border bg-transparent text-foreground",
          "hover:bg-muted hover:border-border hover:-translate-y-px",
          "active:translate-y-0",
        ].join(" "),

        // ── Secondary — muted fill
        secondary: [
          "bg-secondary text-secondary-foreground",
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
