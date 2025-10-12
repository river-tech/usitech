"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { ShoppingCart } from "lucide-react";

export type LikedWorkflow = {
  id: string | number;
  title: string;
  category?: string;
  price: number;
  date: string;
  status: "Active" | "Expired" | string;
};

export default function LikedWorkflowCard({ workflow }: { workflow: LikedWorkflow }) {
  const router = useRouter();

  const handleBuyNow = () => {
    // Redirect to workflow detail page
    router.push(`/workflows/${workflow.id}`);
  };

  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200">
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
          <p className="text-sm text-gray-500">Liked on {workflow.date}</p>
          <div className="mt-2">
            <Button 
              onClick={handleBuyNow}
              size="sm" 
              className="flex items-center gap-2 bg-gradient-to-r from-[#007BFF] to-[#06B6D4] text-white hover:from-[#0056CC] hover:to-[#059669] transition-all duration-200"
            >
              <ShoppingCart className="w-4 h-4" /> Buy Now
            </Button>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold text-[#0F172A]">${workflow.price}</div>
        <div className="mt-2">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
            Liked
          </span>
        </div>
      </div>
    </div>
  );
}
