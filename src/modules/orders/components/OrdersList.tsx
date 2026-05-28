"use client";

import React, { useState } from "react";
import { useOrders } from "../hooks/useOrders";
import { DataTable } from "@/common/tables/DataTable";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { Search, Eye, ShoppingCart, Plus } from "lucide-react";
import { useRouter } from "@/config/i18n/navigation";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/models/dialog";
import type { Order } from "../services/ordersService";

export function OrdersList() {
  const { data: orders = [], isLoading } = useOrders();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const filteredOrders = orders.filter(
    (order: Order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "orderNumber",
      header: "Order #",
      cell: ({ row }) => <span className="font-semibold">{row.original.orderNumber}</span>,
    },
    {
      accessorKey: "customerName",
      header: "Customer",
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => (
        <span className="font-medium text-emerald-600 dark:text-emerald-400">
          ${row.original.total.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "itemsCount",
      header: "Items",
      cell: ({ row }) => <span>{row.original.itemsCount} items</span>,
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment",
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
        const status = row.original.status;
        return (
          <Badge
            className={
              status === "Completed"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800"
                : status === "Pending"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-muted-foreground whitespace-nowrap">
          {new Date(row.original.date).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(row.original)}>
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 max-w-sm flex-1">
          <Search className="h-4 w-4 text-muted-foreground absolute ml-3" />
          <Input
            placeholder="Search by order or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => router.push("/dashboard/orders/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
        <DataTable
          data={filteredOrders}
          columns={columns}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          isLoading={isLoading}
          scrollAreaClassName="h-[500px]"
        />
      </div>

      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                <ShoppingCart className="h-5 w-5 text-indigo-500" />
                Order Details - {selectedOrder.orderNumber}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4 text-sm">
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <span className="text-muted-foreground block text-xs">Customer Name</span>
                  <span className="font-semibold text-foreground text-sm">{selectedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Date & Time</span>
                  <span className="font-semibold text-foreground text-sm">
                    {new Date(selectedOrder.date).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Payment Method</span>
                  <span className="font-semibold text-foreground text-sm">{selectedOrder.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Order Status</span>
                  <span className="font-semibold text-foreground text-sm">{selectedOrder.status}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-base mb-2">Items Breakdown</h4>
                <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1.5 border-b last:border-0">
                      <div>
                        <div className="font-medium text-foreground">{item.name}</div>
                        <div className="text-muted-foreground text-xs">
                          {item.quantity} x ${item.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="font-semibold text-foreground">
                        ${(item.quantity * item.price).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t font-semibold text-base">
                <span>Total Amount Due:</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-lg">
                  ${selectedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
