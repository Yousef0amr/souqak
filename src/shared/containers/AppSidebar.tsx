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
} from "@/common/shared/sidebar";
import TopBar from "./TopBar";
import Image from "next/image";

const mainItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
];

const salesItems = [
  { to: "/dashboard/products", label: "Products", icon: Package },
  { to: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { to: "/dashboard/customers", label: "Customers", icon: Users },
  { to: "/dashboard/payments", label: "Payments", icon: CreditCard },
];

const operationsItems = [
  { to: "/dashboard/shipping", label: "Shipping", icon: Truck },
  { to: "/dashboard/marketing", label: "Marketing", icon: Megaphone },
];

const systemItems = [
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
  { to: "/dashboard/security", label: "Security", icon: ShieldCheck },
  { to: "/dashboard/integrations", label: "Integrations", icon: Plug },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const renderMenuItems = (items: typeof mainItems) =>
    items.map((item) => (
      <SidebarMenuItem key={item.to}>
        <SidebarMenuButton asChild isActive={pathname === item.to} tooltip={item.label}>
          <Link href={item.to} className="flex items-center">
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        {/* Header */}
        <SidebarHeader className="flex items-center">
          <SidebarMenuButton
            asChild
            className=" h-24 w-24 bg-transparent hover:bg-transparent overflow-hidden rounded-sm  focus:outline-none focus:ring-0 shadow-none pointer-events-none"
          >
            <Image src={logo} alt="logo" width={64} height={64} />
          </SidebarMenuButton>
          <SidebarGroupLabel className="text-lg font-semibold">SOUQAK Dashboard</SidebarGroupLabel>
        </SidebarHeader>

        {/* Content with multiple groups */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{renderMenuItems(mainItems)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Sales</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{renderMenuItems(salesItems)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Operations</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{renderMenuItems(operationsItems)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{renderMenuItems(systemItems)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>

      {/* Main Content */}
      <SidebarInset>
        <TopBar />
        <div className="p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
