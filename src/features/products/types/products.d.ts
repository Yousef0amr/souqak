declare global {
  interface Variant {
    id: string;
    variant_sku: string;
    color: string;
    costPrice: number;
    retailPrice: number;
    size: string;
    barcode: string;
    images?: File[];
  }

  interface Product {
    id: string;
    name: string;
    department: string;
    sku: string;
    brand: string;
    category: string;
    subcategory: string;
    description: string;
    variant: Variant;
  }

  interface ProductsViewManagementProps {
    children?: (props: {
      columnVisibility: VisibilityState;
      setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
      view: "table" | "grid";
    }) => ReactNode;
    showFilter?: boolean;
    hiddenItems?: ("filters" | "search" | "columns" | "viewButtons" | "export")[];
  }
}

export {};
