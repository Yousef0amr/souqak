import { Separator } from "@/common/shared/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/common/shared/breadcrumb";
import { Input } from "@/common/forms/input";
import { Button } from "@/common/buttons/button";
import { Avatar, AvatarFallback } from "@/common/shared/avatar";

import { cn } from "@/config/shadcnUtils";
import { Bell, Search, User, Settings, HelpCircle, LogOut } from "lucide-react";
import { Link, usePathname } from "@/config/i18n/navigation";
import { SidebarTrigger } from "@/common/shared/sidebar";
function TopBar() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    const title = segments[0]
        ? segments[0].charAt(0).toUpperCase() + segments[0].slice(1)
        : "Dashboard";

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="flex h-16 items-center gap-4 px-2 sm:px-4">
                <SidebarTrigger className=" transition-colors rounded-md p-1" />

                {/* Search bar */}
                <div className="flex-1 max-w-md">

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products, orders, customers..."
                            className="pl-10 pr-4 py-2 bg-muted/30 border-border/50 focus:bg-background focus:border-primary/50 transition-all duration-200 rounded-lg w-full"
                        />
                    </div>
                </div>


                {/* Right side actions */}
                <div className="ml-auto flex items-center gap-2">
                    {/* Notifications */}
                    <button className="relative group p-2.5 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-200 hover:shadow-sm">
                        <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">3</span>
                        </span>
                    </button>

                    {/* Quick Actions */}
                    <div className="hidden sm:flex items-center gap-1">
                        <button className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-200 hover:shadow-sm">
                            <Settings className="h-5 w-5" />
                        </button>
                        <button className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-200 hover:shadow-sm">
                            <HelpCircle className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Profile Dropdown */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-200 hover:shadow-sm group">
                            <div className="relative">
                                <Avatar className="h-8 w-8 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-200">
                                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                            </div>
                            <div className="hidden sm:block text-left">
                                <div className="text-sm font-medium">Admin User</div>
                                <div className="text-xs text-muted-foreground">Online</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </header>

    );
}
export default TopBar