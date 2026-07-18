import { 
  getApiUnits, 
  postApiUnits, 
  putApiUnitsById, 
  deleteApiUnitsById 
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";
import { Unit } from "../types/unit";

const mapUnitDto = (dto: any): Unit => ({
  id: dto.id,
  nameEn: dto.nameEn || "",
  nameAr: dto.nameAr || "",
  abbreviation: dto.symbol || "",
});

export const unitsService = {
  getAll: async (): Promise<Unit[]> => {
    const response = await getApiUnits({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapUnitDto);
  },

  create: async (unit: Omit<Unit, "id">): Promise<Unit> => {
    const response = await postApiUnits({
      client: swaggerApiClient,
      body: {
        request: {
          nameEn: unit.nameEn,
          nameAr: unit.nameAr,
          symbol: unit.abbreviation,
          type: "Piece",
          active: true,
        }
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapUnitDto((response as any)?.data ?? response);
  },

  update: async (id: string, unit: Omit<Unit, "id">): Promise<Unit> => {
    const response = await putApiUnitsById({
      client: swaggerApiClient,
      path: { id },
      body: {
        request: {
          nameEn: unit.nameEn,
          nameAr: unit.nameAr,
          symbol: unit.abbreviation,
          type: "Piece",
          active: true,
        }
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapUnitDto((response as any)?.data ?? response);
  },

  delete: async (id: string): Promise<void> => {
    await deleteApiUnitsById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
  },
};
