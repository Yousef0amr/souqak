import { useState, useMemo } from "react";
import { useUnitConversions, useDeleteUnitConversion } from "./useUnitConversions";
import type { UnitConversion } from "../services/unitConversionsService";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { VisibilityState } from "@tanstack/react-table";

export function useUnitConversionsList() {
  const { data: conversions = [], isLoading } = useUnitConversions();
  const { mutateAsync: deleteConversion } = useDeleteUnitConversion();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [deleteTarget, setDeleteTarget] = useState<UnitConversion | null>(null);

  const { openModal } = useModalStore();

  const filteredConversions = useMemo(() => {
    if (!searchQuery) return conversions;
    const lowerQuery = searchQuery.toLowerCase();
    
    return conversions.filter(
      (c: UnitConversion) =>
        c.fromUnitSymbol.toLowerCase().includes(lowerQuery) ||
        c.toUnitSymbol.toLowerCase().includes(lowerQuery)
    );
  }, [conversions, searchQuery]);

  const handleCreate = () => {
    openModal({
      componentName: "unit-conversion-form",
      modalTitle: "Add Conversion Factor",
      mode: "dialog",
    });
  };

  const handleEdit = (conversion: UnitConversion) => {
    openModal({
      componentName: "unit-conversion-form",
      modalTitle: "Edit Conversion Factor",
      mode: "dialog",
      extraProps: { conversion },
    });
  };

  const handleDeleteClick = (conversion: UnitConversion) => {
    setDeleteTarget(conversion);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteConversion(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return {
    filteredConversions,
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
