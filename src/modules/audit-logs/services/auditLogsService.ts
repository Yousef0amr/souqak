import { axiosInstance } from "@/config/axiosInstance";
import { AuditLog } from "../types/auditLog";

const mapAuditLogDto = (dto: any): AuditLog => ({
  id: dto.id || dto.Id || Math.random().toString(),
  userId: dto.userId || dto.UserId || "Unknown",
  action: dto.action || dto.Action || "Unknown Action",
  entityName: dto.entityName || dto.EntityName || "System",
  entityId: dto.entityId || dto.EntityId || "",
  oldValues: dto.oldValues || dto.OldValues || "",
  newValues: dto.newValues || dto.NewValues || "",
  ipAddress: dto.ipAddress || dto.IpAddress || "Unknown IP",
  createdAt: dto.createdAt || dto.CreatedAt || new Date().toISOString(),
});

export const auditLogsService = {
  getAuditLogs: async (page = 1, pageSize = 10): Promise<{ data: AuditLog[], totalCount: number }> => {
    // Send both common naming conventions just to be safe with the backend
    const { data } = await axiosInstance.get(`/AuditLogs?PageNumber=${page}&PageSize=${pageSize}&page=${page}&limit=${pageSize}`);
    
    const rawLogs = Array.isArray(data) ? data : data?.data || data?.items || data?.value || [];
    const totalCount = data?.totalCount || data?.TotalCount || data?.total || rawLogs.length;

    return {
      data: rawLogs.map(mapAuditLogDto),
      totalCount
    };
  },

  getAuditLogById: async (id: string): Promise<AuditLog> => {
    const { data } = await axiosInstance.get(`/AuditLogs/${id}`);
    const safeData = data?.data || data;
    return mapAuditLogDto(safeData);
  },
};
