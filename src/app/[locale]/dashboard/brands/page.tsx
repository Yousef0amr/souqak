import React from "react";
import { BrandsList } from "@/modules/settings/components/BrandsList";

export const metadata = {
  title: "Brands | Souqak",
};

export default function BrandsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Brands</h1>
        <p className="text-muted-foreground">
          Manage product brands and their details.
        </p>
      </div>
      <BrandsList />
    </div>
  );
}
