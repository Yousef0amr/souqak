import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "../services/ordersService";
import { toast } from "sonner";
import type { Order } from "../services/ordersService";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => ordersService.getAll(),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => ordersService.getById(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newOrder: Omit<Order, "id" | "orderNumber" | "date">) => ordersService.create(newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Order created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.title || "Failed to create order");
    },
  });
}
