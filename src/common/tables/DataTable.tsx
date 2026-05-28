"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/tables/table";
import {
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { Skeleton } from "../shared/skeleton";
import { cn } from "@/config/shadcnUtils";
import { ScrollArea } from "../shared/scroll-area";
import { FileX2 } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const SKELETON_ROW_COUNT = 6;

interface DataTableProps<TData> {
  data: TData[];
  columns: any[];
  columnVisibility: any;
  setColumnVisibility: (v: any) => void;
  isLoading?: boolean;
  wrapperClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  scrollAreaClassName?: string;
  withPagination?: boolean;
  onRowClick?: (row: TData) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({
  colSpan,
  title = "No results found",
  description = "Try adjusting your search or filters.",
}: {
  colSpan: number;
  title?: string;
  description?: string;
}) {
  return (
    <TableRow className="hover:bg-transparent border-0">
      <TableCell colSpan={colSpan} className="h-48 text-center border-0">
        <div className="flex flex-col items-center gap-3 py-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/60">
            <FileX2 className="h-7 w-7 text-muted-foreground/60" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

// ─── Skeleton Rows ────────────────────────────────────────────────────────────
const SKELETON_WIDTHS = ["w-3/4", "w-1/2", "w-2/3", "w-5/6", "w-1/3", "w-4/5"];

function SkeletonRows({ colCount }: { colCount: number }) {
  return (
    <>
      {Array.from({ length: SKELETON_ROW_COUNT }).map((_, rowIdx) => (
        <TableRow key={rowIdx} className="hover:bg-transparent">
          {Array.from({ length: colCount }).map((_, colIdx) => (
            <TableCell key={colIdx}>
              <Skeleton
                className={cn(
                  "h-4",
                  SKELETON_WIDTHS[(rowIdx + colIdx) % SKELETON_WIDTHS.length]
                )}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

// ─── DataTable ────────────────────────────────────────────────────────────────
export function DataTable<TData>({
  data,
  columns,
  columnVisibility,
  setColumnVisibility,
  isLoading = false,
  wrapperClassName,
  headerClassName,
  bodyClassName,
  scrollAreaClassName = "h-full",
  withPagination = false,
  onRowClick,
  emptyTitle,
  emptyDescription,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: withPagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const colCount = table.getHeaderGroups()[0]?.headers.length ?? columns.length;

  return (
    <div className="w-full">
      <div
        className={cn(
          "rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden",
          wrapperClassName
        )}
      >
        <ScrollArea className={cn("", scrollAreaClassName)}>
          <Table>
            <TableHeader className={cn("", headerClassName)}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className={cn("", bodyClassName)}>
              {isLoading ? (
                <SkeletonRows colCount={colCount} />
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(onRowClick && "cursor-pointer")}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <EmptyState
                  colSpan={colCount}
                  title={emptyTitle}
                  description={emptyDescription}
                />
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
