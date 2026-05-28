import { axiosInstance } from "@/config/axiosInstance";

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
    const { data } = await axiosInstance.get<ReportSummary>("/Reports/summary");
    return {
      totalRevenue: data.totalRevenue ?? 0,
      totalOrders: data.totalOrders ?? 0,
      topProductNameEn: data.topProductNameEn || "",
      topProductNameAr: data.topProductNameAr || "",
      profitMargin: data.profitMargin ?? 0,
    };
  },

  getDailySales: async (startDate?: string, endDate?: string): Promise<DailyReportRow[]> => {
    const params: any = {};
    if (startDate) params.StartDate = startDate;
    if (endDate) params.EndDate = endDate;
    const { data } = await axiosInstance.get<any[]>("/Reports/daily-sales", { params });
    return data.map((d) => ({
      date: d.date ? d.date.split("T")[0] : "",
      amount: d.amount ?? 0,
      orderCount: d.orderCount ?? 0,
    }));
  },

  getCategorySales: async (startDate?: string, endDate?: string): Promise<CategoryReport[]> => {
    const params: any = {};
    if (startDate) params.StartDate = startDate;
    if (endDate) params.EndDate = endDate;
    const { data } = await axiosInstance.get<any[]>("/Reports/category-sales", { params });
    return data.map((d) => ({
      categoryId: d.categoryId,
      categoryNameEn: d.categoryNameEn || "",
      categoryNameAr: d.categoryNameAr || "",
      amount: d.amount ?? 0,
      orderCount: d.orderCount ?? 0,
    }));
  },

  getBrandSales: async (startDate?: string, endDate?: string): Promise<BrandReport[]> => {
    const params: any = {};
    if (startDate) params.StartDate = startDate;
    if (endDate) params.EndDate = endDate;
    const { data } = await axiosInstance.get<any[]>("/Reports/brand-sales", { params });
    return data.map((d) => ({
      brandId: d.brandId,
      brandNameEn: d.brandNameEn || "",
      brandNameAr: d.brandNameAr || "",
      amount: d.amount ?? 0,
      orderCount: d.orderCount ?? 0,
    }));
  },
};
