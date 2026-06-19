import { DataTable } from "@/common/tables/DataTable";
import { createProductsTableColumns } from "../../utils/ProductsTableColumns";
import PaginationWithPerPage from "@/shared/components/PaginationWithPerPage";
import ProductsViewManagement from "../show-all-products/ProductsViewManagement";
import { ProductGrid } from "../show-all-products/ProductGrid";
import { ConfirmDialog } from "@/common/shared/confirm-dialog";
import { useState } from "react";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { Product } from "../../services/productsService";

export function ProductTable({
  hiddenItems = [],
  data = [],
  isLoading = false,
  onDelete,
}: {
  hiddenItems?: ("filters" | "search" | "columns" | "viewButtons" | "export")[];
  data: Product[];
  isLoading?: boolean;
  onDelete?: (product: Product) => void;
}) {
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const columns = createProductsTableColumns((product) => setDeleteTarget(product));

  return (
    <div className="space-y-3">
      <ProductsViewManagement showFilter={true} hiddenItems={hiddenItems} columns={columns}>
        {({ columnVisibility, setColumnVisibility, view }) =>
          view === "grid" ? (
            <ProductGrid data={data} onProductClick={(product) => {
              useModalStore.getState().openModal({
                componentName: "product-details-drawer",
                mode: "sheet",
                sheetSide: "right",
                modalTitle: "Product Details",
                withCloseBtn: true,
                extraProps: { product }
              });
            }} />
          ) : (
            <DataTable
              data={data}
              columns={columns}
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
              isLoading={isLoading}
              withPagination={false}
              scrollAreaClassName="h-[calc(100vh-360px)]"
            />
          )
        }
      </ProductsViewManagement>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        onConfirm={() => {
          if (deleteTarget) {
            onDelete?.(deleteTarget);
            setDeleteTarget(null);
          }
        }}
        title="Delete product"
        description={`Are you sure you want to delete "${deleteTarget?.nameEn}"?`}
      />

      <PaginationWithPerPage
        fixedPerPage={10}
        hidePagination={false}
        total={data.length}
        currentPage={1}
        perPage={10}
        onPageChange={(page: number) => {
          console.log("Page changed to:", page);
        }}
        onPerPageChange={(perPage: number, fixedPage: number) => {
          console.log("Per page changed to:", perPage, "Fixed page:", fixedPage);
        }}
      />
    </div>
  );
}
