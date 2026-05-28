"use client";

import { useStockLevels, type StockLevel } from "./hooks/useStockLevels";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { Package } from "lucide-react";

export function StockLevelsWidget() {
  const { data: items, isLoading } = useStockLevels();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          Stock Levels
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="text-sm text-muted-foreground">Loading...</div>}
        {!isLoading && (!items || items.length === 0) && (
          <div className="text-sm text-muted-foreground">No stock data</div>
        )}
        {items && items.length > 0 && (
          <div className="space-y-3">
            {items.slice(0, 5).map((item: StockLevel) => {
              const pct = item.maxStock > 0 ? (item.currentStock / item.maxStock) * 100 : 0;
              const barColor =
                pct <= 25 ? "bg-red-500" : pct <= 50 ? "bg-yellow-500" : "bg-green-500";
              return (
                <div key={item.productId}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium truncate">{item.productNameEn || item.productNameAr}</span>
                    <span className="text-muted-foreground">{item.currentStock}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${barColor}`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
