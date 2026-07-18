import React from "react";
import { CategoriesList } from "@/modules/settings/components/CategoriesList";

export const metadata = {
  title: "Categories | Souqak",
};

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Categories</h1>
        <p className="text-muted-foreground">
          Manage your product categories, their hierarchy, and codes.
        </p>
      </div>
      <CategoriesList />
    </div>
  );
}
