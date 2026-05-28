"use client";

import { InventoryTable } from "@/modules/inventory";
import { LowStockAlert } from "@/modules/inventory";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { Package, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { useInventory } from "@/modules/inventory";

export default function InventoryPage() {
  const { data: products = [] } = useInventory();

  const totalItems = products.length;
  const inStock = products.filter((p: any) => (p.variant?.stock ?? 0) > 10).length;
  const lowStock = products.filter((p: any) => (p.variant?.stock ?? 0) > 0 && (p.variant?.stock ?? 0) <= 10).length;
  const outOfStock = products.filter((p: any) => (p.variant?.stock ?? 0) === 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">Track stock levels, adjust quantities, and manage inventory</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{inStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStock}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <InventoryTable />
        </div>
        <div>
          <LowStockAlert />
        </div>
      </div>
    </div>
  );
}
