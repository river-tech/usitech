import * as React from "react";
import WorkflowCard from "./WorkflowCard";
import SectionHeader from "./SectionHeader";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PurchasedWorkflow } from "@/lib/models/purchased-workflow";
import UserApi from "@/lib/api/User";

export default function PurchasedWorkflowList() {
   const userApi = useMemo(() => UserApi(), []);
  const [purchasedWorkflows, setPurchasedWorkflows] = useState<PurchasedWorkflow[]>([]);

  useEffect(() => {
    const loadWorkflows = async () => {
      const result = await userApi.getMyPurchasedWorkflows();
      if (result.success) {
        setPurchasedWorkflows(result.data);
      }
    };
    loadWorkflows();
  }, [userApi]);

  return (
    <section>
      <Link href="/dashboard" className="inline-flex items-center gap-1 text-[#007BFF] text-sm font-medium hover:underline transition mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to dashboard
      </Link>
      <SectionHeader title="My Workflows" />
      <div className="space-y-4">
        {purchasedWorkflows.map((wf : PurchasedWorkflow) => (
          <WorkflowCard key={wf.id} workflow={wf} />
        ))}
      </div>
    </section>
  );
}

