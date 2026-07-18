import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";
import { Eye } from "lucide-react";
import { AuditLog } from "../../types/auditLog";

export const getActionColor = (action: string) => {
  switch (action.toLowerCase()) {
    case "create": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400";
    case "update": return "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400";
    case "delete": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400";
    default: return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
  }
};

export const getAuditLogColumns = (
  onViewLog: (log: AuditLog) => void
): ColumnDef<AuditLog>[] => [
  {
    accessorKey: "id",
    header: "Log ID",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <Badge variant="outline" className={`capitalize font-semibold ${getActionColor(row.original.action)} border-none`}>
        {row.original.action}
      </Badge>
    ),
  },
  {
    accessorKey: "entityName",
    header: "Entity",
    cell: ({ row }) => <span className="font-medium">{row.original.entityName}</span>,
  },
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm font-mono truncate max-w-[120px] block">
        {row.original.userId}
      </span>
    ),
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.ipAddress}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="flex flex-col">
          <span className="text-sm">{date.toLocaleDateString()}</span>
          <span className="text-xs text-muted-foreground">{date.toLocaleTimeString()}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "View",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onViewLog(row.original)}>
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
];
