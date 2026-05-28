import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";
import { Pencil, Trash, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/shared/dropdown-menu";
import type { UnitConversion } from "../services/unitConversionsService";

interface GetUnitConversionColumnsProps {
  openEdit: (conversion: UnitConversion) => void;
  handleDelete: (conversion: UnitConversion) => void;
}

export const getUnitConversionColumns = ({
  openEdit,
  handleDelete,
}: GetUnitConversionColumnsProps): ColumnDef<UnitConversion>[] => [
  {
    accessorKey: "fromUnitSymbol",
    header: "From Unit",
    cell: ({ row }) => <span className="font-semibold">{row.original.fromUnitSymbol}</span>,
  },
  {
    accessorKey: "toUnitSymbol",
    header: "To Unit",
    cell: ({ row }) => <span className="font-semibold">{row.original.toUnitSymbol}</span>,
  },
  {
    accessorKey: "factor",
    header: "Conversion Factor",
    cell: ({ row }) => <span className="font-bold tabular-nums">{row.original.factor}</span>,
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.active ? "default" : "secondary"}>
        {row.original.active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const c = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openEdit(c)}>
              <Pencil className="size-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => handleDelete(c)}>
              <Trash className="size-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
