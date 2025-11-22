"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Download, Star } from "lucide-react";
import { useWorkflow } from "../../lib/contexts/WorkflowContext";



export default function FeaturedWorkflowsSlider() {
	const { featuredWorkflows, isLoading } = useWorkflow();

	// Duplicate slides for seamless infinite loop
	// If we have few workflows, duplicate more times to ensure smooth animation
	const duplicateCount = featuredWorkflows.length < 4 ? 4 : 2;
	const slides = Array(duplicateCount).fill(featuredWorkflows).flat();
	
	console.log("[FeaturedWorkflowsSlider] Workflows count:", {
		original: featuredWorkflows.length,
		duplicated: slides.length,
		duplicateCount
	});

	// Show loading state
	if (isLoading) {
		return (
			<div className="relative select-none">
				<div className="flex justify-center items-center py-20">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
				</div>
			</div>
		);
	}

	// Show empty state
	if (!featuredWorkflows || featuredWorkflows.length === 0) {
		return (
			<div className="relative select-none">
				<div className="flex justify-center items-center py-20">
					<p className="text-gray-500">No featured workflows found</p>
				</div>
			</div>
		);
	}

	return (
		<div className="relative select-none w-full px-1 sm:px-2">
			<div className="overflow-hidden w-full" style={{ minHeight: "400px" }}>
				<div className="workflow-slider-track flex gap-2 sm:gap-3 md:gap-4">
					{slides.map((w, i) => {
						// Calculate unique key: use index to ensure uniqueness across all duplicates
						const uniqueKey = `${w.id}-${i}`;
						return (
						<div
							key={uniqueKey}
							className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px]"
						>
							<Card className="group bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] hover:cursor-pointer transition-all duration-300 border border-gray-100 p-3 sm:p-4 flex flex-col h-full">
								<div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
									<div className="icon-placeholder w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full flex-shrink-0" />
									<span className="text-[10px] sm:text-xs font-semibold text-[#007BFF] truncate flex-1 min-w-0">
										{w.categories?.[0] || "Uncategorized"}
									</span>
									<span className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
										<Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" />
										<span className="text-[10px] sm:text-xs text-gray-500">{w.rating_avg?.toFixed(1) || "4.8"}</span>
									</span>
								</div>
								{/* Image/illustration placeholder */}
								<div className="w-full h-24 sm:h-28 md:h-32 bg-gray-100 rounded-lg mb-2 sm:mb-3 flex items-center justify-center overflow-hidden relative">
									{w.image_urls && w.image_urls.length > 0 ? (
										<Image 
											src={w.image_urls[0]} 
											alt={w.title} 
											fill 
											className="object-cover rounded-lg" 
											sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 16vw"
										/>
									) : (
										<div className="icon-placeholder w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg" />
									)}
								</div>
								<h3 className="font-semibold text-sm sm:text-base text-[#1A1A1A] mb-1 line-clamp-2 min-h-[2.5em]">
									{w.title}
								</h3>
								<p className="text-gray-600 text-[10px] sm:text-xs flex-1 mb-2 sm:mb-3 line-clamp-2 min-h-[2.5em]">
									{w.description}
								</p>
								<div className="flex items-center justify-between mt-auto mb-2 sm:mb-3 gap-2">
									<div className="flex items-center gap-1 sm:gap-2 min-w-0">
										<Download className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
										<span className="text-[10px] sm:text-xs text-gray-500 truncate">
											{w.downloads_count || "1.2k"} downloads
										</span>
									</div>
									<div className="flex items-center gap-2 flex-shrink-0">
										<span className="text-xs sm:text-sm font-semibold text-[#007BFF] whitespace-nowrap">
											{w.price === 0 ? "Free" : `${w.price} ₫`}
										</span>
									</div>
								</div>
								<Link href={`/workflows/${w.id}`} className="mt-auto">
									<Button
										variant="default"
										size="sm"
										className="w-full text-[10px] sm:text-xs py-1.5 sm:py-2"
									>
										View Details
									</Button>
								</Link>
							</Card>
						</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
