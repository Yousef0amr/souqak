import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { expensesService } from "../services/expensesService";
import { toast } from "sonner";
import { Expense } from "../types/expense";

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: () => expensesService.getExpenses(),
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => expensesService.deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense deleted");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to delete expense");
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Expense, "id" | "date"> }) =>
      expensesService.updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense updated");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to update expense");
    },
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (expense: Omit<Expense, "id" | "date">) =>
      expensesService.createExpense(expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense recorded");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to create expense");
    },
  });
}
