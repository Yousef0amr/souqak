// ─── Subscription Plans ───────────────────────────────────────────────────────
// Single source of truth for plan definitions and feature gating.

export type PlanId = "free" | "starter" | "professional" | "enterprise";

export type PlanFeature =
  // POS core
  | "pos_terminal"
  | "barcode_scanner"
  | "receipt_printing"
  | "decimal_quantities"
  | "order_notes"
  | "order_discount"
  | "split_payment"
  | "hold_orders"
  | "custom_discount"
  // Products
  | "unlimited_products"
  | "product_images"
  | "product_variants"
  | "bulk_import"
  | "barcode_generator"
  // Units & taxes
  | "unit_management"
  | "unit_conversions"
  | "tax_management"
  | "multi_tax_rates"
  // Inventory
  | "inventory_tracking"
  | "stock_alerts"
  | "stock_adjustments"
  | "purchase_orders"
  | "supplier_management"
  | "inventory_reports"
  // Customers
  | "customer_management"
  | "customer_invoices"
  | "payment_tracking"
  // Reports
  | "daily_reports"
  | "advanced_analytics"
  | "profit_reports"
  | "cashier_reports"
  | "export_excel"
  // Finance
  | "expense_tracking"
  | "expense_categories"
  // Multi-store
  | "multi_branch"
  | "multi_register"
  | "branch_reports"
  // Users
  | "multi_cashier"
  | "role_permissions"
  | "activity_log"
  // Customization
  | "theme_customization"
  | "receipt_customization"
  | "arabic_receipts"
  | "invoice_templates"
  | "brand_logo"
  // Support
  | "email_support"
  | "whatsapp_support"
  | "priority_support"
  | "dedicated_manager"
  // Advanced
  | "api_access"
  | "webhooks"
  | "white_label"
  | "data_export"
  | "data_import";

export interface Plan {
  id: PlanId;
  nameEn: string;
  nameAr: string;
  /** EGP per month; 0 with `custom: true` means "contact sales" */
  priceMonthly: number;
  /** EGP per month when billed annually */
  priceAnnual: number;
  currency: "EGP";
  custom?: boolean;
  maxRegisters: number; // -1 = unlimited
  maxBranches: number;
  maxProducts: number;
  maxUsers: number;
  features: PlanFeature[];
  highlighted: boolean;
  badge?: string;
}

const FREE_FEATURES: PlanFeature[] = [
  "pos_terminal",
  "barcode_scanner",
  "receipt_printing",
  "unit_management",
  "tax_management",
  "inventory_tracking",
  "stock_alerts",
  "daily_reports",
  "arabic_receipts",
  "theme_customization",
  "email_support",
  "data_export",
];

const STARTER_FEATURES: PlanFeature[] = [
  ...FREE_FEATURES,
  "decimal_quantities",
  "order_notes",
  "order_discount",
  "unlimited_products",
  "product_images",
  "multi_tax_rates",
  "stock_adjustments",
  "multi_cashier",
];

const PROFESSIONAL_FEATURES: PlanFeature[] = [
  ...STARTER_FEATURES,
  "split_payment",
  "hold_orders",
  "custom_discount",
  "product_variants",
  "bulk_import",
  "barcode_generator",
  "unit_conversions",
  "purchase_orders",
  "supplier_management",
  "inventory_reports",
  "customer_management",
  "customer_invoices",
  "payment_tracking",
  "advanced_analytics",
  "profit_reports",
  "cashier_reports",
  "export_excel",
  "expense_tracking",
  "expense_categories",
  "multi_branch",
  "multi_register",
  "role_permissions",
  "activity_log",
  "receipt_customization",
  "invoice_templates",
  "brand_logo",
  "whatsapp_support",
  "data_import",
];

const ENTERPRISE_FEATURES: PlanFeature[] = [
  ...PROFESSIONAL_FEATURES,
  "branch_reports",
  "api_access",
  "webhooks",
  "white_label",
  "priority_support",
  "dedicated_manager",
];

export const PLANS: Plan[] = [
  {
    id: "free",
    nameEn: "Free",
    nameAr: "مجاني",
    priceMonthly: 0,
    priceAnnual: 0,
    currency: "EGP",
    maxRegisters: 1,
    maxBranches: 1,
    maxProducts: 50,
    maxUsers: 1,
    highlighted: false,
    features: FREE_FEATURES,
  },
  {
    id: "starter",
    nameEn: "Starter",
    nameAr: "المبتدئ",
    priceMonthly: 199,
    priceAnnual: 159,
    currency: "EGP",
    maxRegisters: 1,
    maxBranches: 1,
    maxProducts: -1,
    maxUsers: 3,
    highlighted: false,
    features: STARTER_FEATURES,
  },
  {
    id: "professional",
    nameEn: "Professional",
    nameAr: "الاحترافي",
    priceMonthly: 449,
    priceAnnual: 359,
    currency: "EGP",
    maxRegisters: 3,
    maxBranches: 2,
    maxProducts: -1,
    maxUsers: 10,
    highlighted: true,
    badge: "Most Popular",
    features: PROFESSIONAL_FEATURES,
  },
  {
    id: "enterprise",
    nameEn: "Enterprise",
    nameAr: "المؤسسي",
    priceMonthly: 0,
    priceAnnual: 0,
    currency: "EGP",
    custom: true,
    maxRegisters: -1,
    maxBranches: -1,
    maxProducts: -1,
    maxUsers: -1,
    highlighted: false,
    features: ENTERPRISE_FEATURES,
  },
];

export const PLAN_RANK: Record<PlanId, number> = {
  free: 0,
  starter: 1,
  professional: 2,
  enterprise: 3,
};

export function getPlan(id: PlanId): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS[0];
}

export function canAccess(feature: PlanFeature, userPlan: PlanId): boolean {
  return getPlan(userPlan).features.includes(feature);
}

/** Cheapest plan that unlocks the given feature. */
export function minPlanFor(feature: PlanFeature): PlanId {
  const plan = PLANS.find((p) => p.features.includes(feature));
  return plan?.id ?? "enterprise";
}
