import { Permission } from "@/types/permission";

export const routePermissions: Record<string, Permission> = {
  "/dashboard": Permission.accessDashboard,
  "/dashboard/analytics": Permission.viewReports,
  "/dashboard/pos": Permission.accessPos,
  "/dashboard/products": Permission.manageCatalog,
  "/dashboard/categories": Permission.manageCatalog,
  "/dashboard/brands": Permission.manageCatalog,
  "/dashboard/units": Permission.manageCatalog,
  "/dashboard/modifiers": Permission.manageCatalog,
  "/dashboard/taxes": Permission.manageCatalog,
  "/dashboard/discounts": Permission.manageCatalog,
  "/dashboard/coupons": Permission.manageCatalog,
  "/dashboard/offers": Permission.manageCatalog,
  "/dashboard/loyalty": Permission.manageCatalog,
  "/dashboard/inventory": Permission.manageInventory,
  "/dashboard/purchases": Permission.managePurchases,
  "/dashboard/purchase-invoices": Permission.managePurchases,
  "/dashboard/purchase-orders": Permission.managePurchases,
  "/dashboard/expenses": Permission.manageExpenses,
  "/dashboard/sales": Permission.manageSales,
  "/dashboard/invoices": Permission.manageSales,
  "/dashboard/sales-orders": Permission.manageSales,
  "/dashboard/orders": Permission.manageSales,
  "/dashboard/receipts": Permission.manageSales,
  "/dashboard/customers": Permission.manageCustomers,
  "/dashboard/suppliers": Permission.manageSuppliers,
  "/dashboard/stores": Permission.manageStores,
  "/dashboard/warehouses": Permission.manageStores,
  "/dashboard/reports": Permission.viewReports,
  "/dashboard/settings": Permission.manageSettings,
  "/dashboard/users": Permission.manageUsers,
  "/dashboard/security": Permission.manageSettings,
  "/dashboard/integrations": Permission.manageSettings,
  "/dashboard/tables": Permission.accessPos,
  "/dashboard/shipping": Permission.manageSales,
  "/dashboard/marketing": Permission.manageSales,
  "/dashboard/expense-categories": Permission.manageExpenses,
  "/dashboard/unit-conversions": Permission.manageCatalog,
};

export function requiredPermission(path: string): Permission | null {
  const normalized = path.split("?")[0].replace(/\/+$/, "");
  const exact = routePermissions[normalized];
  if (exact) return exact;

  for (const [pattern, permission] of Object.entries(routePermissions)) {
    if (normalized.startsWith(pattern + "/") || normalized.startsWith(pattern + "?")) {
      return permission;
    }
  }
  return null;
}
