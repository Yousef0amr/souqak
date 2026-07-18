import {
  deleteApiStoresById,
  getApiMyStores,
  getApiStores,
  getApiStoresById,
  postApiStores,
  postApiStoresByStoreIdUsersByUserId,
  putApiStoresById,
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";
import type { StoreDto } from "@/config/swagger-apis/types.gen";

export interface CreateStoreInput {
  name: string;
  nameAr?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxNumber?: string;
  logoUrl?: string | File | null;
  currency?: string;
  active: boolean;
}

export interface UpdateStoreInput extends CreateStoreInput {}

const fileToBase64 = async (file: File | string | null | undefined): Promise<string | undefined> => {
  if (!file) return undefined;
  if (typeof file === "string") return file;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const mapStoreDto = (dto: StoreDto) => ({
  id: dto.id || "",
  name: dto.name || "",
  nameAr: dto.nameAr || "",
  email: dto.email || "",
  phone: dto.phone || "",
  address: dto.address || "",
  taxNumber: dto.taxNumber || "",
  logoUrl: dto.logoUrl || "",
  currency: dto.currency || "",
  active: dto.active ?? true,
  createdAt: dto.createdAt || new Date().toISOString(),
});

export const storesService = {
  getAll: async () => {
    const response = await getApiStores({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapStoreDto);
  },

  getMyStores: async () => {
    const response = await getApiMyStores({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapStoreDto);
  },

  getById: async (id: string) => {
    const response = await getApiStoresById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapStoreDto(response as any);
  },

  create: async (input: CreateStoreInput) => {
    const base64Logo = await fileToBase64(input.logoUrl);
    const response = await postApiStores({
      client: swaggerApiClient,
      body: {
        request: {
          name: input.name,
          nameAr: input.nameAr,
          email: input.email,
          phone: input.phone,
          address: input.address,
          taxNumber: input.taxNumber,
          logoUrl: base64Logo,
          currency: input.currency,
        },
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapStoreDto(response as any);
  },

  update: async (id: string, input: UpdateStoreInput) => {
    const base64Logo = await fileToBase64(input.logoUrl);
    const response = await putApiStoresById({
      client: swaggerApiClient,
      path: { id },
      body: {
        request: {
          name: input.name,
          nameAr: input.nameAr,
          email: input.email,
          phone: input.phone,
          address: input.address,
          taxNumber: input.taxNumber,
          logoUrl: base64Logo,
          currency: input.currency,
        },
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapStoreDto(response as any);
  },

  delete: async (id: string) => {
    await deleteApiStoresById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
  },

  assignUser: async (storeId: string, userId: string, role: string) => {
    const response = await postApiStoresByStoreIdUsersByUserId({
      client: swaggerApiClient,
      path: { storeId, userId },
      body: {
        storeId,
        userId,
        role: role as any,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return response.data;
  },
};
