"use client";

import React, { useState } from "react";
import { usePaymentInvoices, useOverdueInvoices, type PaymentInvoice } from "../index";
import { DataTable } from "@/common/tables/DataTable";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { Search, DollarSign, CreditCard, Activity, CheckCircle, AlertTriangle } from "lucide-react";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { MarkPaidDialog } from "./MarkPaidDialog";

export function PaymentsList() {
  const { data: invoices = [], isLoading } = usePaymentInvoices();
  const { data: overdueInvoices = [] } = useOverdueInvoices();
  const [searchQuery, setSearchQuery] = useState("");
  const [showOverdue, setShowOverdue] = useState(false);
  const [markPaidTarget, setMarkPaidTarget] = useState<PaymentInvoice | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const displayInvoices = showOverdue ? overdueInvoices : invoices;

  const filteredInvoices = displayInvoices.filter(
    (inv: PaymentInvoice) =>
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<PaymentInvoice>[] = [
    {
      accessorKey: "invoiceNumber",
      header: "Invoice No.",
      cell: ({ row }) => <span className="font-mono font-semibold text-xs">{row.original.invoiceNumber}</span>,
    },
    {
      accessorKey: "customerName",
      header: "Customer",
    },
    {
      accessorKey: "total",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-bold">${row.original.total.toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "balance",
      header: "Balance",
      cell: ({ row }) => {
        const b = row.original.balance;
        return (
          <span className={b > 0 ? "font-medium text-red-500" : "text-muted-foreground"}>
            ${b.toFixed(2)}
          </span>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Method",
      cell: ({ row }) => (
        <Badge variant={row.original.paymentMethod === "Card" ? "default" : "secondary"}>
          {row.original.paymentMethod}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status;
        return (
          <Badge
            className={
              s === "Paid"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"
                : "bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400"
            }
          >
            {s}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const inv = row.original;
        if (inv.status === "Paid") return null;
        return (
          <Button variant="outline" size="sm" onClick={() => setMarkPaidTarget(inv)}>
            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Mark Paid
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border p-4 flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-md text-emerald-600 dark:text-emerald-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Total Invoiced</p>
            <p className="text-lg font-bold">
              ${invoices.reduce((acc: number, i: PaymentInvoice) => acc + i.total, 0).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4 flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-md text-indigo-600 dark:text-indigo-400">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Outstanding</p>
            <p className="text-lg font-bold">
              ${invoices.filter((i: PaymentInvoice) => i.status !== "Paid").reduce((acc: number, i: PaymentInvoice) => acc + i.balance, 0).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4 flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-md text-amber-600 dark:text-amber-400">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Overdue</p>
            <p className="text-lg font-bold">{overdueInvoices.length}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 max-w-sm flex-1">
            <Search className="h-4 w-4 text-muted-foreground absolute ml-3" />
            <Input
              placeholder="Search invoice or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant={showOverdue ? "default" : "outline"}
            onClick={() => setShowOverdue(!showOverdue)}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            {showOverdue ? "All Invoices" : `Overdue (${overdueInvoices.length})`}
          </Button>
        </div>

        <div className="rounded-lg border bg-card shadow-sm p-2">
          <DataTable
            data={filteredInvoices}
            columns={columns}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            isLoading={isLoading}
            scrollAreaClassName="h-[400px]"
          />
        </div>
      </div>

      <MarkPaidDialog
        invoice={markPaidTarget}
        onClose={() => setMarkPaidTarget(null)}
      />
    </div>
  );
}
