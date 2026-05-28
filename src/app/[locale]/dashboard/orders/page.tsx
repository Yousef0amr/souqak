import React from "react";
import { OrdersList } from "@/modules/orders";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sales Orders</h1>
        <p className="text-muted-foreground">
          View, audit, and track live point-of-sale customer orders
        </p>
      </div>
      <OrdersList />
    </div>
  );
}
