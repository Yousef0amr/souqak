"use client";

import React, { useState } from "react";
import { useCategories, useDeleteCategory, type Category } from "../index";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/shared/card";
import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";
import { Plus, Layers, Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/common/shared/confirm-dialog";
import { useModalStore } from "@/shared/stores/DynamicModalStore";

export function CategoriesList() {
  const { data: categories = [], isLoading } = useCategories();
  const deleteMutation = useDeleteCategory();
  const { openModal } = useModalStore();
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const handleAdd = () => {
    openModal({
      componentName: "category-form",
      modalTitle: "Add Category",
      mode: "dialog",
      extraProps: { category: { nameEn: "", nameAr: "", code: "" } },
    });
  };

  const handleEdit = (category: Category) => {
    openModal({
      componentName: "category-form",
      modalTitle: "Edit Category",
      mode: "dialog",
      extraProps: { category },
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2"><Layers className="h-5 w-5" /> Product Categories</CardTitle>
            <CardDescription>Manage your product categories and hierarchy.</CardDescription>
          </div>
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Category
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {isLoading && <div className="text-sm text-muted-foreground p-4">Loading categories...</div>}
            {!isLoading && categories.length === 0 && <div className="text-sm text-muted-foreground p-4">No categories configured.</div>}
            {categories.map((cat: Category) => (
              <div key={cat.id} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card">
                <div><div className="font-semibold text-sm">{cat.nameEn} / {cat.nameAr}</div><div className="text-muted-foreground text-xs font-mono">{cat.code}</div></div>
                <div className="flex items-center gap-2">
                  <Badge>Category</Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(cat)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
          setDeleteTarget(null);
        }}
        title="Delete Category"
        description={`Are you sure you want to delete "${deleteTarget?.nameEn}"?`}
      />
    </div>
  );
}
