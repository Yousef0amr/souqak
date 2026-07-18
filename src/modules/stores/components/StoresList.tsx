"use client";

import React, { useState } from "react";
import { useStores, useDeleteStore } from "../hooks/useStores";
import type { StoreDto } from "@/config/swagger-apis/types.gen";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/shared/card";
import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";
import { Plus, Layers, Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/common/shared/confirm-dialog";
import { useModalStore } from "@/shared/stores/DynamicModalStore";

export function StoresList() {
  const { data: stores = [], isLoading } = useStores();
  const deleteStoreMutation = useDeleteStore();
  const { openModal } = useModalStore();

  const [deleteTarget, setDeleteTarget] = useState<StoreDto | null>(null);

  const handleAdd = () => {
    openModal({
      componentName: "store-form",
      modalTitle: "Add Store",
      mode: "dialog",
      extraProps: { store: null },
    });
  };

  const handleEdit = (store: StoreDto) => {
    openModal({
      componentName: "store-form",
      modalTitle: "Edit Store",
      mode: "dialog",
      extraProps: { store },
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Layers className="h-5 w-5" /> Stores
            </CardTitle>
            <CardDescription>Manage your business stores and locations.</CardDescription>
          </div>
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Store
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {isLoading && <div className="text-sm text-muted-foreground p-4">Loading stores...</div>}
            {!isLoading && stores.length === 0 && <div className="text-sm text-muted-foreground p-4">No stores configured.</div>}
            {stores.map((store: StoreDto) => (
              <div key={store.id} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card">
                <div>
                  <div className="font-semibold text-sm">{store.name} {store.nameAr && `/ ${store.nameAr}`}</div>
                  <div className="text-muted-foreground text-xs">{store.address || "No address"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={store.active ? "default" : "secondary"}>{store.active ? "Active" : "Inactive"}</Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(store)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(store)}><Trash2 className="h-4 w-4" /></Button>
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
          if (deleteTarget?.id) deleteStoreMutation.mutate(deleteTarget.id);
          setDeleteTarget(null);
        }}
        title="Delete Store"
        description={`Are you sure you want to delete "${deleteTarget?.name}"?`}
      />
    </div>
  );
}
