"use client";

import { Button } from "@/common/buttons/button";
import PageHeaderWrapper from "@/shared/components/PageHeaderWrapper";
import { AlertTriangle, Package, PackageOpen, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { ProductTable } from "../components/shared/ProductTable";

import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { useModalStore } from "@/shared/stores/DynamicModalStore";

export default function ProductsPage() {
  const openModal = useModalStore((state) => state.openModal);

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
              Manage your product catalog, filters, and actions
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
                    "h-fit  sm:max-w-[1200px] lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[calc(100%-2rem)]",
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1555</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">125</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">1212</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1252</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$100000</div>
          </CardContent>
        </Card>
      </div>
      <ProductTable />
    </div>
  );
}
