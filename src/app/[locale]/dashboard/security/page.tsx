import React from "react";
import { ShieldCheck, UserCheck, Shield, Key } from "lucide-react";
import { Badge } from "@/common/shared/badge";

const AUDIT_LOGS = [
  { id: "log1", user: "Admin (Yousef)", action: "Created product SGS24U-TG-512", time: "2026-05-23 00:15", ip: "192.168.1.45" },
  { id: "log2", user: "Cashier (Sarah)", action: "Logged customer John Doe payout", time: "2026-05-22 18:45", ip: "192.168.1.102" },
  { id: "log3", user: "Manager (Amine)", action: "Adjusted stock level for Logitech MX Master 3S (+10)", time: "2026-05-22 14:30", ip: "192.168.1.12" },
];

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border bg-card text-card-foreground p-4">
            <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-500" />
              Live Audit Trails
            </h3>
            <div className="space-y-3.5">
              {AUDIT_LOGS.map((log) => (
                <div key={log.id} className="flex justify-between items-center py-2 border-b last:border-0 border-border text-sm">
                  <div>
                    <div className="font-semibold text-foreground">{log.action}</div>
                    <div className="text-muted-foreground text-xs">
                      Executed by <span className="underline font-semibold">{log.user}</span> • {log.ip}
                    </div>
                  </div>
                  <span className="text-muted-foreground text-xs whitespace-nowrap ml-4">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground p-4">
          <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
            <Key className="h-5 w-5 text-indigo-500" />
            Roles & Keys
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2.5 rounded-lg border border-border">
              <span className="font-semibold text-sm">Administrator</span>
              <Badge>Full Access</Badge>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg border border-border">
              <span className="font-semibold text-sm">Store Manager</span>
              <Badge variant="secondary">Catalog & Billing</Badge>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg border border-border">
              <span className="font-semibold text-sm">Cashier Operator</span>
              <Badge variant="outline">POS Checkout Only</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
