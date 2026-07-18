import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taxesService } from "../services/taxesService";
import { Tax } from "../types/tax";

export function useTaxes() {
  return useQuery({
    queryKey: ["taxes"],
    queryFn: () => taxesService.getAll(),
  });
}

export function useAddTax() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tax: Omit<Tax, "id">) => taxesService.create(tax),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxes"] });
    },
  });
}

export function useUpdateTax() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, tax }: { id: string; tax: Omit<Tax, "id"> }) =>
      taxesService.update(id, tax),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxes"] });
    },
  });
}

export function useDeleteTax() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taxesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxes"] });
    },
  });
}
