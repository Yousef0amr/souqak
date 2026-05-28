"use client";

import { useTopProducts, type TopProduct } from "./hooks/useTopProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { TrendingUp } from "lucide-react";

export function TopProductsWidget() {
  const { data: products, isLoading } = useTopProducts();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Top Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="text-sm text-muted-foreground">Loading...</div>}
        {!isLoading && (!products || products.length === 0) && (
          <div className="text-sm text-muted-foreground">No product data</div>
        )}
        {products && products.length > 0 && (
          <div className="space-y-3">
            {products.slice(0, 5).map((product: TopProduct, i: number) => (
              <div key={product.productId} className="flex items-center gap-3">
                <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {product.productNameEn || product.productNameAr}
                  </p>
                  <p className="text-xs text-muted-foreground">{product.unitsSold} units sold</p>
                </div>
                <span className="text-sm font-semibold">${product.revenue.toFixed(0)}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
