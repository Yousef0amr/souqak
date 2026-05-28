"use client";

import { useHourlySales, type HourlySale } from "./hooks/useHourlySales";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Clock } from "lucide-react";

export function HourlySalesChart() {
  const { data: sales, isLoading } = useHourlySales();

  const chartData = (sales || []).map((s: HourlySale) => ({
    hour: `${s.hour}:00`,
    revenue: s.revenue,
    orders: s.orderCount,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Hourly Sales
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="text-sm text-muted-foreground">Loading...</div>}
        {!isLoading && chartData.length === 0 && (
          <div className="text-sm text-muted-foreground">No hourly data</div>
        )}
        {chartData.length > 0 && (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="hour" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
