"use client";

import React, { useMemo, useState } from "react";
import { useRoles, usePermissions, useUpdateRolePermission } from "../../hooks/useRoles";
import { Switch } from "@/common/forms/switch";
import { ShieldCheck, Loader2, KeyRound, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { Badge } from "@/common/shared/badge";
import { Permission, Role } from "../../types/role";
import { cn } from "@/config/shadcnUtils";
import { useModalStore } from "@/shared/stores/DynamicModalStore";

export function PermissionsMatrix() {
  const { data: roles = [], isLoading: isLoadingRoles } = useRoles();
  const { data: permissions = [], isLoading: isLoadingPerms } = usePermissions();
  const { mutate: updatePermission, isPending } = useUpdateRolePermission();
  
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  // Group permissions by module
  const groupedPermissions = useMemo(() => {
    const map = new Map<string, Permission[]>();
    permissions.forEach(p => {
      const group = map.get(p.module) || [];
      group.push(p);
      map.set(p.module, group);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [permissions]);

  if (isLoadingRoles || isLoadingPerms) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-muted-foreground bg-muted/10 rounded-xl border border-dashed">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-indigo-500" />
        <p className="font-medium">Loading security policies...</p>
      </div>
    );
  }

  // Auto-select first role
  const activeRoleId = selectedRoleId || (roles.length > 0 ? roles[0].id : null);
  const activeRole = roles.find(r => r.id === activeRoleId);
  const isAdmin = activeRole?.name.toLowerCase() === "administrator" || activeRole?.name.toLowerCase() === "admin";

  const handleToggle = (permissionId: string, enabled: boolean) => {
    if (activeRole && !isAdmin) {
      updatePermission({ role: activeRole, permissionId, enabled });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[600px]">
      {/* LEFT PANE: Roles List */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1">
          Select Role
        </h4>
        <div className="space-y-1.5 overflow-y-auto pr-1 pb-4">
          {roles.map(role => {
            const isActive = role.id === activeRoleId;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={cn(
                  "w-full flex flex-col items-start text-left px-4 py-3 rounded-xl transition-all duration-200 border",
                  isActive 
                    ? "bg-indigo-500/10 border-indigo-500/30 shadow-sm ring-1 ring-indigo-500/50" 
                    : "bg-card border-transparent hover:bg-muted/50 hover:border-border"
                )}
              >
                <div className="flex justify-between items-center w-full mb-1">
                  <span className={cn("font-semibold text-sm", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-foreground")}>
                    {role.name}
                  </span>
                  {role.isSystem && (
                    <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0 h-4 border-none", isActive ? "bg-indigo-500/20 text-indigo-600" : "bg-muted text-muted-foreground")}>
                      System
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground line-clamp-1">{role.description || "No description"}</span>
              </button>
            );
          })}
        </div>
        
        <div className="mt-auto pt-2">
          <button
            onClick={() => {
              useModalStore.getState().openModal({
                componentName: "create-role-form",
                modalTitle: "Create New Role",
                mode: "dialog",
              });
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-indigo-500/50 text-indigo-600 hover:bg-indigo-500/10 rounded-xl transition-colors text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Create Custom Role
          </button>
        </div>
      </div>

      {/* RIGHT PANE: Permissions */}
      <div className="flex-1 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">
        {activeRole ? (
          <>
            {/* Header */}
            <div className="px-6 py-5 border-b bg-muted/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-indigo-500" />
                  {activeRole.name} Permissions
                  <button 
                    onClick={() => {
                      useModalStore.getState().openModal({
                        componentName: "edit-role-form",
                        modalTitle: `Edit ${activeRole.name} Details`,
                        extraProps: { role: activeRole },
                        mode: "dialog",
                      });
                    }}
                    className="ml-2 p-1.5 text-muted-foreground hover:text-indigo-600 hover:bg-indigo-500/10 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                  </button>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {isAdmin 
                    ? "Administrators have unrestricted access to all system modules."
                    : "Configure access levels and module features for this role."}
                </p>
              </div>
              
              {isAdmin && (
                <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 px-3 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> All Access Granted
                </Badge>
              )}
            </div>

            {/* Permissions List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {groupedPermissions.map(([moduleName, modulePerms]) => {
                // Calculate how many permissions are active in this group
                const activeCount = modulePerms.filter(p => isAdmin || activeRole.permissions.includes(p.id)).length;
                
                return (
                  <div key={moduleName} className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        {moduleName}
                      </h4>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {activeCount} / {modulePerms.length} Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                      {modulePerms.map(perm => {
                        const hasPerm = isAdmin || activeRole.permissions.includes(perm.id);
                        return (
                          <div 
                            key={perm.id} 
                            className={cn(
                              "flex items-start justify-between gap-4 p-4 rounded-xl border transition-all duration-200",
                              hasPerm ? "bg-card border-border shadow-sm" : "bg-muted/30 border-dashed opacity-75 grayscale-[0.2]"
                            )}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={cn("font-semibold text-sm", hasPerm ? "text-foreground" : "text-muted-foreground")}>
                                  {perm.name}
                                </span>
                                {hasPerm && !isAdmin && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {perm.description || `Allows user to access ${perm.name.toLowerCase()} features.`}
                              </p>
                            </div>
                            
                            <div className="shrink-0 mt-0.5">
                              <Switch
                                checked={hasPerm}
                                onCheckedChange={(checked) => handleToggle(perm.id, checked)}
                                disabled={isPending || isAdmin}
                                className="data-[state=checked]:bg-emerald-500"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground p-12">
            <div className="text-center max-w-sm">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Select a role from the left to view and configure its permissions.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
