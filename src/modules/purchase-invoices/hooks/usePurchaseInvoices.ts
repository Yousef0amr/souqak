import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseInvoicesService, PurchaseInvoice } from "../services/purchaseInvoicesService";
import { toast } from "sonner";

export function usePurchaseInvoices() {
  return useQuery({
    queryKey: ["purchaseInvoices"],
    queryFn: () => purchaseInvoicesService.getAll(),
  });
}

export function usePendingPurchaseInvoices() {
  return useQuery({
    queryKey: ["purchaseInvoices", "pending"],
    queryFn: () => purchaseInvoicesService.getPending(),
  });
}

export function usePurchaseInvoice(id: string) {
  return useQuery({
    queryKey: ["purchaseInvoice", id],
    queryFn: () => purchaseInvoicesService.getById(id),
    enabled: !!id,
  });
}

export function useCreatePurchaseInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof purchaseInvoicesService.create>[0]) =>
      purchaseInvoicesService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchaseInvoices"] });
      toast.success("Purchase Invoice created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to create Purchase Invoice");
    },
  });
}

export function useApprovePurchaseInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => purchaseInvoicesService.approve(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["purchaseInvoices"] });
      queryClient.invalidateQueries({ queryKey: ["purchaseInvoice", id] });
      toast.success("Purchase Invoice approved and stock updated");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to approve Purchase Invoice");
    },
  });
}


