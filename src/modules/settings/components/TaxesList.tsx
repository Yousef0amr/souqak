"use client";

import React, { useState } from "react";
import { useTaxes, useDeleteTax, type Tax } from "../index";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/shared/card";
import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";
import { Plus, Percent, Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/common/shared/confirm-dialog";
import { useModalStore } from "@/shared/stores/DynamicModalStore";

export function TaxesList() {
  const { data: taxes = [], isLoading } = useTaxes();
  const deleteMutation = useDeleteTax();
  const { openModal } = useModalStore();
  const [deleteTarget, setDeleteTarget] = useState<Tax | null>(null);

  const handleAdd = () => {
    openModal({
      componentName: "tax-form",
      modalTitle: "Add Tax",
      mode: "dialog",
      extraProps: { tax: { name: "", rate: 0 } },
    });
  };

  const handleEdit = (tax: Tax) => {
    openModal({
      componentName: "tax-form",
      modalTitle: "Edit Tax",
      mode: "dialog",
      extraProps: { tax },
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2"><Percent className="h-5 w-5" /> VAT & Taxes</CardTitle>
            <CardDescription>Manage your store's tax rates and logic.</CardDescription>
          </div>
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Tax
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {isLoading && <div className="text-sm text-muted-foreground p-4">Loading taxes...</div>}
            {!isLoading && taxes.length === 0 && <div className="text-sm text-muted-foreground p-4">No taxes configured.</div>}
            {taxes.map((tax: Tax) => (
              <div key={tax.id} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card">
                <div><div className="font-semibold text-sm">{tax.name}</div></div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">{tax.rate}% VAT</Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(tax)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(tax)}><Trash2 className="h-4 w-4" /></Button>
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
        title="Delete Tax"
        description={`Are you sure you want to delete "${deleteTarget?.name}"?`}
      />
    </div>
  );
}
