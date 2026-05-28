import React from "react";
import { RevenueDetailsChart } from "@/modules/analytics";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground">
          Detailed sales projections and payment channel analysis
        </p>
      </div>
      <RevenueDetailsChart />
    </div>
  );
}
