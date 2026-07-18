"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "@/config/i18n/navigation";
import { useUserStore } from "@/modules/auth/stores/useUserStore";
import { requiredPermission } from "@/config/route-guard";
import { roleCan } from "@/types/permission";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const role = user?.role ?? "cashier";

  useEffect(() => {
    const permission = requiredPermission(pathname);
    if (permission && !roleCan(role, permission)) {
      router.replace("/dashboard");
    }
  }, [pathname, role, router]);

  return <>{children}</>;
}
