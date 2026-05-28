"use client";

import { ReceiptsList } from "@/modules/receipts";

export default function ReceiptsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Receipts</h1>
        <p className="text-muted-foreground">Look up and manage customer receipts</p>
      </div>
      <ReceiptsList />
    </div>
  );
}
