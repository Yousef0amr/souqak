"use client";

import React, { useState } from "react";
import { DataTable } from "@/common/tables/DataTable";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { Badge } from "@/common/shared/badge";
import { Search, AlertCircle, Sparkles, Plus, Minus } from "lucide-react";
import { useInventory, useAdjustStock } from "../hooks/useInventory";
import { type Product } from "@/lib/api/mockDb";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";

export function InventoryTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [adjustingId, setAdjustingId] = useState<string | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<number>(0);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { data: products = [], isLoading } = useInventory();
  const adjustStockMutation = useAdjustStock();


  const filteredProducts = products.filter((prod: Product) =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product / Item",
      cell: ({ row }) => (
        <div>
          <div className="font-semibold text-foreground">{row.original.name}</div>
          <div className="text-muted-foreground text-xs">{row.original.category}</div>
        </div>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => <span className="font-mono text-xs">{row.original.sku}</span>,
    },
    {
      accessorKey: "variant.stock",
      header: "Current Stock",
      cell: ({ row }) => {
        const stock = row.original.variant?.stock ?? 0;
        const lowStock = stock <= 10;
        return (
          <div className="flex items-center gap-2">
            <span className={`font-bold tabular-nums ${lowStock ? "text-amber-500 font-extrabold" : "text-foreground"}`}>
              {stock}
            </span>
            {lowStock && (
              <Badge variant="outline" className="border-amber-500 text-amber-500 bg-amber-500/10 px-1 py-0 h-4 text-[10px]">
                Low Stock
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Quick Adjustment",
      cell: ({ row }) => {
        const prod = row.original;
        if (adjustingId === prod.id) {
          return (
            <div className="flex items-center gap-1">
              <Input
                type="number"
                value={adjustAmount}
                onChange={(e) => setAdjustAmount(parseInt(e.target.value) || 0)}
                className="w-16 h-8 text-center"
              />
              <Button size="sm" variant="default" className="h-8 px-2 py-0" onClick={() => adjustStockMutation.mutate({ id: prod.id, amount: adjustAmount }, { onSuccess: () => { setAdjustingId(null); setAdjustAmount(0); } })}>
                Set
              </Button>
              <Button size="sm" variant="outline" className="h-8 px-2 py-0" onClick={() => setAdjustingId(null)}>
                X
              </Button>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-1.5">
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => adjustStockMutation.mutate({ id: prod.id, amount: 10 })}>
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500" onClick={() => adjustStockMutation.mutate({ id: prod.id, amount: -10 })}>
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs px-2" onClick={() => { setAdjustingId(prod.id); setAdjustAmount(0); }}>
              Custom
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 max-w-sm w-full">
          <Search className="h-4 w-4 text-muted-foreground absolute ml-3" />
          <Input
            placeholder="Search catalog inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          Adjust stock sizes on the fly
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
        <DataTable
          data={filteredProducts}
          columns={columns}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          isLoading={isLoading}
          scrollAreaClassName="h-[500px]"
        />
      </div>
    </div>
  );
}
