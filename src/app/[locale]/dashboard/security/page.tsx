import React from "react";
import { ShieldCheck, UserCheck, Shield, Key } from "lucide-react";
import { Badge } from "@/common/shared/badge";
import { AuditLogsTable } from "@/modules/audit-logs";
import { PermissionsMatrix } from "@/modules/roles";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security & Permissions</h1>
        <p className="text-muted-foreground">
          Audit database security, configure employee permissions, and examine system access logs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card text-card-foreground rounded-lg border p-4 flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-md text-indigo-500">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Active Operators</p>
            <p className="text-lg font-bold">3 Store Accounts</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card text-card-foreground p-4">
          <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
            <Key className="h-5 w-5 text-indigo-500" />
            Roles & Permissions Matrix
          </h3>
          <PermissionsMatrix />
        </div>

        <div className="rounded-lg border bg-card text-card-foreground p-4">
          <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-500" />
            Live Audit Trails
          </h3>
          <AuditLogsTable />
        </div>
      </div>
    </div>
  );
}
