import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentInvoicesService } from "../services/paymentInvoicesService";
import { toast } from "sonner";

export function usePaymentInvoices() {
  return useQuery({
    queryKey: ["paymentInvoices"],
    queryFn: () => paymentInvoicesService.getPaymentInvoices(),
  });
}

export function useOverdueInvoices() {
  return useQuery({
    queryKey: ["overdueInvoices"],
    queryFn: () => paymentInvoicesService.getOverdueInvoices(),
  });
}

export function useMarkInvoicePaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, amountPaid }: { id: string; amountPaid?: number }) =>
      paymentInvoicesService.markInvoicePaid(id, amountPaid),
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
