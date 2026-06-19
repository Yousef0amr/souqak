"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback } from "@/common/shared/avatar";
import { cn } from "@/config/shadcnUtils";
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Palette,
  ChevronRight,
  Clock,
} from "lucide-react";
import { SidebarTrigger } from "@/common/shared/sidebar";
import { useLogout } from "@/modules/auth";
import { useSearchStore } from "@/modules/search/stores/useSearchStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/common/shared/dropdown-menu";
import { ThemeCustomizationPanel } from "@/shared/components/ThemeCustomizationPanel";
import { useThemeCustomization } from "@/shared/hooks/useThemeCustomization";

// ─── Mock notifications ───────────────────────────────────────────────────────
const NOTIFICATIONS = [
  {
    id: "1",
    title: "Low stock alert",
    description: "Product SKU-001 has only 3 units left",
    time: "5 min ago",
    read: false,
    group: "today",
  },
  {
    id: "2",
    title: "New order received",
    description: "Order ORD-2024-001 has been placed",
    time: "1 hour ago",
    read: false,
    group: "today",
  },
  {
    id: "3",
    title: "Payment received",
    description: "Invoice INV-001 has been paid",
    time: "3 hours ago",
    read: true,
    group: "earlier",
  },
  {
    id: "4",
    title: "Supplier invoice due",
    description: "Invoice from Acme Corp is due tomorrow",
    time: "1 day ago",
    read: true,
    group: "earlier",
  },
] as const;

// ─── Notification Bell ────────────────────────────────────────────────────────
function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;
  const todayNotifs = NOTIFICATIONS.filter((n) => n.group === "today");
  const earlierNotifs = NOTIFICATIONS.filter((n) => n.group === "earlier");

  return (
    <div className="relative">
      <button
        id="notifications-trigger"
        onClick={() => setOpen(!open)}
        aria-label={`Notifications, ${unreadCount} unread`}
        aria-expanded={open}
        className="relative group p-2.5 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-200 hover:shadow-sm"
      >
        <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center animate-scale-in">
            <span className="text-[10px] font-bold text-white">{unreadCount}</span>
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border/60 rounded-xl shadow-xl z-40 overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-muted/30">
              <span className="text-sm font-semibold">Notifications</span>
              <button className="text-[11px] text-primary hover:underline font-medium transition-colors">
                Mark all read
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {/* Today */}
              <div className="px-4 pt-3 pb-1 flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Today</span>
              </div>
              {todayNotifs.map((n) => (
                <NotificationItem key={n.id} notification={n} />
              ))}

              {/* Earlier */}
              <div className="px-4 pt-3 pb-1 flex items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Earlier</span>
              </div>
              {earlierNotifs.map((n) => (
                <NotificationItem key={n.id} notification={n} />
              ))}
            </div>

            <div className="px-4 py-2.5 border-t border-border/60 bg-muted/20">
              <button className="text-xs font-medium text-primary hover:underline flex items-center gap-1 transition-colors">
                View all notifications <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function NotificationItem({ notification }: { notification: (typeof NOTIFICATIONS)[number] }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 border-b border-border/30 last:border-0 hover:bg-muted/50 cursor-pointer transition-colors duration-150",
        !notification.read && "bg-primary/4"
      )}
    >
      <div
        className={cn(
          "mt-1.5 h-2 w-2 rounded-full shrink-0 transition-colors",
          !notification.read ? "bg-primary" : "bg-border"
        )}
      />
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm truncate", !notification.read ? "font-semibold" : "font-medium")}>
          {notification.title}
        </p>
        <p className="text-xs text-muted-foreground truncate mt-0.5">{notification.description}</p>
        <p className="text-[10px] text-muted-foreground/70 mt-1">{notification.time}</p>
      </div>
    </div>
  );
}

// ─── Main TopBar ──────────────────────────────────────────────────────────────
function TopBar() {
  // Apply theme customizations to CSS vars
  useThemeCustomization();

  const { theme } = useTheme();
  const { logout } = useLogout();
  const setSearchOpen = useSearchStore((s) => s.setOpen);
  const [themePanelOpen, setThemePanelOpen] = useState(false);

  // Hydration fix for next-themes
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine mode indicator text
  const modeLabel = mounted ? (theme ?? "system") : "system";

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="flex h-16 items-center gap-4 px-2 sm:px-4">
          <SidebarTrigger className="transition-colors rounded-md p-1 hover:bg-primary/10" />

          {/* Search bar */}
          <div className="flex-1 max-w-md">
            <button
              id="global-search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Open global search"
              className="relative w-full text-left group"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              <span className="block pl-10 pr-12 py-2.5 bg-muted/40 border border-border/50 group-hover:bg-primary/5 group-hover:border-primary/30 transition-all duration-200 rounded-xl w-full text-sm text-muted-foreground">
                Search products, orders, customers…
              </span>
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded-md border border-border/60 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>

          {/* Right side actions */}
          <div className="ml-auto flex items-center gap-1.5">

            {/* Theme customisation button */}
            <button
              id="open-theme-panel"
              onClick={() => setThemePanelOpen(true)}
              aria-label="Customize appearance"
              title={`Appearance · ${modeLabel}`}
              className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-200 hover:shadow-sm"
            >
              <Palette className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <NotificationPanel />

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  id="profile-menu-trigger"
                  aria-label="Open profile menu"
                  className="flex items-center gap-2 pl-1 pr-2 py-1 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-xl transition-all duration-200 hover:shadow-sm group"
                >
                  <div className="relative">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-200">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold text-xs">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background shadow-sm" />
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-semibold leading-none">Admin</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 capitalize">{modeLabel} theme</div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl">
                <DropdownMenuItem onClick={() => (window.location.href = "/dashboard/settings")}>
                  <Settings className="h-4 w-4 mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Theme Panel */}
      <ThemeCustomizationPanel open={themePanelOpen} onOpenChange={setThemePanelOpen} />
    </>
  );
}

export default TopBar;
