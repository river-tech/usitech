"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  WorkflowHeader,
  WorkflowVideo,
  WorkflowDocs,
  ThankYouCard,
} from "@/components/dashboard/workflow-detail";
import WorkflowApi from "@/lib/api/Workflow";
import { DetailWorkflow } from "@/lib/models/workflow";

export default function WorkflowDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const workflowApi = WorkflowApi();
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);
  const [workflow, setWorkflow] = useState<DetailWorkflow | null>(null);
  const getWorkflow = async () => {
    const result = await workflowApi.getWorkflowDetail(id);
    if (result.success) {
      setWorkflow(result.data);
    }
  }

  useEffect(() => {
    getWorkflow();
  }, [id]);

  // Download JSON file
  const handleDownloadJSON = async () => {
    if (!workflow) return;
    
    setIsDownloading(true);
    try {
      const jsonData = workflow.flow;
      const jsonString = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${workflow.title.replace(/\s+/g, '_')}_workflow.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      // Error downloading JSON
    } finally {
      setIsDownloading(false);
    }
  };

  if (!workflow) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Workflow Not Found</h2>
          <p className="text-gray-600 mb-6">
            This workflow doesn&apos;t exist or you don&apos;t have access to it.
          </p>
          <Button 
            onClick={() => router.push("/dashboard/my-workflows")}
            className="bg-[#007BFF] hover:bg-[#0056CC] text-white"
          >
            Back to My Workflows
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-[#007BFF] hover:bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="h-6 w-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">Workflow Detail</span>
        </div>

        {/* Workflow Header */}
        <WorkflowHeader workflow={{ title: workflow?.title || "", category: workflow?.categories[0] || "", date: workflow?.created_at || "" }} />

        {/* Video Section */}
        <WorkflowVideo url={workflow?.video_demo || ""} />

        {/* Docs Section */}
        {/* <WorkflowDocs docs={workflow.docs} /> */}

        {/* JSON Download Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#06B6D4] rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Workflow JSON Export</h3>
                <p className="text-sm text-gray-600">Download workflow configuration as JSON file</p>
              </div>
            </div>
            <Button
              onClick={handleDownloadJSON}
              disabled={isDownloading}
              className="bg-gradient-to-r from-[#007BFF] to-[#06B6D4] hover:from-[#0056CC] hover:to-[#059669] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Get JSON Now
                </>
              )}
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs font-bold">i</span>
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">What's included in the JSON file:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Complete workflow configuration</li>
                  <li>Documentation links and resources</li>
                  <li>Video tutorial references</li>
                  <li>Metadata and version information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Thank You Card */}
        <ThankYouCard />
      </div>
    </div>
  );
}
