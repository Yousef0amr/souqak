"use client";
import { Button } from "../buttons/button";
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/config/shadcnUtils";
import { Column } from "@tanstack/react-table";

interface TableColumnHeaderProps<TData> {
  column: Column<TData, unknown>;
  columnName?: string;
  columnContent?: () => React.ReactNode;
  sortable?: boolean;
}

const TableColumnHeader = <TData,>({
  column,
  columnName,
  columnContent,
  sortable = true,
}: TableColumnHeaderProps<TData>) => {
  const sorted = column.getIsSorted();
  const isActive = sorted !== false;

  const SortIcon = sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ChevronsUpDown;

  return (
    <Button
      variant="ghost"
      className={cn(
        "p-0 h-auto !bg-transparent gap-1.5 font-medium",
        "group rounded-md px-2 py-1 -ml-2",
        "hover:bg-muted/60 transition-colors duration-150",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {columnContent?.() ?? (
        <>
          <span className="text-[11px] uppercase tracking-wider font-semibold">
            {columnName}
          </span>
          {sortable && (
            <SortIcon
              className={cn(
                "h-3 w-3 shrink-0 transition-colors duration-150",
                isActive ? "text-primary" : "text-muted-foreground/50"
              )}
            />
          )}
        </>
      )}
    </Button>
  );
};

export default TableColumnHeader;
