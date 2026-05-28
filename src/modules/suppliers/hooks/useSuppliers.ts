import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { suppliersService, Supplier } from "../services/suppliersService";
import { toast } from "sonner";

export function useSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: () => suppliersService.getAll(),
  });
}

export function useSupplier(id: string) {
  return useQuery({
    queryKey: ["supplier", id],
    queryFn: () => suppliersService.getById(id),
    enabled: !!id,
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Omit<Supplier, "id" | "totalPurchases" | "createdAt">) =>
      suppliersService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Supplier registered successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to register supplier");
    },
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Omit<Supplier, "id" | "totalPurchases" | "createdAt">>;
    }) => suppliersService.update(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      queryClient.invalidateQueries({ queryKey: ["supplier", id] });
      toast.success("Supplier profile updated");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to update supplier");
    },
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => suppliersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Supplier profile deleted");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to delete supplier");
    },
  });
}
