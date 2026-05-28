"use client";

import React from "react";
import { useInventory } from "../hooks/useInventory";
import { type Product } from "@/lib/api/mockDb";
import { AlertCircle, ArrowUpRight } from "lucide-react";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";

export function LowStockAlert() {
  const { data: products = [] } = useInventory();

  const lowStockItems = products.filter((p: Product) => (p.variant?.stock ?? 0) <= 10);

  if (lowStockItems.length === 0) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground p-6 flex flex-col items-center justify-center text-center space-y-2 h-[220px]">
        <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          âœ“
        </div>
        <h4 className="font-semibold">All Stock Levels Healthy</h4>
        <p className="text-muted-foreground text-xs">No products are currently low on stock.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col justify-between h-[280px]">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <h4 className="font-semibold text-sm">Low Stock Alerts ({lowStockItems.length})</h4>
          </div>
          <Badge variant="destructive" className="text-[10px] px-1 py-0.5">
            Action Needed
          </Badge>
        </div>

        <div className="space-y-2.5 overflow-y-auto max-h-[160px] pr-1">
          {lowStockItems.map((item: Product) => (
            <div key={item.id} className="flex justify-between items-center py-1.5 border-b last:border-0 border-border">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold truncate text-foreground">{item.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{item.sku}</p>
              </div>
              <div className="text-right ml-4">
                <span className="text-xs font-extrabold text-red-500 tabular-nums">
                  {item.variant?.stock} left
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button variant="ghost" size="sm" className="w-full text-xs font-semibold flex items-center justify-center gap-1.5 mt-2">
        Open Reorder Portal
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
