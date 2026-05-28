"use client";

import React, { useState } from "react";
import {
  useCategories,
  useDeleteCategory,
  useBrands,
  useDeleteBrand,
  useUnits,
  useDeleteUnit,
  useTaxes,
  useDeleteTax,
  type Category,
  type Brand,
  type Unit,
  type Tax,
} from "../index";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/shared/card";
import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";
import { Plus, Layers, Ruler, Percent, Award, Trash2, Pencil } from "lucide-react";
import { ConfirmDialog } from "@/common/shared/confirm-dialog";
import { useModalStore } from "@/shared/stores/DynamicModalStore";

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState<"categories" | "brands" | "units" | "taxes">("categories");
  const { openModal } = useModalStore();

  const { data: categories = [], isLoading: isLoadingCats } = useCategories();
  const { data: brands = [], isLoading: isLoadingBrands } = useBrands();
  const { data: units = [], isLoading: isLoadingUnits } = useUnits();
  const { data: taxes = [], isLoading: isLoadingTaxes } = useTaxes();

  const deleteCatMutation = useDeleteCategory();
  const deleteBrandMutation = useDeleteBrand();
  const deleteUnitMutation = useDeleteUnit();
  const deleteTaxMutation = useDeleteTax();

  const [deleteTarget, setDeleteTarget] = useState<{ type: string; item: any } | null>(null);

  const handleEdit = (type: string, item: any) => {
    const config = {
      categories: { componentName: "category-form", title: "Edit Category", prop: { category: item } },
      brands: { componentName: "brand-form", title: "Edit Brand", prop: { brand: item } },
      units: { componentName: "unit-form", title: "Edit Unit", prop: { unit: item } },
      taxes: { componentName: "tax-form", title: "Edit Tax", prop: { tax: item } },
    }[type];
    
    if (config) {
      openModal({
        componentName: config.componentName,
        modalTitle: config.title,
        mode: "dialog",
        extraProps: config.prop,
      });
    }
  };

  const handleAdd = (type: string) => {
    const config = {
      categories: { componentName: "category-form", title: "Add Category", prop: { category: { nameEn: "", nameAr: "", code: "" } } },
      brands: { componentName: "brand-form", title: "Add Brand", prop: { brand: { nameEn: "", nameAr: "", description: "" } } },
      units: { componentName: "unit-form", title: "Add Unit", prop: { unit: { nameEn: "", nameAr: "", abbreviation: "" } } },
      taxes: { componentName: "tax-form", title: "Add Tax", prop: { tax: { name: "", rate: 0 } } },
    }[type];
    
    if (config) {
      openModal({
        componentName: config.componentName,
        modalTitle: config.title,
        mode: "dialog",
        extraProps: config.prop,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap border-b border-border">
        <button onClick={() => setActiveTab("categories")} className={`px-4 py-2 text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all ${activeTab === "categories" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}><Layers className="h-4 w-4" />Product Categories</button>
        <button onClick={() => setActiveTab("brands")} className={`px-4 py-2 text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all ${activeTab === "brands" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}><Award className="h-4 w-4" />Product Brands</button>
        <button onClick={() => setActiveTab("units")} className={`px-4 py-2 text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all ${activeTab === "units" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}><Ruler className="h-4 w-4" />Measurement Units</button>
        <button onClick={() => setActiveTab("taxes")} className={`px-4 py-2 text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all ${activeTab === "taxes" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}><Percent className="h-4 w-4" />VAT & Taxes</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Active Systems</CardTitle>
                <CardDescription>Currently deployed POS database records (Real-time API)</CardDescription>
              </div>
              <Button onClick={() => handleAdd(activeTab)} size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add New
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeTab === "categories" && (
                <div className="space-y-2">
                  {isLoadingCats && <div className="text-sm text-muted-foreground p-4">Loading categories...</div>}
                  {!isLoadingCats && categories.length === 0 && <div className="text-sm text-muted-foreground p-4">No categories configured in API.</div>}
                  {categories.map((cat: Category) => (
                    <div key={cat.id} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card">
                      <div><div className="font-semibold text-sm">{cat.nameEn} / {cat.nameAr}</div><div className="text-muted-foreground text-xs font-mono">{cat.code}</div></div>
                      <div className="flex items-center gap-2"><Badge>Category</Badge><Button variant="ghost" size="icon" onClick={() => handleEdit("categories", cat)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget({ type: "category", item: cat })}><Trash2 className="h-4 w-4" /></Button></div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "brands" && (
                <div className="space-y-2">
                  {isLoadingBrands && <div className="text-sm text-muted-foreground p-4">Loading brands...</div>}
                  {!isLoadingBrands && brands.length === 0 && <div className="text-sm text-muted-foreground p-4">No brands configured in API.</div>}
                  {brands.map((brand: Brand) => (
                    <div key={brand.id} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card">
                      <div><div className="font-semibold text-sm">{brand.nameEn} / {brand.nameAr}</div><div className="text-muted-foreground text-xs">{brand.description || "No description"}</div></div>
                      <div className="flex items-center gap-2"><Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-200">Brand</Badge><Button variant="ghost" size="icon" onClick={() => handleEdit("brands", brand)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget({ type: "brand", item: brand })}><Trash2 className="h-4 w-4" /></Button></div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "units" && (
                <div className="space-y-2">
                  {isLoadingUnits && <div className="text-sm text-muted-foreground p-4">Loading units...</div>}
                  {!isLoadingUnits && units.length === 0 && <div className="text-sm text-muted-foreground p-4">No units configured in API.</div>}
                  {units.map((unit: Unit) => (
                    <div key={unit.id} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card">
                      <div><div className="font-semibold text-sm">{unit.nameEn} ({unit.nameAr})</div><div className="text-muted-foreground text-xs font-mono">{unit.abbreviation}</div></div>
                      <div className="flex items-center gap-2"><Badge variant="secondary">Unit</Badge><Button variant="ghost" size="icon" onClick={() => handleEdit("units", unit)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget({ type: "unit", item: unit })}><Trash2 className="h-4 w-4" /></Button></div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "taxes" && (
                <div className="space-y-2">
                  {isLoadingTaxes && <div className="text-sm text-muted-foreground p-4">Loading taxes...</div>}
                  {!isLoadingTaxes && taxes.length === 0 && <div className="text-sm text-muted-foreground p-4">No taxes configured in API.</div>}
                  {taxes.map((tax: Tax) => (
                    <div key={tax.id} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card">
                      <div><div className="font-semibold text-sm">{tax.name}</div></div>
                      <div className="flex items-center gap-2"><Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">{tax.rate}% VAT</Badge><Button variant="ghost" size="icon" onClick={() => handleEdit("taxes", tax)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget({ type: "tax", item: tax })}><Trash2 className="h-4 w-4" /></Button></div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        onConfirm={() => {
          if (!deleteTarget) return;
          const { type, item } = deleteTarget;
          if (type === "category") deleteCatMutation.mutate(item.id);
          else if (type === "brand") deleteBrandMutation.mutate(item.id);
          else if (type === "unit") deleteUnitMutation.mutate(item.id);
          else if (type === "tax") deleteTaxMutation.mutate(item.id);
          setDeleteTarget(null);
        }}
        title={`Delete ${deleteTarget?.type || "item"}`}
        description={`Are you sure you want to delete "${deleteTarget?.item?.nameEn || deleteTarget?.item?.name}"?`}
      />
    </div>
  );
}
