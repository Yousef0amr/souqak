import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { storesService, type CreateStoreInput, type UpdateStoreInput } from "../services/storesService";

export const storeQueryKeys = {
  all: () => ["stores"] as const,
  lists: () => [...storeQueryKeys.all(), "list"] as const,
  my: () => [...storeQueryKeys.all(), "my"] as const,
  detail: (id: string) => [...storeQueryKeys.all(), "detail", id] as const,
};

export function useStores() {
  return useQuery({
    queryKey: storeQueryKeys.lists(),
    queryFn: () => storesService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useMyStores() {
  return useQuery({
    queryKey: storeQueryKeys.my(),
    queryFn: () => storesService.getMyStores(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useStore(id: string) {
  return useQuery({
    queryKey: storeQueryKeys.detail(id),
    queryFn: () => storesService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateStoreInput) => storesService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storeQueryKeys.all() });
    },
  });
}

export function useUpdateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateStoreInput }) => storesService.update(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: storeQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: storeQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: storeQueryKeys.my() });
    },
  });
}

export function useDeleteStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => storesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storeQueryKeys.all() });
    },
  });
}

export function useAssignUserToStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, userId, role }: { storeId: string; userId: string; role: string }) =>
      storesService.assignUser(storeId, userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storeQueryKeys.all() });
    },
  });
}
