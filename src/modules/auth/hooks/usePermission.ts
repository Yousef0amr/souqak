"use client";

import { useUserStore } from "../stores/useUserStore";
import { Permission, can, appRoleFromString } from "@/types/permission";

export function usePermission() {
  const user = useUserStore((state) => state.user);
  const role = appRoleFromString(user?.role ?? "cashier");

  return {
    role,
    can: (permission: Permission) => can(role, permission),
    isAdmin: role === "admin",
    isManager: role === "manager",
    isCashier: role === "cashier",
    isViewer: role === "viewer",
  };
}
