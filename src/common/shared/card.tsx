import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/config/shadcnUtils";

/**
 * Glass Card — liquid-glass surface driven by per-theme tokens.
 * Keeps the shadcn Card API: Card + CardHeader/Title/Description/
 * Content/Footer, and the `cardVariants` CVA with the same variants.
 * `glass` is now the default and uses theme-aware tokens so it reads
 * correctly on both light and dark backgrounds.
 */
const cardVariants = cva(
  [
    "relative overflow-hidden rounded-xl text-card-foreground",
    "transition-all duration-300",
  ].join(" "),
  {
    variants: {
      variant: {
        // ── Default — frosted liquid glass (theme-aware)
        default: [
          "border bg-[var(--glass-bg)] backdrop-blur-xl",
          "border-[var(--glass-border)] shadow-[var(--glass-inset),var(--glass-shadow)]",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:opacity-60",
          "before:bg-linear-to-b before:from-[var(--glass-highlight)] before:to-transparent",
        ].join(" "),
        // ── Elevated — glass + lift on hover
        elevated: [
          "border bg-[var(--glass-bg-strong)] backdrop-blur-xl cursor-default",
          "border-[var(--glass-border-strong)]",
          "shadow-[var(--glass-inset),var(--glass-shadow)]",
          "hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.25)]",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:opacity-70",
          "before:bg-linear-to-b before:from-[var(--glass-highlight)] before:to-transparent",
        ].join(" "),
        // ── Glass — explicit alias of the frosted look
        glass: [
          "border bg-[var(--glass-bg)] backdrop-blur-xl",
          "border-[var(--glass-border)] shadow-[var(--glass-inset),var(--glass-shadow)]",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:opacity-60",
          "before:bg-linear-to-b before:from-[var(--glass-highlight)] before:to-transparent",
        ].join(" "),
        // ── Outline — minimal bordered container
        outline: "border-2 border-border bg-transparent shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type CardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-header"
      className={cn("relative z-10 flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-content"
      className={cn("relative z-10 p-6 pt-0", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-footer"
      className={cn("relative z-10 flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
