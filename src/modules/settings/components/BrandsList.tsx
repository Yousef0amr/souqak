"use client";

import React, { useState } from "react";
import { useBrandsList, useDeleteBrand } from "../../brands/hooks/useBrands";
import type { BrandDto } from "../../brands/types/brand";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/shared/card";
import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";
import { Plus, Award, Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/common/shared/confirm-dialog";
import { useModalStore } from "@/shared/stores/DynamicModalStore";

export function BrandsList() {
  const { data: brands = [], isLoading } = useBrandsList();
  const deleteMutation = useDeleteBrand();
  const { openModal } = useModalStore();
  const [deleteTarget, setDeleteTarget] = useState<BrandDto | null>(null);

  const handleAdd = () => {
    openModal({
      componentName: "brand-form",
      modalTitle: "Add Brand",
      mode: "dialog",
      extraProps: { brand: { nameEn: "", nameAr: "", description: "" } },
    });
  };

  const handleEdit = (brand: BrandDto) => {
    openModal({
      componentName: "brand-form",
      modalTitle: "Edit Brand",
      mode: "dialog",
      extraProps: { brand },
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2"><Award className="h-5 w-5" /> Product Brands</CardTitle>
            <CardDescription>Manage brands associated with your products.</CardDescription>
          </div>
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Brand
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {isLoading && <div className="text-sm text-muted-foreground p-4">Loading brands...</div>}
            {!isLoading && brands.length === 0 && <div className="text-sm text-muted-foreground p-4">No brands configured.</div>}
            {brands.map((brand: BrandDto) => (
              <div key={brand.id} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card">
                <div><div className="font-semibold text-sm">{brand.nameEn} / {brand.nameAr}</div><div className="text-muted-foreground text-xs">{brand.descriptionEn || "No description"}</div></div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-200">Brand</Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(brand)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(brand)}><Trash2 className="h-4 w-4" /></Button>
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
          if (deleteTarget && deleteTarget.id) deleteMutation.mutate(deleteTarget.id);
          setDeleteTarget(null);
        }}
        title="Delete Brand"
        description={`Are you sure you want to delete "${deleteTarget?.nameEn}"?`}
      />
    </div>
  );
}
