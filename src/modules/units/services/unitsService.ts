import { axiosInstance } from "@/config/axiosInstance";
import { UnitDto, CreateUnitCommand, UpdateUnitCommand } from "../types/unit";

export const unitsService = {
  getAll: async (): Promise<UnitDto[]> => {
    const { data } = await axiosInstance.get<UnitDto[]>("/Units");
    return data;
  },

  getById: async (id: string): Promise<UnitDto> => {
    const { data } = await axiosInstance.get<UnitDto>(`/Units/${id}`);
    return data;
  },

  create: async (unit: CreateUnitCommand): Promise<UnitDto> => {
    const { data } = await axiosInstance.post<UnitDto>("/Units", unit);
    return data;
  },

  update: async (id: string, command: UpdateUnitCommand): Promise<UnitDto> => {
    const { data } = await axiosInstance.put<UnitDto>(`/Units/${id}`, command);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/Units/${id}`);
  },
};
