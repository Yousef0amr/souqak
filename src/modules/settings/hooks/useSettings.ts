import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService, type Category, type Brand, type Unit, type Tax } from "../services/settingsService";

// Categories hooks
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => settingsService.getCategories(),
  });
}

export function useAddCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category: Omit<Category, "id">) => settingsService.addCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, category }: { id: string; category: Omit<Category, "id"> }) =>
      settingsService.updateCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => settingsService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

// Brands hooks
export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => settingsService.getBrands(),
  });
}

export function useAddBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (brand: Omit<Brand, "id">) => settingsService.addBrand(brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, brand }: { id: string; brand: Omit<Brand, "id"> }) =>
      settingsService.updateBrand(id, brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => settingsService.deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

// Units hooks
export function useUnits() {
  return useQuery({
    queryKey: ["units"],
    queryFn: () => settingsService.getUnits(),
  });
}

export function useAddUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (unit: Omit<Unit, "id">) => settingsService.addUnit(unit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}

export function useUpdateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, unit }: { id: string; unit: Omit<Unit, "id"> }) =>
      settingsService.updateUnit(id, unit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}

export function useDeleteUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => settingsService.deleteUnit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}

// Taxes hooks
export function useTaxes() {
  return useQuery({
    queryKey: ["taxes"],
    queryFn: () => settingsService.getTaxes(),
  });
}

export function useAddTax() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tax: Omit<Tax, "id">) => settingsService.addTax(tax),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxes"] });
    },
  });
}

export function useUpdateTax() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, tax }: { id: string; tax: Omit<Tax, "id"> }) =>
      settingsService.updateTax(id, tax),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxes"] });
    },
  });
}

export function useDeleteTax() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => settingsService.deleteTax(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxes"] });
    },
  });
}
