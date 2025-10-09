import * as React from "react";
import PurchaseRow, { type PurchaseItem } from "./PurchaseRow";
import { mockUserPurchases } from "../../../lib/mock-data";

export default function PurchaseTable({ items }: { items?: PurchaseItem[] }) {
  const data: PurchaseItem[] = items ?? mockUserPurchases;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-0 overflow-hidden">
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#0F172A]">Recent Purchases</h3>
          <span className="text-xs text-gray-500">{data.length} items</span>
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-gray-700">
          <thead>
            <tr className="border-b bg-gray-50/60">
              <th className="py-3 px-6 text-left font-medium text-gray-600">Workflow</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Purchase Date</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Price</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Payment</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Status</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((purchase) => (
              <PurchaseRow key={purchase.id} purchase={purchase} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 pb-4 pt-3 border-t border-gray-100 flex items-center justify-end text-xs text-gray-500">
        Showing {Math.min(10, data.length)} of {data.length}
      </div>
    </div>
  );
}


