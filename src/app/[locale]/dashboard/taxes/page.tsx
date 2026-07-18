import React from "react";
import { TaxesList } from "@/modules/settings/components/TaxesList";

export const metadata = {
  title: "VAT & Taxes | Souqak",
};

export default function TaxesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">VAT & Taxes</h1>
        <p className="text-muted-foreground">
          Manage VAT rates and other tax configurations applied to products and orders.
        </p>
      </div>
      <TaxesList />
    </div>
  );
}
