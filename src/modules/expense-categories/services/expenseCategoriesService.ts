import {
  deleteApiExpenseCategoriesById,
  getApiExpenseCategories,
  getApiExpenseCategoriesById,
  postApiExpenseCategories,
  putApiExpenseCategoriesById,
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";

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
    const response = await getApiExpenseCategories({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapDto);
  },

  getById: async (id: string): Promise<ExpenseCategory> => {
    const response = await getApiExpenseCategoriesById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapDto(response.data);
  },

  create: async (payload: { nameEn: string; nameAr?: string }): Promise<ExpenseCategory> => {
    const response = await postApiExpenseCategories({
      client: swaggerApiClient,
      body: {
        nameEn: payload.nameEn,
        nameAr: payload.nameAr,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapDto(response.data);
  },

  update: async (id: string, payload: { nameEn?: string; nameAr?: string }): Promise<ExpenseCategory> => {
    const response = await putApiExpenseCategoriesById({
      client: swaggerApiClient,
      path: { id },
      body: {
        nameEn: payload.nameEn,
        nameAr: payload.nameAr,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapDto(response.data);
  },

  delete: async (id: string): Promise<void> => {
    await deleteApiExpenseCategoriesById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
  },
};
