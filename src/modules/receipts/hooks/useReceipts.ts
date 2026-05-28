import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { receiptsService } from "../services/receiptsService";
import { toast } from "sonner";

export function useReceipt(id: string) {
  return useQuery({
    queryKey: ["receipt", id],
    queryFn: () => receiptsService.getById(id),
    enabled: !!id,
  });
}

export function useReceiptsByOrder(orderId: string) {
  return useQuery({
    queryKey: ["receipts", "order", orderId],
    queryFn: () => receiptsService.getByOrderId(orderId),
    enabled: !!orderId,
  });
}

export function useVoidReceipt() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => receiptsService.void(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["receipts"] });
      toast.success("Receipt voided");
    },
    onError: (e: any) => toast.error(e?.response?.data?.title || "Failed to void receipt"),
  });
}
