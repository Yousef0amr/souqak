import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/common/buttons/button";
import { Mail, Phone, ShieldAlert, Pencil, Trash, MoreHorizontal, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/shared/dropdown-menu";
import type { Customer } from "../services/customersService";

interface GetCustomerColumnsProps {
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export function getCustomerColumns({ onEdit, onDelete }: GetCustomerColumnsProps): ColumnDef<Customer>[] {
  return [
    {
      accessorKey: "nameEn",
      header: "Customer Name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {row.original.nameEn}
          </span>
          {row.original.nameAr && (
            <span className="text-xs text-muted-foreground font-noto-arabic">{row.original.nameAr}</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="flex items-center gap-1.5 text-muted-foreground">
          {row.original.email ? (
            <>
              <Mail className="h-3.5 w-3.5" />
              {row.original.email}
            </>
          ) : "â€”"}
        </span>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <span className="flex items-center gap-1.5 text-muted-foreground">
          {row.original.phone ? (
            <>
              <Phone className="h-3.5 w-3.5" />
              {row.original.phone}
            </>
          ) : "â€”"}
        </span>
      ),
    },
    {
      accessorKey: "totalInvoices",
      header: "Total Invoices",
      cell: ({ row }) => <span>{row.original.totalInvoices}</span>,
    },
    {
      accessorKey: "balance",
      header: "Outstanding Balance",
      cell: ({ row }) => {
        const debt = row.original.balance;
        return (
          <span className={debt > 0 ? "font-medium text-red-500 flex items-center gap-1" : "text-muted-foreground"}>
            {debt > 0 && <ShieldAlert className="h-3.5 w-3.5" />}
            ${debt.toLocaleString()}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(customer)}>
                <Pencil className="size-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => onDelete(customer)}>
                <Trash className="size-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
