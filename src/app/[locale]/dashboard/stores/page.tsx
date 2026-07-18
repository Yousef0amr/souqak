import React from "react";
import { StoresList } from "@/modules/stores/components/StoresList";

export const metadata = {
  title: "Stores | Souqak",
};

export default function StoresPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Stores</h1>
        <p className="text-muted-foreground">
          Manage your business stores, branches, and their respective operational statuses.
        </p>
      </div>
      <StoresList />
    </div>
  );
}
