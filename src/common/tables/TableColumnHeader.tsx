"use client";
import { Button } from "../buttons/button";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/config/shadcnUtils";

const TableColumnHeader = <TData,>({
  column,
  columnName,
  columnContent,
  sortable = true,
}: TableColumnHeaderProps<TData>) => {
  return (
    <Button
      variant="ghost"
      className="p-0 !bg-transparent"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {columnContent?.() ? (
        columnContent()
      ) : (
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
          {columnName}
          {sortable && <ChevronsUpDown className={cn("size-4")} />}
        </div>
      )}
    </Button>
  );
};

export default TableColumnHeader;
