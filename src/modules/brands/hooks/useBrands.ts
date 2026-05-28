import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { brandsService } from "../services/brandsService";
import { BrandDto, CreateBrandCommand } from "../types/brand";

export function useBrandsList() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => brandsService.getAll(),
  });
}

export function useBrand(id: string) {
  return useQuery({
    queryKey: ["brands", id],
    queryFn: () => brandsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (brand: CreateBrandCommand) => brandsService.create(brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, command }: { id: string; command: CreateBrandCommand }) =>
      brandsService.update(id, { id, request: command.request }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => brandsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}
