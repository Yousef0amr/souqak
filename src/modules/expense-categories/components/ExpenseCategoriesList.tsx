"use client";

import React, { useMemo } from "react";
import { DataTable } from "@/common/tables/DataTable";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { Search, Plus } from "lucide-react";
import { ConfirmDialog } from "@/common/shared/confirm-dialog";
import { getExpenseCategoryColumns } from "../utils/expenseCategoriesColumns";
import { useExpenseCategoriesList } from "../hooks/useExpenseCategoriesList";

export function ExpenseCategoriesList() {
  const {
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
  } = useExpenseCategoriesList();

  const columns = useMemo(
    () => getExpenseCategoryColumns({ onEdit: handleEdit, onDelete: handleDeleteClick }),
    [handleEdit, handleDeleteClick]
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 max-w-sm w-full relative">
          <Search className="h-4 w-4 text-muted-foreground absolute left-3" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Category
        </Button>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
        <DataTable
          data={filteredCategories}
          columns={columns}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          isLoading={isLoading}
          scrollAreaClassName="h-[500px]"
        />
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={confirmDelete}
        title="Delete category"
        description={`Are you sure you want to delete "${deleteTarget?.nameEn}"?`}
      />
    </div>
  );
}
