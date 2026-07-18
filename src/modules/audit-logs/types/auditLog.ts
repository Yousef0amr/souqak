export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entityName: string;
  entityId: string;
  oldValues: string;
  newValues: string;
  ipAddress: string;
  createdAt: string;
}
