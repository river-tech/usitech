"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import HeroSection from "../../../../components/shared/Herosection";
import WorkflowTabs from "../../../../components/shared/WorkflowTabs";
import SidebarCard from "../../../../components/shared/SidebarWorkflow";
import CommentsSection from "../../../../components/workflow/CommentsSection";
import WorkflowApi from "@/lib/api/Workflow";
import { DetailWorkflow, RelatedWorkflow } from "@/lib/models/workflow";



export default function WorkflowDetails({ params }: { params: Promise<{ id: string }> }) {
	const { id } = React.use(params); 
    const router = useRouter();
    const workflowApi = WorkflowApi();    
    const [workflowDetail, setWorkflowDetail] = useState<DetailWorkflow | null>(null);
    const [relatedWorkflows, setRelatedWorkflows] = useState<RelatedWorkflow[]>([]);
    const getWorkflow = async () => {
        const result = await workflowApi.getWorkflowDetail(id);
        const relatedResult = await workflowApi.getRelatedWorkflows(id);
        if (result.success) {
            setWorkflowDetail(result.data);
            setRelatedWorkflows(relatedResult.data);
        }
    }

    useEffect(() => {
        getWorkflow();
    }, [id]);
	
    
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Button 
						variant="ghost" 
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#007BFF] hover:bg-transparent"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {workflowDetail && (
                            <>
                                <HeroSection workflow={workflowDetail} />	
                                <WorkflowTabs workflow={workflowDetail} />
                            </>
                        )}
                        {/* Comments Section */}
                        <div className="mt-8">
                            <CommentsSection workflowId={id} />
                        </div>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        {workflowDetail  && (
                            <SidebarCard workflow={workflowDetail} relatedWorkflows={relatedWorkflows} />
                        )}
                    </div>
                </div>
                
            </div>
            {/* Mobile sticky CTA */}
            <div className="lg:hidden fixed bottom-3 inset-x-3 z-30">
                {workflowDetail?.is_buy ? (
                    <Button 
                        disabled
                        className="w-full bg-gray-200 text-gray-500 font-semibold py-3 rounded-xl shadow-lg cursor-not-allowed"
                    >
                        Already bought
                    </Button>
                ) : (
                    <Button 
                        onClick={() => router.push(`/dashboard/checkout/${id}`)} 
                        className="w-full bg-gradient-to-r from-[#007BFF] to-[#06B6D4] text-white font-semibold py-3 rounded-xl shadow-lg"
                    >
                        Buy Now
                    </Button>
                )}
            </div>
        </div>
    );
}
