import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reportsService";

export function useSummary() {
  return useQuery({
    queryKey: ["reports", "summary"],
    queryFn: () => reportsService.getSummary(),
  });
}

export function useDailySales(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ["reports", "daily-sales", startDate, endDate],
    queryFn: () => reportsService.getDailySales(startDate, endDate),
  });
}

export function useCategorySales(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ["reports", "category-sales", startDate, endDate],
    queryFn: () => reportsService.getCategorySales(startDate, endDate),
  });
}

export function useBrandSales(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ["reports", "brand-sales", startDate, endDate],
    queryFn: () => reportsService.getBrandSales(startDate, endDate),
  });
}
