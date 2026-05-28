import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { unitsService } from "../services/unitsService";
import { UnitDto, CreateUnitCommand } from "../types/unit";

export function useUnitsList() {
  return useQuery({
    queryKey: ["units"],
    queryFn: () => unitsService.getAll(),
  });
}

export function useUnit(id: string) {
  return useQuery({
    queryKey: ["units", id],
    queryFn: () => unitsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (unit: CreateUnitCommand) => unitsService.create(unit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}

export function useUpdateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, command }: { id: string; command: CreateUnitCommand }) =>
      unitsService.update(id, { id, request: command.request }),
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
