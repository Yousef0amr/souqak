"use client";

import React, { useState } from "react";
import { useMarkInvoicePaid } from "../hooks/usePayments";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/models/dialog";

interface MarkPaidDialogProps {
  invoice: { id: string; invoiceNumber: string; total: number; balance: number } | null;
  onClose: () => void;
}

export function MarkPaidDialog({ invoice, onClose }: MarkPaidDialogProps) {
  const { mutate: markPaid, isPending } = useMarkInvoicePaid();
  const [amount, setAmount] = useState<string>("");

  React.useEffect(() => {
    if (invoice) setAmount(invoice.balance.toString());
  }, [invoice]);

  const handleSubmit = () => {
    if (!invoice) return;
    markPaid(
      { id: invoice.id, amountPaid: parseFloat(amount) || undefined },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <Dialog open={!!invoice} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Mark Invoice Paid</DialogTitle>
        </DialogHeader>
        {invoice && (
          <div className="space-y-4 py-2">
            <div className="text-sm">
              <p>Invoice: <strong>{invoice.invoiceNumber}</strong></p>
              <p>Total: <strong>${invoice.total.toFixed(2)}</strong></p>
              <p>Balance: <strong className="text-red-500">${invoice.balance.toFixed(2)}</strong></p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Amount Paid</label>
              <Input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={isPending || !amount}>
                {isPending ? "Processing..." : "Confirm Payment"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
