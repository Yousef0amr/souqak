import { useState, useMemo } from "react";
import { useExpenseCategories, useDeleteExpenseCategory } from "./useExpenseCategories";
import type { ExpenseCategory } from "../services/expenseCategoriesService";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { VisibilityState } from "@tanstack/react-table";

export function useExpenseCategoriesList() {
  const { data: categories = [], isLoading } = useExpenseCategories();
  const { mutateAsync: deleteCategory } = useDeleteExpenseCategory();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [deleteTarget, setDeleteTarget] = useState<ExpenseCategory | null>(null);

  const { openModal } = useModalStore();

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    const query = searchQuery.toLowerCase();
    return categories.filter(
      (c) =>
        c.nameEn.toLowerCase().includes(query) ||
        (c.nameAr && c.nameAr.toLowerCase().includes(query))
    );
  }, [categories, searchQuery]);

  const handleCreate = () => {
    openModal({
      componentName: "expense-category-form",
      modalTitle: "New Expense Category",
      mode: "dialog",
    });
  };

  const handleEdit = (category: ExpenseCategory) => {
    openModal({
      componentName: "expense-category-form",
      modalTitle: "Edit Category",
      mode: "dialog",
      extraProps: { category },
    });
  };

  const handleDeleteClick = (category: ExpenseCategory) => {
    setDeleteTarget(category);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteCategory(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return {
    filteredCategories,
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
