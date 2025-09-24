import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../shared/dropdown-menu";
import { Columns3 } from "lucide-react";
import { Button } from "../buttons/button";
import { ColumnDef, VisibilityState, useReactTable, getCoreRowModel } from "@tanstack/react-table";

type DisplayTableColumnsProps<TData> = {
  columns: ColumnDef<TData>[];
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
};

const DisplayTableColumns = <TData,>({
  columns,
  columnVisibility,
  setColumnVisibility,
}: DisplayTableColumnsProps<TData>) => {
  const table = useReactTable({
    data: [] as TData[], // empty data since we only need column management
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" >
            <Columns3 className="font-normal" size={12} />
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DisplayTableColumns;
