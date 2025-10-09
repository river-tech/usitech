import * as React from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Eye, Download } from "lucide-react";
import { PurchaseStatus } from "../../../lib/types";
import { useRouter } from "next/navigation";

export type PurchaseItem = {
  id: string;
  workflow: string;
  date: string; // ISO or display
  price: number;
  payment: string;
  status: PurchaseStatus;
};

export default function PurchaseRow({ purchase }: { purchase: PurchaseItem }) {
  const router = useRouter();
  const getBadgeClass = (status: PurchaseStatus) => {
    switch (status) {
      case PurchaseStatus.Active:
        return "bg-green-100 text-green-700";
      case PurchaseStatus.Pending:
        return "bg-yellow-100 text-yellow-700";
      case PurchaseStatus.Reject:
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  return (
    <tr className="border-b last:border-none hover:bg-gray-50 transition">
      <td className="py-4 px-6 font-medium text-[#0F172A]">{purchase.workflow}</td>
      <td className="py-4 px-6 text-gray-600">{purchase.date}</td>
      <td className="py-4 px-6 font-semibold text-[#0F172A]">${purchase.price}</td>
      <td className="py-4 px-6 text-gray-600">{purchase.payment}</td>
      <td className="py-4 px-6">
       <div className={`${getBadgeClass(purchase.status)} rounded-full  py-1 text-xs font-semibold flex items-center justify-center`}>{purchase.status}</div>
      </td>
      <td className="py-4 px-6">
        <div className="flex gap-2">
          <Button onClick={() => router.push(`/dashboard/checkout/${purchase.id}/invoice`)} size="sm" variant="outline" className="flex items-center gap-2 border-gray-200 hover:bg-gray-50">
            <Eye className="w-4 h-4" /> View
          </Button>
          <Button  size="sm" variant="ghost" className="flex items-center gap-2 text-[#007BFF] hover:text-[#0057D8]">
            <Download className="w-4 h-4" /> Download
          </Button>
        </div>
      </td>
    </tr>
  );
}


