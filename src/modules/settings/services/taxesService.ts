import { 
  getApiTaxes, 
  postApiTaxes, 
  putApiTaxesById, 
  deleteApiTaxesById 
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";
import { Tax } from "../types/tax";

const mapTaxDto = (dto: any): Tax => ({
  id: dto.id,
  name: dto.nameEn || dto.nameAr || "",
  rate: dto.value ?? 0,
});

export const taxesService = {
  getAll: async (): Promise<Tax[]> => {
    const response = await getApiTaxes({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapTaxDto);
  },

  create: async (tax: Omit<Tax, "id">): Promise<Tax> => {
    const response = await postApiTaxes({
      client: swaggerApiClient,
      body: {
        request: {
          nameEn: tax.name,
          nameAr: tax.name,
          type: "Percentage",
          value: tax.rate,
          active: true,
          isDefault: false,
        }
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapTaxDto((response as any)?.data ?? response);
  },

  update: async (id: string, tax: Omit<Tax, "id">): Promise<Tax> => {
    const response = await putApiTaxesById({
      client: swaggerApiClient,
      path: { id },
      body: {
        request: {
          nameEn: tax.name,
          nameAr: tax.name,
          type: "Percentage",
          value: tax.rate,
          active: true,
          isDefault: false,
        }
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapTaxDto((response as any)?.data ?? response);
  },

  delete: async (id: string): Promise<void> => {
    await deleteApiTaxesById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
  },
};
