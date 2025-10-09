import * as React from "react";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-[#0F172A]">{title}</h2>
      <button className="text-[#007BFF] text-sm font-medium hover:underline">View All</button>
    </div>
  );
}


