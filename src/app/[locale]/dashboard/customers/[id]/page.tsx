import { CustomerDetails } from "@/modules/customers/components/CustomerDetails";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CustomerDetails id={id} />;
}
