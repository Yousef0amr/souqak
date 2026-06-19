import type { ColumnDef, VisibilityState } from "@tanstack/react-table";

declare global {
  // Exported Product type from productsService overrides this, so we define it as an alias
  type Product = import("../services/productsService").Product;

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
