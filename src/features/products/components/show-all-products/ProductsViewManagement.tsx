"use client";

import DisplayTableColumns from "@/common/tables/DisplayTableColumns";
import type { VisibilityState } from "@tanstack/react-table";
import { useState } from "react";
import { ProductsTableColumns } from "../../utils/ProductsTableColumns";
import { Button } from "@/common/buttons/button";
import { Download, LayoutGrid, LayoutList, Search } from "lucide-react";
import { ProductFilters } from "./ProductFilters";
import InputWithIcons from "@/common/forms/InputWithIcons";




const ProductsViewManagement = ({ showFilter = true, children }: ProductsViewManagementProps) => {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [view, setView] = useState<"table" | "grid">("table");


    return (
        <>
            {showFilter ? (
                <div className="flex items-center justify-between gap-2 w-full">

                    <div className="flex items-center gap-1">


                        <div className=" min-w-[420px]">
                            <InputWithIcons
                                placeholder="Search name or SKU..."
                                value={""}
                                // onChange={(e) => }
                                className="border border-input"
                                prefix={<Search className="size-4" />}
                            // suffix={search ? (
                            //     <button
                            //         type="button"
                            //         className="text-muted-foreground hover:text-foreground px-3"

                            //     >
                            //         Esc
                            //     </button>
                            // ) : undefined}
                            />
                        </div>
                        <ProductFilters
                            search=""
                            setSearch={() => { }}
                            categories={[]}
                            category=""
                            setCategory={() => { }}
                            statuses={[]}
                            statusFilter=""
                            setStatusFilter={() => { }}
                            minPrice=""
                            setMinPrice={() => { }}
                            maxPrice=""
                            setMaxPrice={() => { }}
                            dateRange={undefined}
                            setDateRange={() => { }}
                        />

                    </div>



                    <div className="flex items-center gap-1">
                        {
                            view === "table" && <DisplayTableColumns
                                columns={ProductsTableColumns}
                                columnVisibility={columnVisibility}
                                setColumnVisibility={setColumnVisibility}
                            />
                        }
                        <Button
                            variant={view === "table" ? "default" : "outline"}
                            onClick={() => setView("table")}
                            className="hidden sm:inline-flex"
                        >
                            <LayoutList className="size-4 mr-2" />Table
                        </Button>
                        <Button
                            variant={view === "grid" ? "default" : "outline"}
                            onClick={() => setView("grid")}
                            className="hidden sm:inline-flex"
                        >
                            <LayoutGrid className="size-4 mr-2" />Grid
                        </Button>
                        <Button variant="outline" onClick={() => { }} className="w-full sm:w-auto">
                            <Download className="size-4 mr-2" />Export CSV
                        </Button>
                    </div>

                </div>
            ) : null}
            {children?.({ columnVisibility, setColumnVisibility, view })}
        </>
    );
};

export default ProductsViewManagement;
