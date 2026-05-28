"use client";

import { useOrder } from "@/modules/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/shared/card";
import { Badge } from "@/common/shared/badge";
import { Button } from "@/common/buttons/button";
import { useRouter } from "@/config/i18n/navigation";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export function OrderDetailView({ id }: { id: string }) {
  const { data: order, isLoading } = useOrder(id);
  const router = useRouter();

  if (isLoading) return <div className="text-muted-foreground">Loading order...</div>;
  if (!order) return <div className="text-muted-foreground">Order not found</div>;

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.push("/dashboard/orders")}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {order.orderNumber}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Customer</p>
            <p className="font-medium">{order.customerName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-medium">{new Date(order.date).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Payment</p>
            <Badge variant={order.paymentMethod === "Card" ? "default" : "secondary"}>
              {order.paymentMethod}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge
              className={
                order.status === "Completed"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }
            >
              {order.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {order.items.map((item: any, i: number) => (
              <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4 mt-2 border-t font-bold text-lg">
            <span>Total</span>
            <span className="text-emerald-600">${order.total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
