import { useState } from "react";
import { CheckCircle, Eye, Star, Zap } from "lucide-react";
import { DetailWorkflow } from "@/lib/models/workflow";

export default function WorkflowTabs({ workflow }: { workflow: DetailWorkflow }) {
    const tabs = [
        { name: "Overview", icon: Eye },
        { name: "Features", icon: Zap }
    ] as const;
    const [active, setActive] = useState<string>("Overview");
    
    return (
        <section className="mt-6">
            <div className="flex gap-1 p-1 rounded-lg ">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.name}
                            onClick={() => setActive(tab.name)}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                                active === tab.name 
                                    ? "bg-white text-gray-900 shadow-md" 
                                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.name}
                        </button>
                    );
                })}
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mt-4">
                {active === "Overview" && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Workflow</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {workflow?.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {(workflow?.features || []).map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{tag}</span>
                            ))}
                        </div>
                    </div>
                )}
                {active === "Features" && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(workflow?.features || []).map((feature, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}