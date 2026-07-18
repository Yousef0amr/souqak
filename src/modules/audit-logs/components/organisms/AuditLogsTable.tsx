"use client";

import React, { useState, useMemo } from "react";
import { DataTable } from "@/common/tables/DataTable";
import { Input } from "@/common/forms/input";
import { Search } from "lucide-react";
import { useAuditLogs } from "../../hooks/useAuditLogs";
import type { AuditLog } from "../../types/auditLog";
import { VisibilityState } from "@tanstack/react-table";
import PaginationWithPerPage from "@/shared/components/PaginationWithPerPage";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { getAuditLogColumns } from "./AuditLogsColumns";

export function AuditLogsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  });

  const { data: queryData, isLoading } = useAuditLogs(page, pageSize);
  
  const auditLogs = queryData?.data || [];
  const totalCount = queryData?.totalCount || 0;

  const filteredLogs = auditLogs.filter((log: AuditLog) =>
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.userId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { openModal } = useModalStore();

  const handleViewLog = (log: AuditLog) => {
    openModal({
      componentName: "audit-log-details",
      modalTitle: "Audit Log Details",
      extraProps: { log },
      mode: "dialog",
    });
  };

  const columns = useMemo(() => getAuditLogColumns(handleViewLog), [openModal]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 max-w-sm w-full relative">
          <Search className="h-4 w-4 text-muted-foreground absolute left-3" />
          <Input
            placeholder="Search by action, entity, or user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 flex flex-col gap-4">
        <DataTable
          data={filteredLogs}
          columns={columns}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          isLoading={isLoading}
        />
        
        {totalCount > 0 && (
          <div className="px-2 pb-2">
            <PaginationWithPerPage
              total={totalCount}
              perPage={pageSize}
              fixedPerPage={5}
              currentPage={page}
              onPageChange={(p) => setPage(p)}
              onPerPageChange={(size, newPage) => {
                setPageSize(size);
                setPage(newPage);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
