"use client";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/common/models/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/common/shared/sheet";
import { cn } from "@/config/shadcnUtils";

import AddProducts from "@/features/products/pages/AddProducts";

const componentsMap: Record<string, React.ComponentType<unknown>> = {
  "add-product": AddProducts,
};

export function DynamicModalContent() {
  const {
    isOpen,
    componentName,
    modalTitle,
    modalDescription,
    withCloseBtn,
    modalWithFooter,
    modalFooterContent,
    closeModal,
    modalContentClassName,
    hideModalTitle,
    enableOutsideClick,
    mode = "dialog", // default
    sheetSide = "right",
  } = useModalStore();

  const ComponentToRender = componentName
    ? componentsMap[componentName]
    : () => <div>content not found</div>;

  if (mode === "sheet") {
    return (
      <Sheet open={isOpen} onOpenChange={closeModal}>
        <SheetContent
          side={sheetSide}
          onInteractOutside={(e) => {
            if (enableOutsideClick) closeModal();
            else e.preventDefault();
          }}
          className={cn(
            "w-[400px] sm:max-w-[600px] overflow-hidden",
            modalContentClassName,
            withCloseBtn ? "" : "[&>button]:hidden",
          )}
        >
          {(modalTitle || modalDescription) && (
            <SheetHeader className={cn(hideModalTitle && "hidden")}>
              {modalTitle && <SheetTitle>{modalTitle}</SheetTitle>}
              {modalDescription && (
                <SheetDescription>{modalDescription}</SheetDescription>
              )}
            </SheetHeader>
          )}

          {ComponentToRender && (
            <Suspense fallback={<div>Loading...</div>}>
              <ComponentToRender />
            </Suspense>
          )}

          {modalWithFooter && modalFooterContent && (
            <SheetFooter>{modalFooterContent}</SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    );
  }

  // fallback = dialog mode
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent
        onInteractOutside={(e) => {
          if (enableOutsideClick) closeModal();
          else e.preventDefault();
        }}
        className={cn(
          "sm:max-w-[600px] overflow-hidden",
          modalContentClassName,
          withCloseBtn ? "" : "[&>button]:hidden",
        )}
      >
        {(modalTitle || modalDescription) && (
          <DialogHeader className={cn(hideModalTitle && "hidden")}>
            {modalTitle && <DialogTitle>{modalTitle}</DialogTitle>}
          </DialogHeader>
        )}
        {modalDescription && (
          <DialogDescription>{modalDescription}</DialogDescription>
        )}

        {ComponentToRender && (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentToRender />
          </Suspense>
        )}

        {modalWithFooter && modalFooterContent && (
          <DialogFooter>{modalFooterContent}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
