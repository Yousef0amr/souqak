import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { expenseCategoriesService, ExpenseCategory } from "../services/expenseCategoriesService";
import { toast } from "sonner";

export function useExpenseCategories() {
  return useQuery({
    queryKey: ["expenseCategories"],
    queryFn: () => expenseCategoriesService.getAll(),
  });
}

export function useCreateExpenseCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { nameEn: string; nameAr?: string }) => expenseCategoriesService.create(payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["expenseCategories"] }); toast.success("Category created"); },
    onError: (e: any) => toast.error(e?.response?.data?.title || "Failed to create category"),
  });
}

export function useUpdateExpenseCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { nameEn?: string; nameAr?: string } }) =>
      expenseCategoriesService.update(id, payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["expenseCategories"] }); toast.success("Category updated"); },
    onError: (e: any) => toast.error(e?.response?.data?.title || "Failed to update category"),
  });
}

export function useDeleteExpenseCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => expenseCategoriesService.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["expenseCategories"] }); toast.success("Category deleted"); },
    onError: (e: any) => toast.error(e?.response?.data?.title || "Failed to delete category"),
  });
}
