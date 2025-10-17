import * as React from "react";
import WorkflowCard, { type SimpleWorkflow } from "./WorkflowCard";
import SectionHeader from "./SectionHeader";
import Link from "next/link";

export default function PurchasedWorkflowList({ items }: { items?: SimpleWorkflow[] }) {
  const data: SimpleWorkflow[] = items ?? [
    { id: 1, title: "Email Marketing Automation", category: "Marketing", price: 49, date: "2024-01-15", status: "Active" },
    { id: 2, title: "CRM Data Sync", category: "CRM", price: 79, date: "2025-10-02", status: "Active" },
    { id: 3, title: "Lead Generation Bot", category: "AI", price: 55, date: "2025-09-20", status: "Expired" },
  ];

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
        {data.map((wf) => (
          <WorkflowCard key={wf.id} workflow={wf} />
        ))}
      </div>
    </section>
  );
}


