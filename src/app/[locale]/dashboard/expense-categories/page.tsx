"use client";

import { ExpenseCategoriesList } from "@/modules/expense-categories";

export default function ExpenseCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Expense Categories</h1>
        <p className="text-muted-foreground">Categorize and organize business expenses</p>
      </div>
      <ExpenseCategoriesList />
    </div>
  );
}
