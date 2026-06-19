"use client";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { Suspense } from "react";
import { Skeleton } from "@/common/shared/skeleton";

// Premium shimmer loading fallback
function ModalLoadingFallback() {
  return (
    <div className="space-y-3 py-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-10 w-full mt-4" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
import {
  Dialog,
  DialogBody,
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

import AddProducts from "@/modules/products/pages/AddProducts";
import EditProductForm from "@/modules/products/components/edit-product/EditProductForm";
import SupplierForm from "@/modules/suppliers/components/SupplierForm";
import UnitConversionForm from "@/modules/unit-conversions/components/UnitConversionForm";
import CategoryForm from "@/modules/settings/components/CategoryForm";
import BrandForm from "@/modules/settings/components/BrandForm";
import UnitForm from "@/modules/settings/components/UnitForm";
import TaxForm from "@/modules/settings/components/TaxForm";
import CustomerForm from "@/modules/customers/components/CustomerForm";
import ExpenseCategoryForm from "@/modules/expense-categories/components/ExpenseCategoryForm";
import StoreForm from "@/modules/stores/components/StoreForm";
import ProductDetailsDrawer from "@/modules/products/components/shared/ProductDetailsDrawer";
import AuditLogDetailsModal from "@/modules/audit-logs/components/molecules/AuditLogDetailsModal";
import CreateRoleForm from "@/modules/roles/components/molecules/CreateRoleDialog";
import EditRoleForm from "@/modules/roles/components/molecules/EditRoleForm";

const componentsMap: Record<string, React.ComponentType<any>> = {
  "add-product": AddProducts,
  "edit-product": EditProductForm as React.ComponentType<any>,
  "supplier-form": SupplierForm,
  "unit-conversion-form": UnitConversionForm,
  "category-form": CategoryForm,
  "brand-form": BrandForm,
  "unit-form": UnitForm,
  "tax-form": TaxForm,
  "customer-form": CustomerForm,
  "expense-category-form": ExpenseCategoryForm,
  "store-form": StoreForm,
  "product-details-drawer": ProductDetailsDrawer,
  "audit-log-details": AuditLogDetailsModal,
  "create-role-form": CreateRoleForm,
  "edit-role-form": EditRoleForm,
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
    extraProps,
    mode = "dialog",
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
            "w-[400px] sm:max-w-[600px] overflow-hidden border-l border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl p-6",
            modalContentClassName,
            withCloseBtn ? "" : "[&>button]:hidden"
          )}
        >
          {!modalTitle && <SheetTitle className="sr-only">Sheet</SheetTitle>}
          {(modalTitle || modalDescription) && (
            <SheetHeader className={cn(hideModalTitle && "hidden", "mb-6")}>
              {modalTitle && (
                <SheetTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {modalTitle}
                </SheetTitle>
              )}
              {modalDescription && <SheetDescription>{modalDescription}</SheetDescription>}
            </SheetHeader>
          )}

          {ComponentToRender && (
            <Suspense fallback={<ModalLoadingFallback />}>
              <ComponentToRender {...(extraProps || {})} />
            </Suspense>
          )}

          {modalWithFooter && modalFooterContent && <SheetFooter>{modalFooterContent}</SheetFooter>}
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
          // Use card bg for proper theme matching (not bg-background/95 which loses contrast)
          "bg-card border-border/60 shadow-2xl",
          modalContentClassName,
          withCloseBtn ? "" : "[&>button]:hidden"
        )}
      >
        {!modalTitle && <DialogTitle className="sr-only">Dialog</DialogTitle>}
        {(modalTitle || modalDescription) && (
          <DialogHeader className={cn(hideModalTitle && "hidden")}>
            {modalTitle && (
              <DialogTitle className="text-lg font-semibold text-foreground">
                {modalTitle}
              </DialogTitle>
            )}
            {modalDescription && <DialogDescription>{modalDescription}</DialogDescription>}
          </DialogHeader>
        )}

        <DialogBody>
          {ComponentToRender && (
            <Suspense fallback={<ModalLoadingFallback />}>
              <ComponentToRender {...(extraProps || {})} />
            </Suspense>
          )}
        </DialogBody>

        {modalWithFooter && modalFooterContent && <DialogFooter>{modalFooterContent}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
