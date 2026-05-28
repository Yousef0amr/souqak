import { axiosInstance } from "@/config/axiosInstance";

export interface ExpenseCategory {
  id: string;
  nameEn: string;
  nameAr: string;
  createdAt: string;
}

const mapDto = (dto: any): ExpenseCategory => ({
  id: dto.id,
  nameEn: dto.nameEn || "",
  nameAr: dto.nameAr || "",
  createdAt: dto.createdAt || new Date().toISOString(),
});

export const expenseCategoriesService = {
  getAll: async (): Promise<ExpenseCategory[]> => {
    const { data } = await axiosInstance.get<any[]>("/ExpenseCategories");
    return data.map(mapDto);
  },

  getById: async (id: string): Promise<ExpenseCategory> => {
    const { data } = await axiosInstance.get<any>(`/ExpenseCategories/${id}`);
    return mapDto(data);
  },

  create: async (payload: { nameEn: string; nameAr?: string }): Promise<ExpenseCategory> => {
    const { data } = await axiosInstance.post<any>("/ExpenseCategories", payload);
    return mapDto(data);
  },

  update: async (id: string, payload: { nameEn?: string; nameAr?: string }): Promise<ExpenseCategory> => {
    const { data } = await axiosInstance.put<any>(`/ExpenseCategories/${id}`, payload);
    return mapDto(data);
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/ExpenseCategories/${id}`);
  },
};
