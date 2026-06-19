import {
  getApiReportsSummary,
  getApiReportsDailySales,
  getApiReportsCategorySales,
  getApiReportsBrandSales,
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";

export interface ReportSummary {
  totalRevenue: number;
  totalOrders: number;
  topProductNameEn: string;
  topProductNameAr: string;
  profitMargin: number;
}

export interface DailyReportRow {
  date: string;
  amount: number;
  orderCount: number;
}

export interface CategoryReport {
  categoryId: string;
  categoryNameEn: string;
  categoryNameAr: string;
  amount: number;
  orderCount: number;
}

export interface BrandReport {
  brandId: string;
  brandNameEn: string;
  brandNameAr: string;
  amount: number;
  orderCount: number;
}

export const reportsService = {
  getSummary: async (): Promise<ReportSummary> => {
    const response = await getApiReportsSummary({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    const data = response.data;
    return {
      totalRevenue: data.totalRevenue ?? 0,
      totalOrders: data.totalOrders ?? 0,
      topProductNameEn: data.topProductNameEn || "",
      topProductNameAr: data.topProductNameAr || "",
      profitMargin: data.profitMargin ?? 0,
    };
  },

  getDailySales: async (startDate?: string, endDate?: string): Promise<DailyReportRow[]> => {
    const response = await getApiReportsDailySales({
      client: swaggerApiClient,
      query: {
        StartDate: startDate,
        EndDate: endDate,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map((d: any) => ({
      date: d.date ? d.date.split("T")[0] : "",
      amount: d.amount ?? 0,
      orderCount: d.orderCount ?? 0,
    }));
  },

  getCategorySales: async (startDate?: string, endDate?: string): Promise<CategoryReport[]> => {
    const response = await getApiReportsCategorySales({
      client: swaggerApiClient,
      query: {
        StartDate: startDate,
        EndDate: endDate,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map((d: any) => ({
      categoryId: d.categoryId,
      categoryNameEn: d.categoryNameEn || "",
      categoryNameAr: d.categoryNameAr || "",
      amount: d.amount ?? 0,
      orderCount: d.orderCount ?? 0,
    }));
  },

  getBrandSales: async (startDate?: string, endDate?: string): Promise<BrandReport[]> => {
    const response = await getApiReportsBrandSales({
      client: swaggerApiClient,
      query: {
        StartDate: startDate,
        EndDate: endDate,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map((d: any) => ({
      brandId: d.brandId,
      brandNameEn: d.brandNameEn || "",
      brandNameAr: d.brandNameAr || "",
      amount: d.amount ?? 0,
      orderCount: d.orderCount ?? 0,
    }));
  },
};
