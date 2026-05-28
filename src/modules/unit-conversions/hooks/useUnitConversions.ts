import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { unitConversionsService } from "../services/unitConversionsService";
import { toast } from "sonner";

export function useUnitConversions() {
  return useQuery({ queryKey: ["unitConversions"], queryFn: () => unitConversionsService.getAll() });
}

export function useCreateUnitConversion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { fromUnitId: string; toUnitId: string; factor: number; active?: boolean }) =>
      unitConversionsService.create(payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["unitConversions"] }); toast.success("Conversion created"); },
    onError: (e: any) => toast.error(e?.response?.data?.title || "Failed to create conversion"),
  });
}

export function useUpdateUnitConversion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => unitConversionsService.update(id, payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["unitConversions"] }); toast.success("Conversion updated"); },
    onError: (e: any) => toast.error(e?.response?.data?.title || "Failed to update conversion"),
  });
}

export function useDeleteUnitConversion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => unitConversionsService.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["unitConversions"] }); toast.success("Conversion deleted"); },
    onError: (e: any) => toast.error(e?.response?.data?.title || "Failed to delete conversion"),
  });
}
