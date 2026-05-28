"use client";

import React from "react";
import { KPICard } from "./KPICard";
import { RevenueChart } from "./RevenueChart";
import { UserGrowthChart } from "./UserGrowthChart";
import { ProductOverview } from "./ProductOverview";
import { RecentOrdersWidget } from "./RecentOrdersWidget";
import { StockLevelsWidget } from "./StockLevelsWidget";
import { TopProductsWidget } from "./TopProductsWidget";
import { HourlySalesChart } from "./HourlySalesChart";

import {
  RefreshCw,
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/common/buttons/button";
import { Badge } from "@/common/shared/badge";

import { useOrders, type Order } from "@/modules/orders";
import { useCustomers } from "@/modules/customers";
import { useDashboardStats } from "./hooks/useDashboardStats";

// ─── Greeting helper ──────────────────────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-5 w-1 rounded-full bg-primary shrink-0" />
      <div>
        <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Dashboard View ───────────────────────────────────────────────────────────
export const DashboardView = () => {
  const { data: orders = [], refetch: refetchOrders } = useOrders();
  const { data: customers = [], refetch: refetchCustomers } = useCustomers();
  const { data: stats, refetch: refetchStats } = useDashboardStats();

  const liveRevenue = orders.reduce((acc: number, o: Order) => acc + o.total, 0);
  const liveOrdersCount = orders.length;
  const liveCustomersCount = customers.length;

  const displayRevenue       = stats?.revenueToday       ?? liveRevenue;
  const displayOrdersCount   = stats?.ordersToday        ?? liveOrdersCount;
  const displayCustomersCount = liveCustomersCount;
  const displayRevenueTrend  = stats?.revenueTrend       ?? 12;
  const displayOrdersTrend   = stats?.ordersTrend        ?? -2;
  const displayAvgOrderValue = stats?.avgOrderValue      ?? (liveOrdersCount > 0 ? liveRevenue / liveOrdersCount : 127);
  const displayAvgOrderTrend = stats?.avgOrderTrend      ?? 12;

  const handleRefresh = () => {
    refetchOrders();
    refetchCustomers();
    refetchStats();
  };

  return (
    <div className="space-y-8">

      {/* ── Hero Welcome Banner ─────────────────────────────── */}
      <div className="animate-fade-up relative overflow-hidden rounded-2xl bg-hero-gradient p-6 md:p-8 text-white shadow-lg">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-white/70" />
              <Badge
                variant="outline"
                className="border-white/30 text-white/80 bg-white/10 text-[10px] font-medium"
              >
                Live Data
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {getGreeting()}, Admin 👋
            </h1>
            <p className="text-sm text-white/70">{formatDate()}</p>
          </div>

          {/* Quick stat pill */}
          <div className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 w-fit">
            <TrendingUp className="h-5 w-5 text-white/80 shrink-0" />
            <div>
              <p className="text-xs text-white/60 leading-none mb-0.5">Revenue Today</p>
              <p className="text-lg font-bold text-white leading-none">
                ${displayRevenue >= 1000 ? `${(displayRevenue / 1000).toFixed(1)}K` : displayRevenue}
              </p>
            </div>
            <div className="ml-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                onClick={handleRefresh}
                aria-label="Refresh dashboard data"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────── */}
      <section aria-label="Key performance indicators">
        <div className="mb-4 animate-fade-up delay-75">
          <SectionHeader title="Key Metrics" subtitle="Compared to last month" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="animate-fade-up delay-75">
            <KPICard
              title="Total Revenue"
              value={displayRevenue}
              change={displayRevenueTrend}
              trend={displayRevenueTrend >= 0 ? "up" : "down"}
              icon={DollarSign}
              prefix="$"
              index={0}
            />
          </div>
          <div className="animate-fade-up delay-150">
            <KPICard
              title="Total Users"
              value={displayCustomersCount}
              change={5}
              trend="up"
              icon={Users}
              index={1}
            />
          </div>
          <div className="animate-fade-up delay-225">
            <KPICard
              title="Total Orders"
              value={displayOrdersCount}
              change={displayOrdersTrend}
              trend={displayOrdersTrend >= 0 ? "up" : "down"}
              icon={ShoppingCart}
              index={2}
            />
          </div>
          <div className="animate-fade-up delay-300">
            <KPICard
              title="Avg Order Value"
              value={displayAvgOrderValue}
              change={displayAvgOrderTrend}
              trend="up"
              icon={TrendingUp}
              prefix="$"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* ── Revenue Charts ─────────────────────────────────── */}
      <section aria-label="Revenue and growth charts" className="animate-fade-up delay-300">
        <div className="mb-4">
          <SectionHeader title="Performance Trends" subtitle="Revenue & user growth over time" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart data={[
            { month: "Jan", value: 12000 },
            { month: "Feb", value: 15000 },
            { month: "Mar", value: 18000 },
            { month: "Apr", value: 22000 },
            { month: "May", value: 25000 },
          ] as any} />
          <UserGrowthChart data={[
            { month: "Jan", users: 200 },
            { month: "Feb", users: 400 },
            { month: "Mar", users: 600 },
            { month: "Apr", users: 900 },
            { month: "May", users: 1280 },
          ] as any} />
        </div>
      </section>

      {/* ── Widgets Row ────────────────────────────────────── */}
      <section aria-label="Activity widgets" className="animate-fade-up delay-400">
        <div className="mb-4">
          <SectionHeader title="Activity Overview" subtitle="Recent orders, stock levels & hourly sales" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <RecentOrdersWidget />
          <TopProductsWidget />
          <StockLevelsWidget />
          <HourlySalesChart />
        </div>
      </section>

      {/* ── Product Overview ───────────────────────────────── */}
      <section aria-label="Product overview" className="animate-fade-up delay-500">
        <div className="mb-4">
          <SectionHeader title="Product Overview" subtitle="Inventory, categories & quick actions" />
        </div>
        <ProductOverview onViewAll={() => {}} />
      </section>
    </div>
  );
};
