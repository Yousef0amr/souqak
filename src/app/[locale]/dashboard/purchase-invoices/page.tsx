"use client";

import React, { useState } from "react";
import { PurchaseInvoicesList, CreatePurchaseInvoiceForm } from "@/modules/purchase-invoices";
import { Button } from "@/common/buttons/button";
import { ArrowLeft } from "lucide-react";

export default function PurchaseInvoicesPage() {
  const [view, setView] = useState<"list" | "create">("list");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Invoices</h1>
          <p className="text-muted-foreground">Manage supplier invoices, purchase orders, and receive catalog inventory</p>
        </div>
        {view === "create" && (
          <Button variant="outline" onClick={() => setView("list")} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to List
          </Button>
        )}
      </div>

      {view === "list" ? (
        <PurchaseInvoicesList onCreateNew={() => setView("create")} />
      ) : (
        <CreatePurchaseInvoiceForm
          onSuccess={() => setView("list")}
          onCancel={() => setView("list")}
        />
      )}
    </div>
  );
}
