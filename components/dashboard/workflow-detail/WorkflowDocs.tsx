import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WorkflowDocs({ docs }: { docs: string[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-[#0F172A]">Documentation</h2>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-medium text-gray-800 mb-3">Quick Start Guide</h3>
          <ul className="space-y-2 text-gray-700">
            {docs.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm">{doc}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            View Online
          </Button>
        </div>
      </div>
    </div>
  );
}
