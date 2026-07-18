import { useQuery } from "@tanstack/react-query";
import { auditLogsService } from "../services/auditLogsService";

export function useAuditLogs(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["auditLogs", page, pageSize],
    queryFn: () => auditLogsService.getAuditLogs(page, pageSize),
  });
}

export function useAuditLog(id: string) {
  return useQuery({
    queryKey: ["auditLogs", id],
    queryFn: () => auditLogsService.getAuditLogById(id),
    enabled: !!id,
  });
}
