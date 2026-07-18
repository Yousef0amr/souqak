import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "../services/categoriesService";
import { Category } from "../types/category";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesService.getAll(),
  });
}

export function useAddCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category: Omit<Category, "id">) => categoriesService.create(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, category }: { id: string; category: Omit<Category, "id"> }) =>
      categoriesService.update(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoriesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
