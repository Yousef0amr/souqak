"use client";

import { Button } from "@/common/buttons/button";
import PageHeaderWrapper from "@/shared/components/PageHeaderWrapper";
import { AlertTriangle, Package, PackageOpen, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { ProductTable } from "../components/shared/ProductTable";

import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { useModalStore } from "@/shared/stores/DynamicModalStore";


export const mockProducts: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 14” (M3, 2024)",
    department: "Electronics",
    sku: "MBP14-M3-2024",
    brand: "Apple",
    category: "Laptops",
    subcategory: "MacBooks",
    description:
      "High-performance laptop featuring the M3 chip, Liquid Retina XDR display, and all-day battery life.",
    variant: {
      id: "v1",
      variant_sku: "MBP14-M3-SG-16-512",
      color: "Space Gray",
      costPrice: 1800,
      retailPrice: 1999,
      size: "14-inch",
      barcode: "0123456789012",
    },
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    department: "Electronics",
    sku: "SGS24U-512GB",
    brand: "Samsung",
    category: "Smartphones",
    subcategory: "Android",
    description:
      "Flagship Android smartphone with 200MP camera, Snapdragon 8 Gen 3 chip, and S Pen support.",
    variant: {
      id: "v2",
      variant_sku: "SGS24U-TG-512",
      color: "Titanium Gray",
      costPrice: 1100,
      retailPrice: 1299,
      size: "6.8-inch",
      barcode: "0987654321098",
    },
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Wireless Headphones",
    department: "Audio",
    sku: "SONYXM5-BLK",
    brand: "Sony",
    category: "Headphones",
    subcategory: "Noise Cancelling",
    description:
      "Industry-leading noise cancellation with adaptive sound control and 30-hour battery life.",
    variant: {
      id: "v3",
      variant_sku: "SONYXM5-BLK",
      color: "Black",
      costPrice: 320,
      retailPrice: 399,
      size: "Standard",
      barcode: "1122334455667",
    },
  },
  {
    id: "4",
    name: "Logitech MX Master 3S",
    department: "Accessories",
    sku: "LOGI-MX3S",
    brand: "Logitech",
    category: "Computer Accessories",
    subcategory: "Mouse",
    description:
      "Ergonomic wireless mouse with silent clicks, fast scrolling, and multi-device connectivity.",
    variant: {
      id: "v4",
      variant_sku: "LOGI-MX3S-GR",
      color: "Graphite",
      costPrice: 85,
      retailPrice: 119,
      size: "One Size",
      barcode: "3344556677889",
    },
  },
  {
    id: "5",
    name: "Dell UltraSharp 27” 4K Monitor",
    department: "Electronics",
    sku: "DELL-U2723QE",
    brand: "Dell",
    category: "Monitors",
    subcategory: "4K",
    description:
      "27-inch 4K UHD monitor with IPS Black technology, USB-C connectivity, and wide color coverage.",
    variant: {
      id: "v5",
      variant_sku: "DELL-U2723QE-27",
      color: "Silver",
      costPrice: 600,
      retailPrice: 749,
      size: "27-inch",
      barcode: "4455667788990",
    },
  },
  {
    id: "6",
    name: "Keychron K8 Pro Mechanical Keyboard",
    department: "Accessories",
    sku: "KEY-K8PRO",
    brand: "Keychron",
    category: "Keyboards",
    subcategory: "Mechanical",
    description:
      "Compact wireless mechanical keyboard with QMK/VIA support and hot-swappable switches.",
    variant: {
      id: "v6",
      variant_sku: "KEY-K8PRO-RGB-BRN",
      color: "Black",
      costPrice: 100,
      retailPrice: 129,
      size: "75%",
      barcode: "5566778899001",
    },
  },
  {
    id: "7",
    name: "Apple Watch Series 9",
    department: "Wearables",
    sku: "AW-S9-GPS",
    brand: "Apple",
    category: "Smartwatches",
    subcategory: "Apple Watch",
    description:
      "Advanced smartwatch with double-tap gesture, blood oxygen tracking, and S9 SiP chip.",
    variant: {
      id: "v7",
      variant_sku: "AW-S9-MID-41",
      color: "Midnight",
      costPrice: 360,
      retailPrice: 399,
      size: "41mm",
      barcode: "6677889900112",
    },
  },
  {
    id: "8",
    name: "iPad Air (M2, 2024)",
    department: "Electronics",
    sku: "IPAD-AIR-M2",
    brand: "Apple",
    category: "Tablets",
    subcategory: "iPad Air",
    description:
      "Thin and powerful tablet featuring the M2 chip and Apple Pencil (2nd Gen) support.",
    variant: {
      id: "v8",
      variant_sku: "IPAD-AIR-M2-BLUE-256",
      color: "Blue",
      costPrice: 760,
      retailPrice: 899,
      size: "10.9-inch",
      barcode: "7788990011223",
    },
  },
  {
    id: "9",
    name: "JBL Flip 6 Portable Speaker",
    department: "Audio",
    sku: "JBL-F6-BLK",
    brand: "JBL",
    category: "Speakers",
    subcategory: "Portable",
    description:
      "Compact waterproof Bluetooth speaker with punchy sound and 12-hour playtime.",
    variant: {
      id: "v9",
      variant_sku: "JBL-F6-BLK",
      color: "Black",
      costPrice: 90,
      retailPrice: 129,
      size: "One Size",
      barcode: "8899001122334",
    },
  },
  {
    id: "10",
    name: "Canon EOS R6 Mark II",
    department: "Photography",
    sku: "CANON-R6M2",
    brand: "Canon",
    category: "Cameras",
    subcategory: "Mirrorless",
    description:
      "Full-frame mirrorless camera with 24.2MP sensor, 4K video recording, and fast autofocus.",
    variant: {
      id: "v10",
      variant_sku: "CANON-R6M2-BODY",
      color: "Black",
      costPrice: 2100,
      retailPrice: 2499,
      size: "Body Only",
      barcode: "9900112233445",
    },
  },
];

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
      <ProductTable data={mockProducts} />
    </div>
  );
}
