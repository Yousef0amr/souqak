import {
  deleteApiSuppliersById,
  getApiSuppliers,
  getApiSuppliersById,
  getApiSuppliersByIdPurchases,
  postApiSuppliers,
  putApiSuppliersById,
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";

export interface Supplier {
  id: string;
  nameEn: string;
  nameAr?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxNumber?: string;
  contactPerson?: string;
  website?: string;
  totalPurchases: number;
  createdAt: string;
}

const mapDto = (dto: any): Supplier => ({
  id: dto.id,
  nameEn: dto.nameEn || "",
  nameAr: dto.nameAr || undefined,
  email: dto.email || undefined,
  phone: dto.phone || undefined,
  address: dto.address || undefined,
  taxNumber: dto.taxNumber || undefined,
  contactPerson: dto.contactPerson || undefined,
  website: dto.website || undefined,
  totalPurchases: dto.totalPurchases ?? 0,
  createdAt: dto.createdAt || new Date().toISOString(),
});

export const suppliersService = {
  getAll: async (): Promise<Supplier[]> => {
    const response = await getApiSuppliers({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapDto);
  },

  getById: async (id: string): Promise<Supplier> => {
    const response = await getApiSuppliersById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapDto(response.data);
  },

  create: async (payload: {
    nameEn: string;
    nameAr?: string;
    email?: string;
    phone?: string;
    address?: string;
    taxNumber?: string;
    contactPerson?: string;
    website?: string;
  }): Promise<Supplier> => {
    const response = await postApiSuppliers({
      client: swaggerApiClient,
      body: {
        request: {
          nameEn: payload.nameEn,
          nameAr: payload.nameAr,
          email: payload.email,
          phone: payload.phone,
          address: payload.address,
          taxNumber: payload.taxNumber,
          contactPerson: payload.contactPerson,
          website: payload.website,
        }
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapDto(response.data);
  },

  update: async (
    id: string,
    payload: Partial<Omit<Supplier, "id" | "totalPurchases" | "createdAt">>
  ): Promise<Supplier> => {
    const response = await putApiSuppliersById({
      client: swaggerApiClient,
      path: { id },
      body: {
        request: {
          nameEn: payload.nameEn,
          nameAr: payload.nameAr,
          email: payload.email,
          phone: payload.phone,
          address: payload.address,
          taxNumber: payload.taxNumber,
          contactPerson: payload.contactPerson,
          website: payload.website,
        }
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapDto(response.data);
  },

  delete: async (id: string): Promise<void> => {
    await deleteApiSuppliersById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
  },

  getPurchases: async (id: string): Promise<any[]> => {
    const response = await getApiSuppliersByIdPurchases({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
    return response.data;
  },
};
