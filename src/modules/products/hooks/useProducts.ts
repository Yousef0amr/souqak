import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService, type CreateProductInput } from "../services/productsService";
import { toast } from "sonner";

export function useProductsList(filters?: any) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => productsService.getAll(filters),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateProductInput) =>
      productsService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to create product");
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CreateProductInput> }) =>
      productsService.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to update product");
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to delete product");
    },
  });
}
