import * as React from "react";
import SectionHeader from "./SectionHeader";
import LikedWorkflowCard, { type LikedWorkflow } from "./LikedWorkflowCard";

export default function LikedWorkflowList({ items }: { items?: LikedWorkflow[] }) {
  const data: LikedWorkflow[] = items ?? [
    { id: "L1", title: "Email Campaign Optimizer", category: "Marketing", price: 49, date: "2025-08-10", status: "Liked" },
    { id: "L2", title: "Data Visualization Toolkit", category: "Analytics", price: 59, date: "2025-07-15", status: "Liked" },
    { id: "L3", title: "Social Media Automation", category: "Marketing", price: 35, date: "2025-09-28", status: "Liked" },
    { id: "L4", title: "Lead Generation Bot", category: "AI", price: 55, date: "2025-09-20", status: "Liked" },
  ];

  return (
    <section className="mt-10">
      <SectionHeader title="Workflows You Liked" />
      <div className="grid gap-4 md:grid-cols-2">
        {data.map((wf) => (
          <LikedWorkflowCard key={wf.id} workflow={wf} />
        ))}
      </div>
    </section>
  );
}


