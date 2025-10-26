import { CheckoutForm, OrderSummary } from "../../../../../components/dashboard/checkout";
import { mockUserPurchases } from "../../../../../lib/mock-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CheckoutPage({ params }: PageProps) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/workflows/${id}`, {
    cache: "no-store"
  });
  const item = await res.json();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <CheckoutForm orderId={item.id} total={`${item.price} ₫`} />
      </div>
      <OrderSummary item={item} />
    </div>
  );
}


