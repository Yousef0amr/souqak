"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogBody,
} from "@/common/models/dialog";
import { Button } from "@/common/buttons/button";
import { AlertTriangle, Trash2, Info, Loader2 } from "lucide-react";
import { cn } from "@/config/shadcnUtils";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "destructive" | "warning" | "info";
  isLoading?: boolean;
}

const VARIANT_CONFIG = {
  destructive: {
    icon: Trash2,
    confirmClass: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    defaultLabel: "Delete",
  },
  warning: {
    icon: AlertTriangle,
    confirmClass: "bg-amber-600 text-white hover:bg-amber-700",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    defaultLabel: "Proceed",
  },
  info: {
    icon: Info,
    confirmClass: "bg-primary text-primary-foreground hover:bg-primary/90",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    defaultLabel: "Confirm",
  },
} as const;

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  variant = "destructive",
  isLoading = false,
}: ConfirmDialogProps) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3.5">
            {/* Variant icon circle */}
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full animate-scale-in",
                config.iconBg
              )}
            >
              <Icon className={cn("h-5 w-5", config.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle>{title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <DialogBody>
          <DialogDescription className="text-sm leading-relaxed">
            {description}
          </DialogDescription>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="sm:w-auto"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(config.confirmClass, "sm:w-auto")}
          >
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {confirmLabel || config.defaultLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
