"use client";

import React, { useState } from "react";
import { PaymentsList, ExpensesList } from "@/modules/payments";
import { CreditCard, FileText } from "lucide-react";

export default function PaymentsPage() {
  const [tab, setTab] = useState<"invoices" | "expenses">("invoices");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments & Ledger</h1>
          <p className="text-muted-foreground">
            Audit store billing invoices and manage outbound business expenses
          </p>
        </div>

        <div className="flex border rounded-lg overflow-hidden bg-muted p-1 self-start md:self-auto">
          <button
            onClick={() => setTab("invoices")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
              tab === "invoices"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            Billed Invoices
          </button>
          <button
            onClick={() => setTab("expenses")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
              tab === "expenses"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            Outbound Expenses
          </button>
        </div>
      </div>

      {tab === "invoices" ? <PaymentsList /> : <ExpensesList />}
    </div>
  );
}
