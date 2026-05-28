import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";
import { Mail, Phone, Pencil, Trash, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/shared/dropdown-menu";
import type { Supplier } from "../services/suppliersService";

interface GetSuppliersColumnsProps {
  openEdit: (supplier: Supplier) => void;
  handleDelete: (supplier: Supplier) => void;
}

export const getSuppliersColumns = ({
  openEdit,
  handleDelete,
}: GetSuppliersColumnsProps): ColumnDef<Supplier>[] => [
  {
    accessorKey: "nameEn",
    header: "Supplier Name",
    cell: ({ row }) => (
      <div>
        <span className="font-semibold text-foreground">{row.original.nameEn}</span>
        {row.original.nameAr && (
          <span className="block text-xs text-muted-foreground font-normal">{row.original.nameAr}</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
    cell: ({ row }) => <span>{row.original.contactPerson || "—"}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
        <Mail className="h-3.5 w-3.5" />
        {row.original.email || "—"}
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
        <Phone className="h-3.5 w-3.5" />
        {row.original.phone || "—"}
      </span>
    ),
  },
  {
    accessorKey: "totalPurchases",
    header: "Total Purchases",
    cell: ({ row }) => (
      <span className="font-bold">${(row.original.totalPurchases || 0).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "taxNumber",
    header: "Tax Number",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.taxNumber || "—"}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const supplier = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openEdit(supplier)}>
              <Pencil className="size-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => handleDelete(supplier)}>
              <Trash className="size-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
