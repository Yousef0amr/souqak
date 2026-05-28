"use client";

import { useRecentOrders, type RecentOrder } from "./hooks/useRecentOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { Badge } from "@/common/shared/badge";
import { ShoppingCart } from "lucide-react";

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Completed: "default",
  Pending: "secondary",
  Cancelled: "destructive",
};

export function RecentOrdersWidget() {
  const { data: orders, isLoading } = useRecentOrders();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          Recent Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="text-sm text-muted-foreground">Loading...</div>}
        {!isLoading && (!orders || orders.length === 0) && (
          <div className="text-sm text-muted-foreground">No recent orders</div>
        )}
        {orders && orders.length > 0 && (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order: RecentOrder) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{order.orderNumber || order.id.slice(0, 8)}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">${order.total.toFixed(2)}</span>
                  <Badge variant={statusVariant[order.status] || "outline"}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
