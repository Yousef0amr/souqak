import {
  deleteApiUnitConversionsById,
  getApiUnitConversions,
  postApiUnitConversions,
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";

export interface UnitConversion {
  id: string;
  fromUnitId: string;
  fromUnitSymbol: string;
  toUnitId: string;
  toUnitSymbol: string;
  factor: number;
  active: boolean;
  createdAt: string;
}

const mapDto = (dto: any): UnitConversion => ({
  id: dto.id,
  fromUnitId: dto.fromUnitId,
  fromUnitSymbol: dto.fromUnitSymbol || "",
  toUnitId: dto.toUnitId,
  toUnitSymbol: dto.toUnitSymbol || "",
  factor: dto.factor ?? 1,
  active: dto.active ?? true,
  createdAt: dto.createdAt || new Date().toISOString(),
});

export const unitConversionsService = {
  getAll: async (): Promise<UnitConversion[]> => {
    const response = await getApiUnitConversions({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapDto);
  },



  create: async (payload: { fromUnitId: string; toUnitId: string; factor: number; active?: boolean }): Promise<UnitConversion> => {
    const response = await postApiUnitConversions({
      client: swaggerApiClient,
      body: { request: { fromUnitId: payload.fromUnitId,
        toUnitId: payload.toUnitId,
        factor: payload.factor,
        active: payload.active } },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapDto(response.data);
  },



  delete: async (id: string): Promise<void> => {
    await deleteApiUnitConversionsById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
  },

  update: async (id: string, payload: any): Promise<UnitConversion> => {
    // Implement update logic
    console.warn("Update not implemented for unit conversions");
    return {} as any;
  },
};
