  import { mockUserPurchases } from "../../../lib/mock-data";
  import { PurchaseStatus } from "../../../lib/types";

export default function InvoiceCard({ id }: { id: string }) {
  const purchase = mockUserPurchases.find((p) => p.id === id);

  if (!purchase) return <p className="text-center text-gray-700 text-lg">Invoice not found.</p>;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6 max-w-3xl mx-auto">
      <div>
        <h3 className="text-xl font-bold text-gray-900">{purchase.workflow}</h3>
        <p className="text-base text-gray-700 mt-1">Purchased on {purchase.date}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-base">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Payment Info</h4>
          <p className="text-gray-800">Method: Transfer</p>
          <p className={`text-gray-800 rounded-full mt-2 w-fit px-4 py-1 bg-gray-100 text-center ${purchase.status === PurchaseStatus.Pending ? "text-yellow-500" : "text-green-500"}` }>{purchase.status}</p>
        </div>
        <div className="text-right">
          <h4 className="font-semibold text-gray-900 mb-2">Amount</h4>
          <p className="text-gray-800">${purchase.price}</p>
          <p className="text-gray-800">Tax (10%): ${(purchase.price * 0.1).toFixed(2)}</p>
          <p className="font-bold text-lg text-gray-900 mt-2">Total: ${(purchase.price * 1.1).toFixed(2)}</p>
        </div>
      </div>

      <div className="pt-4 border-t text-base text-gray-700 text-center">
        <p>Need help? Contact support@usitech.io.vn</p>
      </div>
    </div>
  );
}


