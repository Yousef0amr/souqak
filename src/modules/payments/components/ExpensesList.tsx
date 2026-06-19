"use client";

import React, { useState } from "react";
import { DataTable } from "@/common/tables/DataTable";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";
import { Input } from "@/common/forms/input";
import { Search, Plus, DollarSign, Wallet, FileText, Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/common/shared/confirm-dialog";
import { useExpenses, useCreateExpense, useDeleteExpense, useUpdateExpense } from "../index";
import { type Expense } from "../index";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/models/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const expenseSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  category: z.string().min(2, "Category must be specified"),
  status: z.enum(["Paid", "Pending"]),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export function ExpensesList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);

  const { data: expenses = [], isLoading } = useExpenses();

  const createExpenseMutation = useCreateExpense();
  const deleteExpenseMutation = useDeleteExpense();
  const updateExpenseMutation = useUpdateExpense();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      status: "Paid",
    },
  });

  const openEdit = (exp: Expense) => {
    setEditingExpense(exp);
    setValue("title", exp.title);
    setValue("amount", exp.amount);
    setValue("category", exp.category);
    setValue("status", exp.status);
  };

  const onSubmit = (data: ExpenseFormData) => {
    if (editingExpense) {
      updateExpenseMutation.mutate(
        { id: editingExpense.id, data },
        {
          onSuccess: () => {
            setEditingExpense(null);
            reset();
          },
        }
      );
    } else {
      createExpenseMutation.mutate(data, {
        onSuccess: () => {
          setIsAddOpen(false);
          reset();
        },
      });
    }
  };

  const filteredExpenses = expenses.filter(
    (exp: Expense) =>
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<Expense>[] = [
    {
      accessorKey: "title",
      header: "Expense Description",
      cell: ({ row }) => <span className="font-semibold text-foreground">{row.original.title}</span>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <Badge variant="secondary">{row.original.category}</Badge>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-bold text-red-500 tabular-nums">
          -${row.original.amount.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "date",
      header: "Payout Date",
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.date}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "Paid" ? "default" : "outline"}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const exp = row.original;
        return (
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(exp)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-red-500"
              onClick={() => setDeleteTarget(exp)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 max-w-sm w-full">
          <Search className="h-4 w-4 text-muted-foreground absolute ml-3" />
          <Input
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Log Expense
        </Button>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
        <DataTable
          data={filteredExpenses}
          columns={columns}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          isLoading={isLoading}
          scrollAreaClassName="h-[400px]"
        />
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        onConfirm={() => {
          if (deleteTarget) {
            deleteExpenseMutation.mutate(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        title="Delete expense"
        description="Are you sure you want to delete this expense?"
      />

      <Dialog open={isAddOpen || !!editingExpense} onOpenChange={(open) => { if (!open) { setIsAddOpen(false); setEditingExpense(null); reset(); } }}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <Wallet className="h-5 w-5 text-indigo-500" />
              {editingExpense ? "Edit Expense" : "Record Business Expense"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Expense Title</span>
              <Input placeholder="AWS Infrastructure, Printer rolls..." {...register("title")} />
              {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Amount ($)</span>
                <Input type="number" placeholder="150" {...register("amount", { valueAsNumber: true })} />
                {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Category</span>
                <Input placeholder="Utilities, Supplies..." {...register("category")} />
                {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Payout Status</span>
              <select
                {...register("status")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => { setIsAddOpen(false); setEditingExpense(null); reset(); }}>
                Cancel
              </Button>
              <Button type="submit" disabled={createExpenseMutation.isPending}>
                {createExpenseMutation.isPending || updateExpenseMutation.isPending
                  ? "Saving..."
                  : editingExpense ? "Update Expense" : "Confirm Log"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
