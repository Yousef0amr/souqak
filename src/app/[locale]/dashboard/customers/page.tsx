import React from "react";
import { CustomersList } from "@/modules/customers";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customer Directory</h1>
        <p className="text-muted-foreground">
          Manage customer accounts, outstanding debt, and credit thresholds
        </p>
      </div>
      <CustomersList />
    </div>
  );
}
