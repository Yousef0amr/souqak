import * as React from "react";
import { cn } from "@/config/shadcnUtils";
import { Button, buttonVariants } from "./button";
import type { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

interface DefaultButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loader?: () => React.ReactNode;
  asChild?: boolean;
}

/**
 * DefaultButton — extends Button with a `loading` prop and optional custom `loader` slot.
 * Usage: <DefaultButton loading={isLoading} loader={() => <LoaderCircle className="animate-spin" />}>Submit</DefaultButton>
 */
const DefaultButton = ({
  loading = false,
  loader,
  children,
  disabled,
  className,
  variant,
  size,
  ...props
}: DefaultButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={loading || disabled}
      className={cn("relative", className)}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          {loader ? (
            loader()
          ) : (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          {children}
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

export default DefaultButton;
