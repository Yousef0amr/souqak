"use client";

import React, { useState } from "react";
import { usePurchaseInvoices, useApprovePurchaseInvoice, useDeletePurchaseInvoice } from "../hooks/usePurchaseInvoices";
import type { PurchaseInvoice } from "../services/purchaseInvoicesService";
import { DataTable } from "@/common/tables/DataTable";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { Search, Plus, Trash2, Check, FileText, ChevronRight } from "lucide-react";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/models/dialog";
import { ConfirmDialog } from "@/common/shared/confirm-dialog";

interface PurchaseInvoicesListProps {
  onCreateNew: () => void;
}

export function PurchaseInvoicesList({ onCreateNew }: PurchaseInvoicesListProps) {
  const { data: invoices = [], isLoading } = usePurchaseInvoices();
  const approveMutation = useApprovePurchaseInvoice();
  const deleteMutation = useDeletePurchaseInvoice();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<PurchaseInvoice | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [approveTarget, setApproveTarget] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.supplierNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.supplierInvoiceNumber && inv.supplierInvoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleApprove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setApproveTarget(id);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeleteTarget(id);
  };

  const columns: ColumnDef<PurchaseInvoice>[] = [
    {
      accessorKey: "referenceNumber",
      header: "PO Reference",
      cell: ({ row }) => <span className="font-mono font-semibold text-xs text-indigo-600">{row.original.referenceNumber}</span>,
    },
    {
      accessorKey: "supplierNameEn",
      header: "Supplier",
      cell: ({ row }) => <span className="font-medium">{row.original.supplierNameEn}</span>,
    },
    {
      accessorKey: "supplierInvoiceNumber",
      header: "Invoice No.",
      cell: ({ row }) => <span>{row.original.supplierInvoiceNumber || "â€”"}</span>,
    },
    {
      accessorKey: "invoiceDate",
      header: "Invoice Date",
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.invoiceDate}</span>,
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => <span className="font-bold">${row.original.total.toLocaleString()}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status;
        const color =
          s === "Approved"
            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"
            : "bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400";
        return <Badge className={color}>{s}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const inv = row.original;
        return (
          <div className="flex items-center gap-2">
            {inv.status === "Pending" && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs font-semibold px-2 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                onClick={(e) => handleApprove(e, inv.id)}
              >
                <Check className="h-3 w-3 mr-1" /> Approve
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-red-500"
              onClick={(e) => handleDelete(e, inv.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 max-w-sm w-full">
          <Search className="h-4 w-4 text-muted-foreground absolute ml-3" />
          <Input
            placeholder="Search PO reference, supplier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={onCreateNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create PO / Invoice
        </Button>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
        <DataTable
          data={filteredInvoices}
          columns={columns}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          isLoading={isLoading}
          onRowClick={(row) => setSelectedInvoice(row)}
          scrollAreaClassName="h-[500px]"
        />
      </div>

      <ConfirmDialog
        open={!!approveTarget}
        onOpenChange={(open) => { if (!open) setApproveTarget(null); }}
        onConfirm={() => {
          if (approveTarget) {
            approveMutation.mutate(approveTarget);
            setApproveTarget(null);
          }
        }}
        title="Approve purchase invoice"
        description="This will automatically add quantities to products stock. Are you sure?"
        confirmLabel="Approve"
        variant="info"
        isLoading={approveMutation.isPending}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        onConfirm={() => {
          if (deleteTarget) {
            deleteMutation.mutate(deleteTarget);
            setDeleteTarget(null);
          }
        }}
        title="Delete purchase invoice"
        description="Are you sure you want to delete this purchase invoice?"
        isLoading={deleteMutation.isPending}
      />

      <Dialog open={!!selectedInvoice} onOpenChange={(open) => { if (!open) setSelectedInvoice(null); }}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <FileText className="h-5 w-5 text-indigo-500" />
              PO Details - {selectedInvoice?.referenceNumber}
            </DialogTitle>
          </DialogHeader>

          {selectedInvoice && (
            <div className="space-y-4 py-2 text-sm">
              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Supplier</p>
                  <p className="font-semibold">{selectedInvoice.supplierNameEn}</p>
                  <p className="text-xs text-muted-foreground">{selectedInvoice.supplierInvoiceNumber ? `Inv: ${selectedInvoice.supplierInvoiceNumber}` : "No supplier invoice number"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">PO Status</p>
                  <Badge className={selectedInvoice.status === "Approved" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}>
                    {selectedInvoice.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">Date: {selectedInvoice.invoiceDate}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Purchase items</p>
                <div className="border rounded-md overflow-hidden text-xs max-h-40 overflow-y-auto">
                  <table className="w-full text-left">
                    <thead className="bg-muted">
                      <tr className="border-b font-semibold">
                        <th className="p-2">Product</th>
                        <th className="p-2 text-center w-16">Qty</th>
                        <th className="p-2 text-right w-24">Unit Cost</th>
                        <th className="p-2 text-right w-24">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedInvoice.items?.map((item) => (
                        <tr key={item.id}>
                          <td className="p-2 font-medium">{item.productNameEn || "Unknown product"}</td>
                          <td className="p-2 text-center">{item.quantity}</td>
                          <td className="p-2 text-right">${item.unitCost.toFixed(2)}</td>
                          <td className="p-2 text-right font-semibold">${item.totalCost.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t pt-3 flex flex-col items-end text-xs space-y-1">
                <div className="flex gap-4 w-40 justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">${selectedInvoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex gap-4 w-40 justify-between">
                  <span className="text-muted-foreground">VAT ({selectedInvoice.taxRate}%):</span>
                  <span className="font-medium">${selectedInvoice.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex gap-4 w-40 justify-between">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="font-medium">${selectedInvoice.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex gap-4 w-40 justify-between border-t pt-1.5 text-sm font-bold">
                  <span>Grand Total:</span>
                  <span className="text-indigo-600">${selectedInvoice.total.toFixed(2)}</span>
                </div>
              </div>

              {selectedInvoice.notes && (
                <div className="bg-muted p-2 rounded text-xs text-muted-foreground">
                  <strong>Notes:</strong> {selectedInvoice.notes}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t">
                {selectedInvoice.status === "Pending" && (
                  <Button
                    variant="default"
                    onClick={() => {
                      approveMutation.mutate(selectedInvoice.id, {
                        onSuccess: () => setSelectedInvoice(null),
                      });
                    }}
                    disabled={approveMutation.isPending}
                  >
                    {approveMutation.isPending ? "Approving..." : "Approve & Receive Stock"}
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelectedInvoice(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
