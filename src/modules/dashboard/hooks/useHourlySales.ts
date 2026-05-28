import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";

export interface HourlySale {
  hour: number;
  revenue: number;
  orderCount: number;
}

export function useHourlySales() {
  return useQuery({
    queryKey: ["hourlySales"],
    queryFn: async () => {
      const { data } = await apiClient.get<any[]>("/Dashboard/hourly-sales");
      return data.map((d: any) => ({
        hour: d.hour ?? 0,
        revenue: d.revenue ?? 0,
        orderCount: d.orderCount ?? 0,
      }));
    },
  });
}
