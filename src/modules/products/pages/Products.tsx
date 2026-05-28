"use client";

import { Button } from "@/common/buttons/button";
import PageHeaderWrapper from "@/shared/components/PageHeaderWrapper";
import { AlertTriangle, Package, PackageOpen, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { ProductTable } from "../components/shared/ProductTable";
import { useProductsList, useDeleteProduct } from "../hooks/useProducts";

import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { useModalStore } from "@/shared/stores/DynamicModalStore";

export default function ProductsPage() {
  const openModal = useModalStore((state) => state.openModal);
  const { data: products = [], isLoading } = useProductsList();
  const deleteMutation = useDeleteProduct();

  const totalItems = products.length;
  const inStock = products.filter(p => (p.stockQty ?? 0) > 10).length;
  const lowStock = products.filter(p => (p.stockQty ?? 0) > 0 && (p.stockQty ?? 0) <= 10).length;
  const outOfStock = products.filter(p => (p.stockQty ?? 0) === 0).length;
  const totalValue = products.reduce((acc, p) => acc + (p.sellPrice ?? 0) * (p.stockQty ?? 0), 0);

  return (
    <div className="space-y-8">
      <PageHeaderWrapper
        leftContent={
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <PackageOpen className="size-5" />
              <h1 className="text-xl font-semibold">Products</h1>
            </div>
            <p className="text-xs text-muted-foreground">
              Manage your product catalog, filters, and actions in real-time
            </p>
          </div>
        }
        rightContent={
          <div className="flex items-center gap-2">
            <Button
              className="w-full sm:w-auto"
              onClick={() =>
                openModal({
                  componentName: "add-product",
                  mode: "dialog",
                  modalContentClassName:
                    "h-fit sm:max-w-[800px] lg:max-w-[700px] xl:max-w-[800px]",
                  withCloseBtn: true,
                })
              }
            >
              <Plus className="size-4 mr-2" />
              Add product
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : totalItems}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{isLoading ? "..." : inStock}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{isLoading ? "..." : lowStock}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{isLoading ? "..." : outOfStock}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : `$${totalValue.toLocaleString()}`}
            </div>
          </CardContent>
        </Card>
      </div>

      <ProductTable data={products} isLoading={isLoading} onDelete={(p) => deleteMutation.mutate(p.id)} />
    </div>
  );
}
