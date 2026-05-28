import { axiosInstance } from "@/config/axiosInstance";
import { TaxDto, CreateTaxCommand, UpdateTaxCommand } from "../types/tax";

export const taxesService = {
  getAll: async (): Promise<TaxDto[]> => {
    const { data } = await axiosInstance.get<TaxDto[]>("/Taxes");
    return data;
  },

  getById: async (id: string): Promise<TaxDto> => {
    const { data } = await axiosInstance.get<TaxDto>(`/Taxes/${id}`);
    return data;
  },

  create: async (tax: CreateTaxCommand): Promise<TaxDto> => {
    const { data } = await axiosInstance.post<TaxDto>("/Taxes", tax);
    return data;
  },

  update: async (id: string, command: UpdateTaxCommand): Promise<TaxDto> => {
    const { data } = await axiosInstance.put<TaxDto>(`/Taxes/${id}`, command);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/Taxes/${id}`);
  },
};
