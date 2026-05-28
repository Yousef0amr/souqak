import { OrderDetailView } from "@/modules/orders/components/OrderDetailView";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderDetailView id={id} />;
}
