import React from "react";
import { Badge } from "@/common/shared/badge";
import { AuditLog } from "../../types/auditLog";

export default function AuditLogDetailsModal({ log }: { log: AuditLog }) {
  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "create": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400";
      case "update": return "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400";
      case "delete": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400";
      default: return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  if (!log) return null;

  return (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/30 p-4 rounded-lg">
        <div>
          <p className="text-xs text-muted-foreground font-semibold mb-1">Action</p>
          <Badge variant="outline" className={`capitalize ${getActionColor(log.action)} border-none`}>
            {log.action}
          </Badge>
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-semibold mb-1">Entity</p>
          <p className="font-medium text-sm">{log.entityName}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-semibold mb-1">IP Address</p>
          <p className="text-sm font-mono">{log.ipAddress || "N/A"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-semibold mb-1">Date</p>
          <p className="text-sm">
            {new Date(log.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground font-semibold mb-2">User ID</p>
        <code className="text-sm bg-muted px-2 py-1 rounded">{log.userId}</code>
      </div>
      
      <div>
        <p className="text-xs text-muted-foreground font-semibold mb-2">Entity ID</p>
        <code className="text-sm bg-muted px-2 py-1 rounded">{log.entityId}</code>
      </div>

      {(log.oldValues || log.newValues) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold flex items-center text-rose-500">
              Old Values
            </p>
            <pre className="bg-rose-500/10 text-rose-700 dark:text-rose-400 p-3 rounded-lg text-xs overflow-auto max-h-60 border border-rose-500/20">
              {log.oldValues ? JSON.stringify(JSON.parse(log.oldValues), null, 2) : "None"}
            </pre>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-semibold flex items-center text-emerald-500">
              New Values
            </p>
            <pre className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 p-3 rounded-lg text-xs overflow-auto max-h-60 border border-emerald-500/20">
              {log.newValues ? JSON.stringify(JSON.parse(log.newValues), null, 2) : "None"}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
