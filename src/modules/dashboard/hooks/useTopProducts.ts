import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";

export interface TopProduct {
  productId: string;
  productNameEn: string;
  productNameAr: string;
  unitsSold: number;
  revenue: number;
}

export function useTopProducts() {
  return useQuery({
    queryKey: ["topProducts"],
    queryFn: async () => {
      const { data } = await apiClient.get<any[]>("/Dashboard/top-products");
      return data.map((d: any) => ({
        productId: d.productId || d.id,
        productNameEn: d.productNameEn || "",
        productNameAr: d.productNameAr || "",
        unitsSold: d.unitsSold ?? 0,
        revenue: d.revenue ?? 0,
      }));
    },
  });
}
