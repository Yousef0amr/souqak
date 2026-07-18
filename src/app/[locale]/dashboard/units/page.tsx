import React from "react";
import { UnitsList } from "@/modules/settings/components/UnitsList";

export const metadata = {
  title: "Measurement Units | Souqak",
};

export default function UnitsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Measurement Units</h1>
        <p className="text-muted-foreground">
          Manage measurement units for selling and stocking products.
        </p>
      </div>
      <UnitsList />
    </div>
  );
}
