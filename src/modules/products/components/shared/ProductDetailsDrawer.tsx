import React from "react";
import { Product } from "../../services/productsService";
import { Badge } from "@/common/shared/badge";
import { ScrollArea, ScrollBar } from "@/common/shared/scroll-area";
import { ImageWithFallback } from "@/modules/dashboard/ImageWithFallback";
import { Package, Hash, Layers, Tag, DollarSign, Box } from "lucide-react";
import { format } from "date-fns";

interface ProductDetailsDrawerProps {
  product: Product;
}

export default function ProductDetailsDrawer({ product }: ProductDetailsDrawerProps) {
  const images = product.imageUrls && product.imageUrls.length > 0 
    ? product.imageUrls 
    : (product.imageUrl ? [product.imageUrl] : []);

  return (
    <div className="flex flex-col h-full gap-6 pb-6">
      {/* Images Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground">Product Images</h3>
        {images.length > 0 ? (
          <ScrollArea className="w-full whitespace-nowrap rounded-lg border border-border bg-muted/20">
            <div className="flex w-max space-x-4 p-4">
              {images.map((img, idx) => (
                <div key={idx} className="shrink-0 rounded-md overflow-hidden border border-border bg-background shadow-sm h-48 w-48 relative">
                  <ImageWithFallback 
                    src={img} 
                    alt={`${product.nameEn} - image ${idx + 1}`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 rounded-lg border border-dashed border-border bg-muted/30">
            <Package className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No images available</p>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <DetailItem icon={<Hash className="size-4" />} label="Name (EN)" value={product.nameEn} />
          <DetailItem icon={<Hash className="size-4" />} label="Name (AR)" value={product.nameAr || "-"} />
          <DetailItem icon={<Tag className="size-4" />} label="SKU" value={product.sku} />
          <DetailItem icon={<Hash className="size-4" />} label="Barcode" value={product.barcode || "-"} />
          <DetailItem icon={<Layers className="size-4" />} label="Category" value={product.categoryNameEn || "-"} />
          <DetailItem icon={<Layers className="size-4" />} label="Brand" value={product.brandNameEn || "-"} />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground">Inventory & Pricing</h3>
        <div className="grid grid-cols-2 gap-4">
          <DetailItem icon={<DollarSign className="size-4" />} label="Cost Price" value={`$${product.costPrice?.toFixed(2) || "0.00"}`} />
          <DetailItem icon={<DollarSign className="size-4" />} label="Sell Price" value={`$${product.sellPrice?.toFixed(2) || "0.00"}`} />
          <DetailItem 
            icon={<Box className="size-4" />} 
            label="Stock Qty" 
            value={
              <Badge variant={(product.stockQty || 0) > 10 ? "default" : (product.stockQty || 0) > 0 ? "secondary" : "destructive"}>
                {product.stockQty || 0} in stock
              </Badge>
            } 
          />
          <DetailItem icon={<Box className="size-4" />} label="Reorder Level" value={product.reorderLevel || "-"} />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground">Additional Details</h3>
        <div className="space-y-2 text-sm text-foreground bg-muted/20 p-4 rounded-lg border border-border">
          <div>
            <span className="font-medium text-muted-foreground block mb-1">Description (EN):</span>
            <p className="whitespace-pre-wrap">{product.descriptionEn || "No description provided."}</p>
          </div>
          {product.descriptionAr && (
            <div className="mt-4 border-t border-border pt-4">
              <span className="font-medium text-muted-foreground block mb-1">Description (AR):</span>
              <p className="whitespace-pre-wrap">{product.descriptionAr}</p>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground flex justify-between pt-4 border-t border-border">
          <span>Created: {product.createdAt ? format(new Date(product.createdAt), "PPp") : "-"}</span>
          {product.updatedAt && <span>Updated: {format(new Date(product.updatedAt), "PPp")}</span>}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 p-3 rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <div className="font-semibold text-sm truncate">{value}</div>
    </div>
  );
}
