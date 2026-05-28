"use client";

import { UnitConversionsList } from "@/modules/unit-conversions";

export default function UnitConversionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Unit Conversions</h1>
        <p className="text-muted-foreground">Manage unit conversion factors for inventory and product measurements</p>
      </div>
      <UnitConversionsList />
    </div>
  );
}
