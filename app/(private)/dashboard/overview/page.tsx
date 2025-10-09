"use client";

import { PurchaseHeader, PurchaseTable } from "../../../../components/dashboard/overview";

// export const metadata = {
//   title: "Purchase History | UsITech",
//   description: "View your workflow purchase history and manage your downloads.",
// };

export default function OverviewPurchaseHistoryPage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
      <PurchaseHeader />
      <PurchaseTable />
    </div>
  );
}


