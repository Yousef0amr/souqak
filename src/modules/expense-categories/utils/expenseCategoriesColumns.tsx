import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/common/buttons/button";
import { Tag, Pencil, Trash, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/shared/dropdown-menu";
import type { ExpenseCategory } from "../services/expenseCategoriesService";

interface GetExpenseCategoryColumnsProps {
  onEdit: (category: ExpenseCategory) => void;
  onDelete: (category: ExpenseCategory) => void;
}

export function getExpenseCategoryColumns({ onEdit, onDelete }: GetExpenseCategoryColumnsProps): ColumnDef<ExpenseCategory>[] {
  return [
    {
      accessorKey: "nameEn",
      header: "Name (EN)",
      cell: ({ row }) => (
        <span className="font-semibold flex items-center gap-2">
          <Tag className="h-3.5 w-3.5 text-indigo-500" />
          {row.original.nameEn}
        </span>
      ),
    },
    {
      accessorKey: "nameAr",
      header: "Name (AR)",
      cell: ({ row }) => (
        <span className="text-muted-foreground font-noto-arabic">
          {row.original.nameAr || "â€”"}
        </span>
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
              <DropdownMenuItem onClick={() => onEdit(c)}>
                <Pencil className="size-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => onDelete(c)}>
                <Trash className="size-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
