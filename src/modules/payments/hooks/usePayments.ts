import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentsService } from "../services/paymentsService";
import { toast } from "sonner";
import type { Expense } from "../services/paymentsService";

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: () => paymentsService.getExpenses(),
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => paymentsService.deleteExpense(id),
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
      paymentsService.updateExpense(id, data),
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
      paymentsService.createExpense(expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense recorded");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to create expense");
    },
  });
}

export function usePaymentInvoices() {
  return useQuery({
    queryKey: ["paymentInvoices"],
    queryFn: () => paymentsService.getPaymentInvoices(),
  });
}

export function useOverdueInvoices() {
  return useQuery({
    queryKey: ["overdueInvoices"],
    queryFn: () => paymentsService.getOverdueInvoices(),
  });
}

export function useMarkInvoicePaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, amountPaid }: { id: string; amountPaid?: number }) =>
      paymentsService.markInvoicePaid(id, amountPaid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentInvoices"] });
      queryClient.invalidateQueries({ queryKey: ["overdueInvoices"] });
      toast.success("Invoice marked as paid");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to mark invoice as paid");
    },
  });
}
