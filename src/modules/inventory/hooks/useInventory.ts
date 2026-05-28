import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryService } from "../services/inventoryService";

export function useInventory() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => inventoryService.getAllProducts(),
  });
}

export function useAdjustStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) =>
      inventoryService.adjustStock(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
