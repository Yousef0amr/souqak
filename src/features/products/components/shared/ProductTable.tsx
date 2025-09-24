
import { DataTable } from "@/common/tables/DataTable";
import { ProductsTableColumns } from "../../utils/ProductsTableColumns";
import PaginationWithPerPage from "@/shared/components/PaginationWithPerPage";
import { useMemo } from "react";
import ProductsViewManagement from "../show-all-products/ProductsViewManagement";
import { ProductGrid } from "../show-all-products/ProductGrid";





export function ProductTable({

}) {



    const mockData: any[] = useMemo(
        () => [
            { id: "1", name: "Product Alpha", sku: "ALP-001", price: 19.99, status: "active", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop&crop=center" },
            { id: "2", name: "Product Beta", sku: "BET-002", price: 29.99, status: "draft", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=150&h=150&fit=crop&crop=center" },
            { id: "3", name: "Product Gamma", sku: "GAM-003", price: 9.99, status: "archived", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=150&h=150&fit=crop&crop=center" },
            { id: "4", name: "Product Delta", sku: "DEL-004", price: 49.0, status: "active", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=150&h=150&fit=crop&crop=center" },
            { id: "5", name: "Product Epsilon", sku: "EPS-005", price: 15.5, status: "active", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop&crop=center" },
            { id: "6", name: "Product Zeta", sku: "ZET-006", price: 12.0, status: "draft", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=150&h=150&fit=crop&crop=center" },
            { id: "7", name: "Product Eta", sku: "ETA-007", price: 5.99, status: "active", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=150&h=150&fit=crop&crop=center" },
            { id: "8", name: "Product Theta", sku: "THE-008", price: 99.99, status: "archived", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop&crop=center" },
            { id: "9", name: "Product Iota", sku: "IOT-009", price: 25.0, status: "active", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=150&h=150&fit=crop&crop=center" },
            { id: "10", name: "Product Kappa", sku: "KAP-010", price: 35.0, status: "draft", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=150&h=150&fit=crop&crop=center" },
            { id: "11", name: "Product Lambda", sku: "LAM-011", price: 75.0, status: "active", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop&crop=center" },
            { id: "12", name: "Product Mu", sku: "MU-012", price: 8.5, status: "active", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=150&h=150&fit=crop&crop=center" },
        ],
        []
    );


    return (
        <>
            <ProductsViewManagement showFilter={true}>
                {({ columnVisibility, setColumnVisibility, view }) => (
                    view === "grid" ?
                        <ProductGrid data={mockData} onProductClick={() => { }} />
                        :
                        <DataTable
                            data={mockData}
                            columns={ProductsTableColumns}
                            columnVisibility={columnVisibility}
                            setColumnVisibility={setColumnVisibility}
                            isLoading={false}
                            withPagination={false}
                            scrollAreaClassName="h-[calc(100vh-250px)]"
                        />
                )}
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
        </>
    );
}


