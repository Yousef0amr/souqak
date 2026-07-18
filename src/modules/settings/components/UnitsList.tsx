"use client";

import React, { useState } from "react";
import { useUnits, useDeleteUnit, type Unit } from "../index";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/shared/card";
import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";
import { Plus, Ruler, Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/common/shared/confirm-dialog";
import { useModalStore } from "@/shared/stores/DynamicModalStore";

export function UnitsList() {
  const { data: units = [], isLoading } = useUnits();
  const deleteMutation = useDeleteUnit();
  const { openModal } = useModalStore();
  const [deleteTarget, setDeleteTarget] = useState<Unit | null>(null);

  const handleAdd = () => {
    openModal({
      componentName: "unit-form",
      modalTitle: "Add Unit",
      mode: "dialog",
      extraProps: { unit: { nameEn: "", nameAr: "", abbreviation: "" } },
    });
  };

  const handleEdit = (unit: Unit) => {
    openModal({
      componentName: "unit-form",
      modalTitle: "Edit Unit",
      mode: "dialog",
      extraProps: { unit },
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2"><Ruler className="h-5 w-5" /> Measurement Units</CardTitle>
            <CardDescription>Manage units for stock quantity and selling.</CardDescription>
          </div>
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Unit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {isLoading && <div className="text-sm text-muted-foreground p-4">Loading units...</div>}
            {!isLoading && units.length === 0 && <div className="text-sm text-muted-foreground p-4">No units configured.</div>}
            {units.map((unit: Unit) => (
              <div key={unit.id} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card">
                <div><div className="font-semibold text-sm">{unit.nameEn} ({unit.nameAr})</div><div className="text-muted-foreground text-xs font-mono">{unit.abbreviation}</div></div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Unit</Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(unit)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(unit)}><Trash2 className="h-4 w-4" /></Button>
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
        title="Delete Unit"
        description={`Are you sure you want to delete "${deleteTarget?.nameEn}"?`}
      />
    </div>
  );
}
