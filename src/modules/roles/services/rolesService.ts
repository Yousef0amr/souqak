import { Role, Permission, UpdateRolePermissionsPayload } from "../types/role";
import { axiosInstance } from "@/config/axiosInstance";

export const rolesService = {
  getRoles: async (): Promise<Role[]> => {
    const { data } = await axiosInstance.get("/Roles");
    
    let rawRoles = null;
    if (Array.isArray(data)) rawRoles = data;
    else if (Array.isArray(data?.data)) rawRoles = data.data;
    else if (Array.isArray(data?.items)) rawRoles = data.items;
    else if (Array.isArray(data?.value)) rawRoles = data.value;
    else if (Array.isArray(data?.results)) rawRoles = data.results;
    else if (Array.isArray(data?.roles)) rawRoles = data.roles;
    
    if (!rawRoles) throw new Error("Could not find array in roles response");

    return rawRoles.map((r: any) => ({
      id: r.id || r.Id,
      name: r.name || r.Name,
      description: r.description || r.Description || "",
      isCustom: r.isCustom ?? r.IsCustom ?? false,
      isSystem: r.isSystem ?? r.IsSystem ?? false,
      active: r.active ?? r.Active ?? true,
      permissions: r.permissions || r.Permissions || [],
    }));
  },

  getPermissions: async (): Promise<Permission[]> => {
    const { data } = await axiosInstance.get("/Permissions");
    
    let rawPerms = null;
    if (Array.isArray(data)) rawPerms = data;
    else if (Array.isArray(data?.data)) rawPerms = data.data;
    else if (Array.isArray(data?.items)) rawPerms = data.items;
    else if (Array.isArray(data?.value)) rawPerms = data.value;
    else if (Array.isArray(data?.results)) rawPerms = data.results;
    else if (Array.isArray(data?.permissions)) rawPerms = data.permissions;
    
    if (!rawPerms) throw new Error("Could not find array in permissions response");

    return rawPerms.map((p: any) => ({
      id: p.id || p.Id || p.key || p.Key || p.code || p.Code,
      name: p.name || p.Name || p.title || p.Title || p.displayName || p.DisplayName,
      description: p.description || p.Description || "",
      module: p.module || p.Module || p.group || p.Group || p.category || p.Category || "General",
    }));
  },

  updateRolePermission: async (payload: UpdateRolePermissionsPayload): Promise<Role> => {
    const role = payload.role;
    const hasPerm = role.permissions.includes(payload.permissionId);
    let newPermissions = [...role.permissions];
    
    if (payload.enabled && !hasPerm) {
      newPermissions.push(payload.permissionId);
    } else if (!payload.enabled && hasPerm) {
      newPermissions = newPermissions.filter(id => id !== payload.permissionId);
    }

    // The API expects the full role object to be PUT to /Roles/{id}
    const updatePayload = {
      id: role.id,
      name: role.name,
      description: role.description,
      isCustom: role.isCustom,
      isSystem: role.isSystem,
      permissions: newPermissions
    };

    const { data } = await axiosInstance.put(`/Roles/${role.id}`, updatePayload);
    
    const safeData = data?.data || data;
    if (safeData && safeData.id) {
      return {
        id: safeData.id || safeData.Id,
        name: safeData.name || safeData.Name,
        description: safeData.description || safeData.Description || "",
        isCustom: safeData.isCustom ?? safeData.IsCustom ?? false,
        isSystem: safeData.isSystem ?? safeData.IsSystem ?? false,
        permissions: safeData.permissions || safeData.Permissions || [],
      };
    }
    
    return { ...role, permissions: newPermissions };
  },

  updateRole: async (payload: { id: string; name: string; description: string; isSystem?: boolean; isCustom?: boolean; active?: boolean; permissions: string[] }): Promise<Role> => {
    const { data } = await axiosInstance.put(`/Roles/${payload.id}`, payload);
    
    const safeData = data?.data || data;
    if (safeData && safeData.id) {
      return {
        id: safeData.id || safeData.Id,
        name: safeData.name || safeData.Name,
        description: safeData.description || safeData.Description || "",
        isCustom: safeData.isCustom ?? safeData.IsCustom ?? false,
        isSystem: safeData.isSystem ?? safeData.IsSystem ?? false,
        active: safeData.active ?? safeData.Active ?? true,
        permissions: safeData.permissions || safeData.Permissions || [],
      };
    }
    
    return { ...payload, isCustom: payload.isCustom ?? false, active: payload.active ?? true } as Role;
  },

  createRole: async (payload: { name: string; description: string; isSystem?: boolean; active?: boolean; permissions: string[] }): Promise<Role> => {
    // Wrapped in 'request' to fix "The Request field is required" 400 Bad Request
    const requestPayload = {
      request: {
        name: payload.name,
        description: payload.description,
        isCustom: true,
        permissions: payload.permissions,
      }
    };
    
    const { data } = await axiosInstance.post("/Roles", requestPayload);
    
    const safeData = data?.data || data;
    return {
      id: safeData.id || safeData.Id || Math.random().toString(),
      name: safeData.name || safeData.Name || payload.name,
      description: safeData.description || safeData.Description || payload.description,
      isCustom: safeData.isCustom ?? safeData.IsCustom ?? true,
      isSystem: safeData.isSystem ?? safeData.IsSystem ?? false,
      active: safeData.active ?? safeData.Active ?? true,
      permissions: safeData.permissions || safeData.Permissions || payload.permissions,
    };
  }
};
