import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";

export interface StockLevel {
  productId: string;
  productNameEn: string;
  productNameAr: string;
  currentStock: number;
  maxStock: number;
}

export function useStockLevels() {
  return useQuery({
    queryKey: ["stockLevels"],
    queryFn: async () => {
      const { data } = await apiClient.get<any[]>("/Dashboard/stock-levels");
      return data.map((d: any) => ({
        productId: d.productId || d.id,
        productNameEn: d.productNameEn || "",
        productNameAr: d.productNameAr || "",
        currentStock: d.currentStock ?? 0,
        maxStock: d.maxStock ?? 100,
      }));
    },
  });
}
