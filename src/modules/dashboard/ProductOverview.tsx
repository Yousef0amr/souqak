"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import {
  Package,
  Folder,
  AlertTriangle,
  DollarSign,
  ShoppingCart,
  Plus,
} from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";
import { Progress } from "@/common/shared/progress";

import { useProductsList } from "@/modules/products/hooks/useProducts";
import { useCategories } from "@/modules/settings/hooks/useSettings";
import { useDashboardStats } from "./hooks/useDashboardStats";

interface ProductOverviewProps {
  onViewAll: (section: string) => void;
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({ onViewAll }) => {
  const { data: products = [], isLoading: loadingProducts } = useProductsList();
  const { data: categories = [], isLoading: loadingCategories } = useCategories();
  const { data: stats, isLoading: loadingStats } = useDashboardStats();

  const loading = loadingProducts || loadingCategories || loadingStats;

  const overview = useMemo(() => {
    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.active).length;
    
    let avgPrice = 0;
    if (totalProducts > 0) {
      const sum = products.reduce((acc, p) => acc + (p.sellPrice || 0), 0);
      avgPrice = sum / totalProducts;
    }

    const recentProducts = [...products]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    // Compute top categories based on product count
    const categoryCounts: Record<string, number> = {};
    products.forEach((p) => {
      if (p.categoryId) {
        categoryCounts[p.categoryId] = (categoryCounts[p.categoryId] || 0) + 1;
      }
    });

    const topCategories = categories
      .map((c) => ({
        id: c.id,
        name: c.nameEn,
        productCount: categoryCounts[c.id] || 0,
      }))
      .sort((a, b) => b.productCount - a.productCount)
      .slice(0, 5);

    return {
      totalProducts,
      activeProducts,
      totalCategories: categories.length,
      lowStockProducts: stats?.lowStockCount || 0,
      avgPrice,
      recentProducts,
      topCategories,
    };
  }, [products, categories, stats]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 bg-muted animate-pulse rounded w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalProducts}</div>
            <p className="text-xs text-muted-foreground">{overview.activeProducts} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalCategories}</div>
            <p className="text-xs text-muted-foreground">Product categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{overview.lowStockProducts}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${overview.avgPrice.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per product</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Products</CardTitle>
            <Button variant="outline" size="sm" onClick={() => onViewAll("products")}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overview.recentProducts?.map((product: any) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {product.imageUrl ? (
                      <ImageWithFallback
                        src={product.imageUrl}
                        alt={product.nameEn}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.nameEn}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">${product.sellPrice?.toFixed(2)}</span>
                      <Badge variant="outline" className="text-xs">
                        {product.active ? "published" : "draft"}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {(!overview.recentProducts || overview.recentProducts.length === 0) && (
                <div className="text-center py-8">
                  <Package className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No products yet</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => onViewAll("products")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Categories</CardTitle>
            <Button variant="outline" size="sm" onClick={() => onViewAll("categories")}>
              Manage
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overview.topCategories?.map((category: any, index: number) => {
                const maxProducts = Math.max(
                  ...overview.topCategories.map((c: any) => c.productCount),
                  1 // prevent division by zero
                );
                const percentage = (category.productCount / maxProducts) * 100;

                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full bg-primary"
                          style={{
                            backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                          }}
                        />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {category.productCount} products
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
              {(!overview.topCategories || overview.topCategories.length === 0) && (
                <div className="text-center py-8">
                  <Folder className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No categories yet</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => onViewAll("categories")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 h-24"
              onClick={() => onViewAll("products")}
            >
              <Package className="h-6 w-6" />
              <div>
                <div className="font-medium">Add Product</div>
                <div className="text-sm text-muted-foreground">Create new product</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 h-24"
              onClick={() => onViewAll("categories")}
            >
              <Folder className="h-6 w-6" />
              <div>
                <div className="font-medium">Add Category</div>
                <div className="text-sm text-muted-foreground">Organize products</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 h-24"
              onClick={() => onViewAll("orders")}
            >
              <ShoppingCart className="h-6 w-6" />
              <div>
                <div className="font-medium">View Orders</div>
                <div className="text-sm text-muted-foreground">Manage sales</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
