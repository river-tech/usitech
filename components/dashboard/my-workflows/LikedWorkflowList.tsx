import * as React from "react";
import SectionHeader from "./SectionHeader";
import WorkflowCard, { type SimpleWorkflow } from "./WorkflowCard";

export default function LikedWorkflowList({ items }: { items?: SimpleWorkflow[] }) {
  const data: SimpleWorkflow[] = items ?? [
    { id: "L1", title: "Email Campaign Optimizer", category: "Marketing", price: 49, date: "2025-08-10", status: "Active" },
    { id: "L2", title: "Data Visualization Toolkit", category: "Analytics", price: 59, date: "2025-07-15", status: "Active" },
  ];

  return (
    <section className="mt-10">
      <SectionHeader title="Workflows You Liked" />
      <div className="grid gap-4 md:grid-cols-2">
        {data.map((wf) => (
          <WorkflowCard key={wf.id} workflow={wf} />
        ))}
      </div>
    </section>
  );
}


