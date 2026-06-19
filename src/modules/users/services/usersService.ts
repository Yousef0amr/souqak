import {
  deleteApiUsersById,
  getApiUsers,
  getApiUsersById,
  postApiUsers,
  postApiUsersChangePassword,
  putApiUsersById,
} from "@/config/swagger-apis";
import { swaggerApiClient } from "@/config/swagger-apis/swaggerApiClient";

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
    const response = await getApiUsers({
      client: swaggerApiClient,
      responseStyle: "data",
      throwOnError: true,
    });
    return (Array.isArray(response) ? response : ((response as any)?.data ?? [])).map(mapDto);
  },

  getById: async (id: string): Promise<User> => {
    const response = await getApiUsersById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapDto(response.data);
  },

  create: async (payload: { name: string; email: string; password: string; role: string }): Promise<User> => {
    const response = await postApiUsers({
      client: swaggerApiClient,
      body: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapDto(response.data);
  },

  update: async (id: string, payload: { name?: string; email?: string; role?: string; active?: boolean }): Promise<User> => {
    const response = await putApiUsersById({
      client: swaggerApiClient,
      path: { id },
      body: {
        name: payload.name,
        email: payload.email,
        role: payload.role,
        active: payload.active,
      },
      responseStyle: "data",
      throwOnError: true,
    });
    return mapDto(response.data);
  },

  delete: async (id: string): Promise<void> => {
    await deleteApiUsersById({
      client: swaggerApiClient,
      path: { id },
      responseStyle: "data",
      throwOnError: true,
    });
  },

  changePassword: async (payload: { oldPassword: string; newPassword: string; confirmPassword: string }): Promise<void> => {
    await postApiUsersChangePassword({
      client: swaggerApiClient,
      body: {
        currentPassword: payload.oldPassword,
        newPassword: payload.newPassword,
      },
      responseStyle: "data",
      throwOnError: true,
    });
  },
};
