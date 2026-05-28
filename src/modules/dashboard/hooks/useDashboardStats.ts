import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";

export interface DashboardStats {
  revenueToday: number;
  revenueTrend: number;
  ordersToday: number;
  ordersTrend: number;
  avgOrderValue: number;
  avgOrderTrend: number;
  lowStockCount: number;
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const { data } = await apiClient.get<DashboardStats>("/Dashboard/stats");
      return data;
    },
    retry: 1,
  });
}
