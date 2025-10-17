import * as React from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export type SimpleWorkflow = {
  id: string | number;
  title: string;
  category?: string;
  price: number;
  date: string;
  status: "Active" | "Expired" | string;
};

export default function WorkflowCard({ workflow }: { workflow: SimpleWorkflow }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#EAF2FF] to-white border border-gray-100 flex items-center justify-center text-[#002B6B] font-bold shadow-sm">IMG</div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-[#0F172A]">{workflow.title}</h3>
            {workflow.category && (
              <Badge variant="secondary" className="text-xs bg-sky-50 text-sky-700">
                {workflow.category}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">Purchased on {workflow.date}</p>
          <Button onClick={() => router.push(`/dashboard/my-workflows/${workflow.id}`)} variant="ghost" size="sm" className="mt-3 flex items-center gap-2 text-gray-700 hover:text-[#007BFF] p-0">
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </Button>
        </div>
      </div>

      <div className="text-right min-w-[96px]">
        <div className="text-lg font-bold text-[#0F172A]">${'{'}workflow.price{'}'}</div>
        <div className="mt-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              workflow.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {workflow.status}
          </span>
        </div>
      </div>
    </div>
  );
}


