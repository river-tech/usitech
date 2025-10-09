import { InvoiceHeader, InvoiceCard } from "../../../../../../components/dashboard/checkout";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InvoicePage({ params }: PageProps) {
  const p = await params;
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <InvoiceHeader />
      <InvoiceCard id={p.id} />
    </div>
  );
}


