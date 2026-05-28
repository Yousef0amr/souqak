import type { ColumnDef, VisibilityState } from "@tanstack/react-table";

declare global {
  interface Product {
    id: string;
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    sku: string;
    barcode: string;
    categoryId: string;
    categoryNameEn: string;
    categoryNameAr: string;
    brandId: string | null;
    brandNameEn: string;
    brandNameAr: string;
    costPrice: number;
    sellPrice: number;
    stockQty: number;
    reorderLevel: number;
    baseUnitId: string;
    baseUnitNameEn: string;
    baseUnitNameAr: string;
    purchaseUnitId: string | null;
    conversionFactor: number;
    taxId: string;
    taxNameEn: string;
    taxNameAr: string;
    taxRate: number;
    active: boolean;
    imageUrl: string;
    createdAt: string;
    updatedAt: string | null;
  }

  interface ProductsViewManagementProps {
    children?: (props: {
      columnVisibility: VisibilityState;
      setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
      view: "table" | "grid";
    }) => ReactNode;
    showFilter?: boolean;
    hiddenItems?: ("filters" | "search" | "columns" | "viewButtons" | "export")[];
    columns?: ColumnDef<Product>[];
  }
}

export {};
