import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";

export interface RecentOrder {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
}

export function useRecentOrders() {
  return useQuery({
    queryKey: ["recentOrders"],
    queryFn: async () => {
      const { data } = await apiClient.get<any[]>("/Dashboard/recent-orders");
      return data.map((d: any) => ({
        id: d.id,
        orderNumber: d.orderNumber || `ORD-${d.id.slice(0, 8)}`,
        total: d.total ?? 0,
        status: d.status || "Pending",
        createdAt: d.createdAt || new Date().toISOString(),
      }));
    },
  });
}
