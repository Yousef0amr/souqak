"use client";

import {
  BarChart2,
  CreditCard,
  LayoutDashboard,
  Megaphone,
  Package,
  Plug,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
  Warehouse,
  Building2,
  FileSpreadsheet,
  ArrowRightLeft,
  Receipt,
  UserCog,
  Tags,
  LogOut,
  Layers,
  Award,
  Ruler,
  Percent,
  UtensilsCrossed,
  Pizza,
} from "lucide-react";
import { Link, usePathname } from "@/config/i18n/navigation";
import logo from "@/assets/souqak.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarFooter,
} from "@/common/shared/sidebar";
import TopBar from "./TopBar";
import Image from "next/image";
import { SearchCommand } from "@/modules/search/components/SearchCommand";
import { Avatar, AvatarFallback } from "@/common/shared/avatar";
import { useUserStore } from "@/modules/auth/stores/useUserStore";
import useLogout from "@/modules/auth/hooks/useLogout";
import { useSettingsStore } from "@/modules/settings/stores/useSettingsStore";
import { BusinessMode } from "@/types/business-mode";
import { cn } from "@/config/shadcnUtils";

// ─── Navigation config ────────────────────────────────────────────────────────
const mainItems = [
  { to: "/dashboard",           label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
];

const salesItems = [
  { to: "/dashboard/products",  label: "Products",  icon: Package },
  { to: "/dashboard/orders",    label: "Orders",    icon: ShoppingCart },
  { to: "/dashboard/customers", label: "Customers", icon: Users },
  { to: "/dashboard/payments",  label: "Payments",  icon: CreditCard },
  { to: "/dashboard/receipts",  label: "Receipts",  icon: Receipt },
];

const operationsItems = [
  { to: "/dashboard/inventory",         label: "Inventory",       icon: Warehouse },
  { to: "/dashboard/suppliers",         label: "Suppliers",       icon: Building2 },
  { to: "/dashboard/purchase-invoices", label: "Purchase Orders", icon: FileSpreadsheet },
  { to: "/dashboard/shipping",          label: "Shipping",        icon: Truck },
  { to: "/dashboard/marketing",         label: "Marketing",       icon: Megaphone },
];

const setupItems = [
  { to: "/dashboard/stores",             label: "Stores",              icon: Building2 },
  { to: "/dashboard/categories",         label: "Categories",          icon: Layers },
  { to: "/dashboard/brands",             label: "Brands",              icon: Award },
  { to: "/dashboard/units",              label: "Measurement Units",   icon: Ruler },
  { to: "/dashboard/unit-conversions",   label: "Unit Conversions",    icon: ArrowRightLeft },
  { to: "/dashboard/expense-categories", label: "Expense Categories",  icon: Tags },
  { to: "/dashboard/taxes",              label: "VAT & Taxes",         icon: Percent },
];

const systemItems = [
  { to: "/dashboard/users",              label: "Users",               icon: UserCog },
  { to: "/dashboard/settings",           label: "Settings",            icon: Settings },
  { to: "/dashboard/security",           label: "Security",            icon: ShieldCheck },
  { to: "/dashboard/integrations",       label: "Integrations",        icon: Plug },
];

const diningItems = [
  { to: "/dashboard/tables",    label: "Tables",    icon: UtensilsCrossed },
  { to: "/dashboard/modifiers", label: "Modifiers", icon: Pizza },
];

// ─── AppSidebar ───────────────────────────────────────────────────────────────
export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const businessMode = useSettingsStore((state) => state.settings.businessMode);
  const { logout } = useLogout();

  const navGroups = [
    { label: "Overview",    items: mainItems },
    { label: "Sales",       items: salesItems },
    ...(businessMode === BusinessMode.restaurant
      ? [{ label: "Dining", items: diningItems }]
      : []),
    { label: "Operations",  items: operationsItems },
    { label: "Setup",       items: setupItems },
    { label: "System",      items: systemItems },
  ];

  const isActive = (to: string) =>
    pathname === to || (to !== "/dashboard" && pathname.startsWith(to + "/"));

  const renderMenuItems = (items: readonly { to: string; label: string; icon: React.ComponentType<{ className?: string }> }[]) =>
    items.map((item) => {
      const active = isActive(item.to);
      return (
        <SidebarMenuItem key={item.to}>
          <SidebarMenuButton
            asChild
            isActive={active}
            tooltip={item.label}
          >
            <Link
              href={item.to}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                "relative overflow-hidden",
                active
                  ? [
                      "bg-sidebar-primary/15 text-sidebar-primary font-semibold",
                      "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                      "before:h-[60%] before:w-[3px] before:rounded-r-full before:bg-sidebar-primary",
                    ]
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  active ? "text-sidebar-primary" : "text-sidebar-foreground/50"
                )}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">

        {/* ── Logo / Header ─────────────────────────────────── */}
        <SidebarHeader className="border-b border-sidebar-border/40 pb-3 pt-4 px-3">
          <div className="flex items-center gap-3">
            {/* Logo glow container */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-lg bg-sidebar-primary/30 blur-md" />
              <div className="relative h-9 w-9 rounded-lg bg-sidebar-primary/20 ring-1 ring-sidebar-primary/30 flex items-center justify-center overflow-hidden">
                <Image src={logo} alt="Souqak logo" width={28} height={28} className="object-contain" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-sidebar-foreground tracking-tight truncate">Souqak</p>
              <p className="text-[10px] text-sidebar-foreground/40 truncate uppercase tracking-widest">Business Suite</p>
            </div>
          </div>
        </SidebarHeader>

        {/* ── Navigation ────────────────────────────────────── */}
        <SidebarContent className="py-3 px-1.5">
          {navGroups.map((group, gi) => (
            <SidebarGroup key={group.label} className={gi > 0 ? "mt-1" : ""}>
              <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/35 px-3 mb-1 flex items-center gap-2">
                {gi > 0 && <div className="flex-1 h-px bg-sidebar-border/40" />}
                {group.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>{renderMenuItems(group.items)}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* ── User Footer ───────────────────────────────────── */}
        <SidebarFooter className="border-t border-sidebar-border/40 pt-3 pb-4 px-3">
          {/* User mini card */}
          <div className="mb-2 flex items-center gap-2.5 rounded-xl bg-sidebar-accent/50 px-3 py-2.5 ring-1 ring-sidebar-border/30">
            <div className="relative shrink-0">
              <Avatar className="h-8 w-8 ring-2 ring-sidebar-primary/30">
                <AvatarFallback className="bg-gradient-to-br from-sidebar-primary to-sidebar-primary/60 text-sidebar-primary-foreground text-xs font-bold">
                  {user?.name?.slice(0, 2)?.toUpperCase() ?? "SQ"}
                </AvatarFallback>
              </Avatar>
              {/* Online dot */}
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-sidebar shadow-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">
                {user?.name ?? "Admin"}
              </p>
              <p className="text-[10px] text-sidebar-foreground/45 truncate">
                {user?.email ?? "admin@souqak.com"}
              </p>
            </div>
          </div>

          {/* Sign out */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={logout}
                tooltip="Sign out"
                className="text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-all duration-200 rounded-lg"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* ── Main Content ────────────────────────────────────── */}
      <SidebarInset>
        <TopBar />
        <SearchCommand />
        <main className="p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
