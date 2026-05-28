"use client";

import React, { useMemo } from "react";
import { useCategorySales, useDailySales, useSummary } from "../hooks/useReports";
import { useOrders } from "../../orders/hooks/useOrders";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/shared/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Badge } from "@/common/shared/badge";

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "#f59e0b", "#10b981", "#8b5cf6"];

export function RevenueDetailsChart() {
  const { data: summary } = useSummary();
  const { data: categorySalesData = [] } = useCategorySales();
  const { data: dailySalesData = [] } = useDailySales();
  const { data: orders = [] } = useOrders();

  const categorySales = categorySalesData.length > 0
    ? categorySalesData.map((c) => ({ name: c.categoryNameEn || c.categoryNameAr, sales: c.amount }))
    : [
        { name: "Electronics", sales: 3298 },
        { name: "Audio", sales: 798 },
        { name: "Accessories", sales: 238 },
      ];

  const dailySales = dailySalesData.length > 0
    ? dailySalesData.map((d) => ({ date: d.date.slice(5), amount: d.amount }))
    : [];

  const paymentChannelData = useMemo(() => {
    const card = orders.filter((o: any) => o.paymentMethod === "Card").reduce((acc: number, o: any) => acc + o.total, 0);
    const cash = orders.filter((o: any) => o.paymentMethod === "Cash").reduce((acc: number, o: any) => acc + o.total, 0);
    return card || cash
      ? [
          { name: "Card", value: card },
          { name: "Cash", value: cash },
        ]
      : [
          { name: "Card", value: 5400 },
          { name: "Cash", value: 3200 },
        ];
  }, [orders]);

  return (
    <div className="space-y-6">
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summary.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalOrders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold truncate">{summary.topProductNameEn || "â€”"}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Profit Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${summary.profitMargin >= 0 ? "text-green-600" : "text-red-600"}`}>
                {summary.profitMargin.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dailySales.length > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Daily Sales Trend</CardTitle>
              <CardDescription>Revenue per day over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dailySales}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue breakdown across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categorySales}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => `$${value}`} />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Channels</CardTitle>
            <CardDescription>Card vs Cash breakdown</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={paymentChannelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentChannelData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
