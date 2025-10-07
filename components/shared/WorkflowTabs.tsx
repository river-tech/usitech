import { useMemo, useState } from "react";
import { CheckCircle, Eye, Star, Zap } from "lucide-react";
import { workflowReviews, workflowOverviews, workflowFeatures } from "../../lib/data";

export default function WorkflowTabs({ workflow }: any) {
    const tabs = [
        { name: "Overview", icon: Eye },
        { name: "Features", icon: Zap },
        { name: "Reviews", icon: Star }
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
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
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
                            {workflowOverviews[workflow.id]?.about || `This ${workflow.category.toLowerCase()} automation streamlines processes and improves efficiency.`}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {(workflowOverviews[workflow.id]?.tags || [workflow.category.toLowerCase(), "automation", "workflow"]).map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{tag}</span>
                            ))}
                        </div>
                    </div>
                )}
                {active === "Features" && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(workflowFeatures[workflow.id] || []).map((feature, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {active === "Reviews" && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">{workflow.rating} average rating</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {(workflowReviews[workflow.id] || []).map((review, idx) => (
                                <div key={idx} className={`pb-6 ${idx !== (workflowReviews[workflow.id] || []).length - 1 ? "border-b border-gray-100" : ""}`}>
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-medium text-gray-900">{review.name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">{review.date}</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}