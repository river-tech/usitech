import * as React from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Download, Eye } from "lucide-react";
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
    <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#EAF2FF] to-white border border-gray-100 flex items-center justify-center text-[#002B6B] font-bold shadow-sm">IMG</div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-[#0F172A]">{workflow.title}</h3>
            {workflow.category && (
              <Badge variant="secondary" className="text-xs bg-sky-50 text-sky-700">
                {workflow.category}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">Purchased on {workflow.date}</p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-200 hover:bg-sky-50">
          <Download className="w-4 h-4" /> Download
        </Button>
        <Button onClick={() => router.push(`/workflows/${workflow.id}`)} variant="ghost" size="sm" className="flex items-center gap-2 text-[#007BFF] hover:text-[#0057D8]">
          <Eye className="w-4 h-4" /> View Details
        </Button>
      </div>
    </div>
  );
}


