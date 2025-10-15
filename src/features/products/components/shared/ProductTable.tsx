import { DataTable } from "@/common/tables/DataTable";
import { ProductsTableColumns } from "../../utils/ProductsTableColumns";
import PaginationWithPerPage from "@/shared/components/PaginationWithPerPage";
import ProductsViewManagement from "../show-all-products/ProductsViewManagement";
import { ProductGrid } from "../show-all-products/ProductGrid";




export function ProductTable({
  hiddenItems = [],
  data,
}: {
  hiddenItems?: ("filters" | "search" | "columns" | "viewButtons" | "export")[];
  data: Product[];
}) {
  return (
    <div className="space-y-3">
      <ProductsViewManagement showFilter={true} hiddenItems={hiddenItems}>
        {({ columnVisibility, setColumnVisibility, view }) =>
          view === "grid" ? (
            <ProductGrid data={data} onProductClick={() => { }} />
          ) : (
            <DataTable
              data={data || []}
              columns={ProductsTableColumns}
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
              isLoading={false}
              withPagination={false}
              scrollAreaClassName="h-[calc(100vh-360px)]"
            />
          )
        }
      </ProductsViewManagement>
      <PaginationWithPerPage
        fixedPerPage={5}
        hidePagination={false}
        total={100}
        currentPage={1}
        perPage={5}
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
