import React from "react";
import { SettingsPanel } from "@/modules/settings";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Manage product categories, measurement units, and store VAT tax levels
        </p>
      </div>
      <SettingsPanel />
    </div>
  );
}
