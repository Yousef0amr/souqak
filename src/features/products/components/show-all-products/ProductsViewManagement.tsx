"use client";

import { useState } from "react";
import { Download, LayoutGrid, LayoutList, Search } from "lucide-react";
import DisplayTableColumns from "@/common/tables/DisplayTableColumns";
import InputWithIcons from "@/common/forms/InputWithIcons";
import { Button } from "@/common/buttons/button";
import { ProductFilters } from "./ProductFilters";
import { ProductsTableColumns } from "../../utils/ProductsTableColumns";
import type { VisibilityState } from "@tanstack/react-table";

const ProductsViewManagement = ({
  showFilter = true,
  hiddenItems = [],
  children,
}: ProductsViewManagementProps) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [view, setView] = useState<"table" | "grid">("table");

  const isHidden = (key: string) => hiddenItems.includes(key as any);

  return (
    <div className="space-y-3">
      {showFilter ? (
        <div className="flex items-center justify-between gap-2 w-full">
          {/* Left Section */}
          <div className="flex items-center gap-1">
            {!isHidden("search") && (
              <div className="min-w-[420px]">
                <InputWithIcons
                  placeholder="Search name or SKU..."
                  value=""
                  onChange={(e) => {}}
                  className="border border-input"
                  prefix={<Search className="size-4" />}
                />
              </div>
            )}

            {!isHidden("filters") && (
              <ProductFilters
                search=""
                setSearch={() => {}}
                category=""
                setCategory={() => {}}
                statusFilter=""
                setStatusFilter={() => {}}
                minPrice=""
                setMinPrice={() => {}}
                maxPrice=""
                setMaxPrice={() => {}}
                dateRange={undefined}
                setDateRange={() => {}}
                onResetFilters={() => {}}
              />
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1">
            {!isHidden("columns") && view === "table" && (
              <DisplayTableColumns
                columns={ProductsTableColumns}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
              />
            )}

            {!isHidden("viewButtons") && (
              <>
                <Button
                  variant={view === "table" ? "default" : "outline"}
                  onClick={() => setView("table")}
                  className="hidden sm:inline-flex"
                >
                  <LayoutList className="size-4 mr-2" />
                  Table
                </Button>
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  onClick={() => setView("grid")}
                  className="hidden sm:inline-flex"
                >
                  <LayoutGrid className="size-4 mr-2" />
                  Grid
                </Button>
              </>
            )}

            {!isHidden("export") && (
              <Button variant="outline" onClick={() => {}} className="w-full sm:w-auto">
                <Download className="size-4 mr-2" />
                Export CSV
              </Button>
            )}
          </div>
        </div>
      ) : null}
      {children?.({ columnVisibility, setColumnVisibility, view })}
    </div>
  );
};

export default ProductsViewManagement;
