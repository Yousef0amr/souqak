import { CreateOrderForm } from "@/modules/orders/components/CreateOrderForm";

export default function NewOrderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Order</h1>
        <p className="text-muted-foreground">Create a new POS sale order</p>
      </div>
      <CreateOrderForm />
    </div>
  );
}
