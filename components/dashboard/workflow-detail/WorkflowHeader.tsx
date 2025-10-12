import { Badge } from "@/components/ui/badge";

interface WorkflowHeaderProps {
  workflow: {
    title: string;
    category: string;
    date: string;
  };
}

export default function WorkflowHeader({ workflow }: WorkflowHeaderProps) {
  return (
    <div className="mb-8 border-b pb-6">
      <h1 className="text-3xl font-bold text-[#0F172A] mb-3">{workflow.title}</h1>
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
          {workflow.category}
        </Badge>
        <span className="text-gray-500 text-sm">
          Purchased on {workflow.date}
        </span>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Active
        </div>
      </div>
    </div>
  );
}
