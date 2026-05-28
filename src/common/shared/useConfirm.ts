"use client";

import { useState, useCallback } from "react";
import type { ConfirmDialogProps } from "./confirm-dialog";

type ConfirmOptions = {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmLabel?: string;
  variant?: ConfirmDialogProps["variant"];
};

export function useConfirm() {
  const [state, setState] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    confirmLabel?: string;
    variant?: ConfirmDialogProps["variant"];
  } | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    setState({ open: true, ...options });
  }, []);

  const handleConfirm = useCallback(() => {
    state?.onConfirm();
    setState(null);
  }, [state]);

  const dialogProps: ConfirmDialogProps = {
    open: !!state,
    onOpenChange: (open: boolean) => { if (!open) setState(null); },
    onConfirm: handleConfirm,
    title: state?.title ?? "",
    description: state?.description ?? "",
    confirmLabel: state?.confirmLabel,
    variant: state?.variant,
  };

  return { confirm, dialogProps };
}
