"use client";

import React, { useState } from "react";
import { useReceipt, useReceiptsByOrder, useVoidReceipt } from "../hooks/useReceipts";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { Badge } from "@/common/shared/badge";
import { Search, Receipt as ReceiptIcon, FileText, Printer, Ban, Copy, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export function ReceiptsList() {
  const [receiptId, setReceiptId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [mode, setMode] = useState<"id" | "order">("id");
  const [queryValue, setQueryValue] = useState("");

  const { data: receiptById, isLoading: loadingById } = useReceipt(mode === "id" ? queryValue : "");
  const { data: receiptsByOrder, isLoading: loadingByOrder } = useReceiptsByOrder(mode === "order" ? queryValue : "");
  const voidMutation = useVoidReceipt();

  const handleSearch = () => {
    if (mode === "id") setQueryValue(receiptId);
    else setQueryValue(orderId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-indigo-500" />
            Search Receipts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={mode === "id" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("id")}
              >
                By Receipt ID
              </Button>
              <Button
                variant={mode === "order" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("order")}
              >
                By Order ID
              </Button>
            </div>
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Input
                placeholder={mode === "id" ? "Enter receipt ID..." : "Enter order ID..."}
                value={mode === "id" ? receiptId : orderId}
                onChange={(e) => mode === "id" ? setReceiptId(e.target.value) : setOrderId(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
              />
              <Button onClick={handleSearch} disabled={loadingById || loadingByOrder}>
                <Search className="h-4 w-4 mr-1" /> Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {mode === "id" && receiptById && (
        <ReceiptDetailCard receipt={receiptById} onVoid={() => voidMutation.mutate(receiptById.id)} />
      )}

      {mode === "order" && receiptsByOrder && receiptsByOrder.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Found {receiptsByOrder.length} receipt(s) for order
          </h3>
          {receiptsByOrder.map((receipt) => (
            <ReceiptDetailCard
              key={receipt.id}
              receipt={receipt}
              onVoid={() => voidMutation.mutate(receipt.id)}
            />
          ))}
        </div>
      )}

      {mode === "order" && queryValue && receiptsByOrder && receiptsByOrder.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
          <ReceiptIcon className="h-12 w-12 mx-auto opacity-20 mb-2" />
          <p>No receipts found for this order</p>
        </div>
      )}

      {!queryValue && !receiptById && (
        <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
          <ReceiptIcon className="h-16 w-16 mx-auto opacity-20 mb-3" />
          <p className="text-lg font-semibold">Receipt Lookup</p>
          <p className="text-sm opacity-70">Enter a receipt ID or order ID to view receipt details</p>
        </div>
      )}
    </div>
  );
}

function ReceiptDetailCard({
  receipt,
  onVoid,
}: {
  receipt: { id: string; receiptNumber: string; orderId: string; subtotal: number; taxAmount: number; discountAmount: number; total: number; amountPaid: number; change: number; paymentMethod: string; createdAt: string };
  onVoid: () => void;
}) {
  return (
    <Card className="max-w-md mx-auto border-t-4 border-t-indigo-500">
      <CardHeader className="text-center border-b pb-4">
        <ReceiptIcon className="h-8 w-8 mx-auto text-indigo-500 mb-1" />
        <CardTitle className="text-xl">{receipt.receiptNumber}</CardTitle>
        <p className="text-xs text-muted-foreground">Order: {receipt.orderId}</p>
        <p className="text-xs text-muted-foreground">{new Date(receipt.createdAt).toLocaleString()}</p>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="space-y-2 text-sm border-b pb-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${receipt.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax Amount</span>
            <span>${receipt.taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-red-500">-${receipt.discountAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-1">
            <span>Total</span>
            <span className="text-indigo-600">${receipt.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount Paid</span>
            <span className="font-semibold">${receipt.amountPaid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Change</span>
            <span className="font-semibold">${receipt.change.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Payment Method</span>
            <Badge>{receipt.paymentMethod}</Badge>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => toast.success("Receipt ready for print")}>
            <Printer className="h-4 w-4 mr-1" /> Print
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={() => { navigator.clipboard?.writeText(receipt.id); toast.success("Receipt ID copied"); }}>
            <Copy className="h-4 w-4 mr-1" /> Copy ID
          </Button>
          <Button variant="destructive" size="sm" className="flex-1" onClick={onVoid}>
            <Ban className="h-4 w-4 mr-1" /> Void
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
