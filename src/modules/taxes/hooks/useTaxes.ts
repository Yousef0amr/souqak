import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taxesService } from "../services/taxesService";
import { TaxDto, CreateTaxCommand } from "../types/tax";

export function useTaxesList() {
  return useQuery({
    queryKey: ["taxes"],
    queryFn: () => taxesService.getAll(),
  });
}

export function useTax(id: string) {
  return useQuery({
    queryKey: ["taxes", id],
    queryFn: () => taxesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTax() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tax: CreateTaxCommand) => taxesService.create(tax),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxes"] });
    },
  });
}

export function useUpdateTax() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, command }: { id: string; command: CreateTaxCommand }) =>
      taxesService.update(id, { id, request: command.request }),
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
