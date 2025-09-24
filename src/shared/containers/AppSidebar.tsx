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
    Store,
    Truck,
    Users,
} from "lucide-react";
import { Link, usePathname } from "@/config/i18n/navigation";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger } from "@/common/shared/sidebar";
import TopBar from "./TopBar";


const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/products", label: "Products", icon: Package },
    { to: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
    { to: "/dashboard/customers", label: "Customers", icon: Users },
    { to: "/dashboard/payments", label: "Payments", icon: CreditCard },
    { to: "/dashboard/shipping", label: "Shipping", icon: Truck },
    { to: "/dashboard/marketing", label: "Marketing", icon: Megaphone },
    { to: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    { to: "/dashboard/settings", label: "Settings", icon: Settings },
    { to: "/dashboard/security", label: "Security", icon: ShieldCheck },
    { to: "/dashboard/integrations", label: "Integrations", icon: Plug },
];



export function AppSidebar({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    const title = segments[0]
        ? segments[0].charAt(0).toUpperCase() + segments[0].slice(1)
        : "Dashboard";
    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader>

                    <SidebarMenuButton asChild >
                        <div className="flex items-center">
                            <Store className="h-16 w-16 text-primary" />
                            <SidebarGroupLabel>Multi-Store Admin</SidebarGroupLabel>
                        </div>
                    </SidebarMenuButton>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Management</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navItems.map((item) => (
                                    <SidebarMenuItem key={item.to}>
                                        <SidebarMenuButton asChild isActive={pathname === item.to} tooltip={item.label}>
                                            <Link href={item.to} className="flex items-center">
                                                <item.icon />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                {/* <SidebarFooter>
                    <div className="mx-2 rounded-lg bg-sidebar-accent px-3 py-2 text-xs">
                        <div className="font-medium">Insights</div>
                        <div className="text-muted-foreground">Track KPIs in real time</div>
                    </div>
                </SidebarFooter> */}
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                <TopBar />
                <div className="p-4 md:p-6">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}
