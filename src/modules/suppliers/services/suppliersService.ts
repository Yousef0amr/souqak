import { axiosInstance } from "@/config/axiosInstance";

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
    const { data } = await axiosInstance.get<any[]>("/Suppliers");
    return data.map(mapDto);
  },

  getById: async (id: string): Promise<Supplier> => {
    const { data } = await axiosInstance.get<any>(`/Suppliers/${id}`);
    return mapDto(data);
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
    const { data } = await axiosInstance.post<any>("/Suppliers", { request: payload });
    return mapDto(data);
  },

  update: async (
    id: string,
    payload: Partial<Omit<Supplier, "id" | "totalPurchases" | "createdAt">>
  ): Promise<Supplier> => {
    const { data } = await axiosInstance.put<any>(`/Suppliers/${id}`, { id, request: payload });
    return mapDto(data);
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/Suppliers/${id}`);
  },

  getPurchases: async (id: string): Promise<any[]> => {
    const { data } = await axiosInstance.get<any[]>(`/Suppliers/${id}/purchases`);
    return data.map(mapDto);
  },
};
