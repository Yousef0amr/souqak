export enum AppRole {
  admin = "admin",
  manager = "manager",
  cashier = "cashier",
  viewer = "viewer",
}

export function appRoleFromString(value: string): AppRole {
  switch (value.toLowerCase()) {
    case "admin":
      return AppRole.admin;
    case "manager":
      return AppRole.manager;
    case "cashier":
      return AppRole.cashier;
    case "viewer":
      return AppRole.viewer;
    default:
      return AppRole.cashier;
  }
}

export enum Permission {
  accessPos = "accessPos",
  accessDashboard = "accessDashboard",
  manageCatalog = "manageCatalog",
  manageInventory = "manageInventory",
  managePurchases = "managePurchases",
  manageSales = "manageSales",
  manageCustomers = "manageCustomers",
  manageSuppliers = "manageSuppliers",
  manageStores = "manageStores",
  manageExpenses = "manageExpenses",
  manageSettings = "manageSettings",
  manageUsers = "manageUsers",
  manageLicense = "manageLicense",
  viewReports = "viewReports",
  deleteProduct = "deleteProduct",
  deleteCategory = "deleteCategory",
  deleteBrand = "deleteBrand",
  voidSale = "voidSale",
  applyManualDiscount = "applyManualDiscount",
  overridePrice = "overridePrice",
  processReturn = "processReturn",
}

export const rolePermissions: Record<AppRole, Set<Permission>> = {
  [AppRole.admin]: new Set([
    Permission.accessPos,
    Permission.accessDashboard,
    Permission.manageCatalog,
    Permission.manageInventory,
    Permission.managePurchases,
    Permission.manageSales,
    Permission.manageCustomers,
    Permission.manageSuppliers,
    Permission.manageStores,
    Permission.manageExpenses,
    Permission.manageSettings,
    Permission.manageUsers,
    Permission.manageLicense,
    Permission.viewReports,
    Permission.deleteProduct,
    Permission.deleteCategory,
    Permission.deleteBrand,
    Permission.voidSale,
    Permission.applyManualDiscount,
    Permission.overridePrice,
    Permission.processReturn,
  ]),
  [AppRole.manager]: new Set([
    Permission.accessPos,
    Permission.accessDashboard,
    Permission.manageCatalog,
    Permission.manageInventory,
    Permission.managePurchases,
    Permission.manageSales,
    Permission.manageCustomers,
    Permission.manageSuppliers,
    Permission.manageStores,
    Permission.manageExpenses,
    Permission.manageSettings,
    Permission.viewReports,
    Permission.deleteProduct,
    Permission.deleteCategory,
    Permission.deleteBrand,
    Permission.applyManualDiscount,
    Permission.overridePrice,
    Permission.processReturn,
  ]),
  [AppRole.cashier]: new Set([
    Permission.accessPos,
    Permission.applyManualDiscount,
    Permission.processReturn,
  ]),
  [AppRole.viewer]: new Set([Permission.accessDashboard, Permission.viewReports]),
};

export function can(role: AppRole, permission: Permission): boolean {
  return rolePermissions[role]?.has(permission) ?? false;
}

export function roleCan(roleStr: string, permission: Permission): boolean {
  return can(appRoleFromString(roleStr), permission);
}
