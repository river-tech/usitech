"use client";

import PurchasedWorkflowList from "../../../../components/dashboard/my-workflows/PurchasedWorkflowList";
import LikedWorkflowList from "../../../../components/dashboard/my-workflows/LikedWorkflowList";

export default function MyWorkflowsPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-12">
      <PurchasedWorkflowList />
      <LikedWorkflowList />
    </div>
  );
}


