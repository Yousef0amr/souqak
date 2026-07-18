import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { unitsService } from "../services/unitsService";
import { Unit } from "../types/unit";

export function useUnits() {
  return useQuery({
    queryKey: ["units"],
    queryFn: () => unitsService.getAll(),
  });
}

export function useAddUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (unit: Omit<Unit, "id">) => unitsService.create(unit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}

export function useUpdateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, unit }: { id: string; unit: Omit<Unit, "id"> }) =>
      unitsService.update(id, unit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}

export function useDeleteUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => unitsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}
