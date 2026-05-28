import { axiosInstance } from "@/config/axiosInstance";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
}

const mapDto = (dto: any): User => ({
  id: dto.id,
  name: dto.name || "",
  email: dto.email || "",
  role: dto.role || "Staff",
  active: dto.active ?? true,
  createdAt: dto.createdAt || new Date().toISOString(),
});

export const usersService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await axiosInstance.get<any[]>("/Users");
    return data.map(mapDto);
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await axiosInstance.get<any>(`/Users/${id}`);
    return mapDto(data);
  },

  create: async (payload: { name: string; email: string; password: string; role: string }): Promise<User> => {
    const { data } = await axiosInstance.post<any>("/Users", payload);
    return mapDto(data);
  },

  update: async (id: string, payload: { name?: string; email?: string; role?: string; active?: boolean }): Promise<User> => {
    const { data } = await axiosInstance.put<any>(`/Users/${id}`, { id, ...payload });
    return mapDto(data);
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/Users/${id}`);
  },

  changePassword: async (payload: { oldPassword: string; newPassword: string; confirmPassword: string }): Promise<void> => {
    await axiosInstance.post("/Users/change-password", payload);
  },
};
