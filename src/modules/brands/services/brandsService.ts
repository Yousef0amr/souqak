import { axiosInstance } from "@/config/axiosInstance";
import { BrandDto, CreateBrandCommand, UpdateBrandCommand } from "../types/brand";

export const brandsService = {
  getAll: async (): Promise<BrandDto[]> => {
    const { data } = await axiosInstance.get<BrandDto[]>("/Brands");
    return data;
  },

  getById: async (id: string): Promise<BrandDto> => {
    const { data } = await axiosInstance.get<BrandDto>(`/Brands/${id}`);
    return data;
  },

  create: async (brand: CreateBrandCommand): Promise<BrandDto> => {
    const { data } = await axiosInstance.post<BrandDto>("/Brands", brand);
    return data;
  },

  update: async (id: string, command: UpdateBrandCommand): Promise<BrandDto> => {
    const { data } = await axiosInstance.put<BrandDto>(`/Brands/${id}`, command);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/Brands/${id}`);
  },
};
