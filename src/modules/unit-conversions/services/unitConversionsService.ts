import { axiosInstance } from "@/config/axiosInstance";

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
    const { data } = await axiosInstance.get<any[]>("/UnitConversions");
    return data.map(mapDto);
  },

  getById: async (id: string): Promise<UnitConversion> => {
    const { data } = await axiosInstance.get<any>(`/UnitConversions/${id}`);
    return mapDto(data);
  },

  create: async (payload: { fromUnitId: string; toUnitId: string; factor: number; active?: boolean }): Promise<UnitConversion> => {
    const { data } = await axiosInstance.post<any>("/UnitConversions", { request: payload });
    return mapDto(data);
  },

  update: async (id: string, payload: { fromUnitId?: string; toUnitId?: string; factor?: number; active?: boolean }): Promise<UnitConversion> => {
    const { data } = await axiosInstance.put<any>(`/UnitConversions/${id}`, { id, request: payload });
    return mapDto(data);
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/UnitConversions/${id}`);
  },
};
