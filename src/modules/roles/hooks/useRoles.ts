import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesService } from "../services/rolesService";
import { UpdateRolePermissionsPayload, Role } from "../types/role";

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => rolesService.getRoles(),
  });
}

export function usePermissions() {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: () => rolesService.getPermissions(),
  });
}

export function useUpdateRolePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateRolePermissionsPayload) => rolesService.updateRolePermission(payload),
    onSuccess: () => {
      // User prefers strict accuracy over zero-latency updates, so we invalidate and re-fetch.
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string; name: string; description: string; isSystem?: boolean; isCustom?: boolean; active?: boolean; permissions: string[] }) => rolesService.updateRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string; description: string; isSystem?: boolean; active?: boolean; permissions: string[] }) => rolesService.createRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
