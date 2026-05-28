import { useState, useMemo } from "react";
import { useSuppliers, useDeleteSupplier } from "./useSuppliers";
import type { Supplier } from "../services/suppliersService";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { VisibilityState } from "@tanstack/react-table";

export function useSuppliersList() {
  const { data: suppliers = [], isLoading } = useSuppliers();
  const { mutateAsync: deleteSupplier } = useDeleteSupplier();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [deleteTarget, setDeleteTarget] = useState<Supplier | null>(null);

  const { openModal } = useModalStore();

  const filteredSuppliers = useMemo(() => {
    if (!searchQuery) return suppliers;
    const lowerQuery = searchQuery.toLowerCase();
    
    return suppliers.filter(
      (supplier: Supplier) =>
        supplier.nameEn.toLowerCase().includes(lowerQuery) ||
        (supplier.nameAr && supplier.nameAr.toLowerCase().includes(lowerQuery)) ||
        (supplier.contactPerson && supplier.contactPerson.toLowerCase().includes(lowerQuery)) ||
        (supplier.email && supplier.email.toLowerCase().includes(lowerQuery)) ||
        (supplier.phone && supplier.phone.includes(searchQuery))
    );
  }, [suppliers, searchQuery]);

  const handleCreate = () => {
    openModal({
      componentName: "supplier-form",
      modalTitle: "Add Supplier Account",
      mode: "dialog",
    });
  };

  const handleEdit = (supplier: Supplier) => {
    openModal({
      componentName: "supplier-form",
      modalTitle: "Edit Supplier Profile",
      mode: "dialog",
      extraProps: { supplier },
    });
  };

  const handleDeleteClick = (supplier: Supplier) => {
    setDeleteTarget(supplier);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteSupplier(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return {
    filteredSuppliers,
    isLoading,
    searchQuery,
    setSearchQuery,
    columnVisibility,
    setColumnVisibility,
    deleteTarget,
    setDeleteTarget,
    handleCreate,
    handleEdit,
    handleDeleteClick,
    confirmDelete,
  };
}
