"use client";

import React from 'react';
import { KPICard } from './KPICard';
import { RevenueChart } from './RevenueChart';
import { UserGrowthChart } from './UserGrowthChart';
import { ProductOverview } from './ProductOverview';

import { RefreshCw, DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import { Button } from '@/common/buttons/button';


const dummyData = {
  kpis: {
    revenue: { value: 45230, change: 12, trend: 'up' as const },
    users: { value: 1280, change: 5, trend: 'up' as const },
    orders: { value: 320, change: -2, trend: 'down' as const },
    growth: { value: 7.8, change: 1.2, trend: 'up' as const },
  },
  chartData: {
    revenue: [
      { month: 'Jan', revenue: 12000 },
      { month: 'Feb', revenue: 15000 },
      { month: 'Mar', revenue: 18000 },
      { month: 'Apr', revenue: 22000 },
      { month: 'May', revenue: 25000 },
    ],
    users: [
      { month: 'Jan', users: 200 },
      { month: 'Feb', users: 400 },
      { month: 'Mar', users: 600 },
      { month: 'Apr', users: 900 },
      { month: 'May', users: 1280 },
    ],
  },
};

export const DashboardView = () => {
  const data = dummyData; // Replace with API hook later

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <Button variant="outline" onClick={() => { }}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value={data.kpis.revenue.value}
          change={data.kpis.revenue.change}
          trend={data.kpis.revenue.trend}
          icon={DollarSign}
          prefix="$"
        />
        <KPICard
          title="Total Users"
          value={data.kpis.users.value}
          change={data.kpis.users.change}
          trend={data.kpis.users.trend}
          icon={Users}
        />
        <KPICard
          title="Total Orders"
          value={data.kpis.orders.value}
          change={data.kpis.orders.change}
          trend={data.kpis.orders.trend}
          icon={ShoppingCart}
        />
        <KPICard
          title="Growth Rate"
          value={data.kpis.growth.value}
          change={data.kpis.growth.change}
          trend={data.kpis.growth.trend}
          icon={TrendingUp}
          suffix="%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={data.chartData.revenue as any} />
        <UserGrowthChart data={data.chartData.users as any} />
      </div>

      {/* Product Overview */}
      <ProductOverview onViewAll={() => { }} />

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card text-card-foreground rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
          <p className="text-2xl font-bold">2.4%</p>
          <p className="text-xs text-muted-foreground">+0.3% from last month</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Average Order Value</h3>
          <p className="text-2xl font-bold">$127</p>
          <p className="text-xs text-muted-foreground">+$12 from last month</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Customer Retention</h3>
          <p className="text-2xl font-bold">87%</p>
          <p className="text-xs text-muted-foreground">+2% from last month</p>
        </div>
      </div>
    </div>
  );
};
