"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Download, Star } from "lucide-react";
import { useWorkflow } from "../../lib/contexts/WorkflowContext";
import WishlistButton from "./WishlistButton";

// Fixed items per page for 1080px screen
function getItemsPerPage() {
	return 10; // Always show 3 items for 1080px
}



export default function FeaturedWorkflowsSlider() {
	const { featuredWorkflows, isLoading } = useWorkflow();
	// IMPORTANT: initialize to 1 to match SSR markup, then update after mount
	const [itemsPerPage, setItemsPerPage] = useState(1);
	const [offset, setOffset] = useState(0); // offset in px
	const containerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<number | null>(null);
	const [itemWidth, setItemWidth] = useState(0);

	// Set items per page after mount and on resize
	useEffect(() => {
		function handleResize() {
			setItemsPerPage(getItemsPerPage());
		}
		handleResize(); // set immediately after mount
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Calculate item width based on container
	useEffect(() => {
		function updateItemWidth() {
			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth;
				setItemWidth(containerWidth / Math.max(itemsPerPage, 1));
			}
		}
		updateItemWidth();
		window.addEventListener("resize", updateItemWidth);
		return () => window.removeEventListener("resize", updateItemWidth);
	}, [itemsPerPage]);

	// Infinite loop: duplicate slides
	// To avoid key duplication, use unique keys for clones
	const total = featuredWorkflows.length;
	const slides = [...featuredWorkflows, ...featuredWorkflows]; // duplicate for seamless loop
	const slideCount = slides.length;

	// Move slide continuously from left to right, slow and always moving, infinite loop
	useEffect(() => {
		if (!featuredWorkflows || featuredWorkflows.length === 0) {
			return;
		}

		let lastTime = performance.now();
		const speed = 0.05; // px per ms - faster for better visibility

		function animate(now: number) {
			const elapsed = now - lastTime;
			lastTime = now;
			setOffset((prev) => {
				let next = prev + speed * elapsed;
				// Use default width if itemWidth is 0
				const effectiveWidth = itemWidth > 0 ? itemWidth : 300; // Default 300px per item
				const totalWidth = effectiveWidth * total;
				if (next >= totalWidth) {
					return next - totalWidth;
				}
				return next;
			});
			animationRef.current = requestAnimationFrame(animate);
		}
		animationRef.current = requestAnimationFrame(animate);
		return () => {
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
		};
	}, [itemWidth, total, featuredWorkflows]);

	// No dots, no hover, just continuous loop

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
		<div className="relative select-none">
			<div className="overflow-hidden w-full h-100" ref={containerRef}>
				<div
					className="flex "
					style={{
						width: `${(slideCount * 100) / Math.max(itemsPerPage, 1)}%`,
						transform: `translateX(-${offset}px)`,
						transition: "none",
					}}
				>
					{slides.map((w, i) => (
						<div
							key={`${w.id}-${i < total ? "main" : "clone"}`}
							className="px-1 py-2 flex-shrink-0 flex-grow-0"
							style={{
								flexBasis: `${100 / Math.max(itemsPerPage, 1)}%`,
								maxWidth: `${100 / Math.max(itemsPerPage, 1)}%`,
								minWidth: 0,
							}}
						>
							<Card className="group bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-300 border border-gray-100 p-4 flex flex-col h-full">
								<div className="flex items-center gap-2 mb-2">
									<div className="icon-placeholder w-6 h-6 bg-gray-200 rounded-full" />
									<span className="text-xs font-semibold text-[#007BFF]">{w.categories?.[0] || "Uncategorized"}</span>
									<span className="ml-auto flex items-center gap-1">
										<Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
										<span className="text-xs text-gray-500">{w.rating_avg?.toFixed(1) || "4.8"}</span>
									</span>
								</div>
								{/* Image/illustration placeholder */}
								<div className="w-full h-28 bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
									{w.image_urls && w.image_urls.length > 0 ? (
										<img src={w.image_urls[0]} alt={w.title} className="object-cover w-full h-full rounded-lg" />
									) : (
										<div className="icon-placeholder w-16 h-16 bg-gray-200 rounded-lg" />
									)}
								</div>
								<h3 className="font-semibold text-base text-[#1A1A1A] mb-1 line-clamp-2">{w.title}</h3>
								<p className="text-gray-600 text-xs flex-1 mb-3 line-clamp-2">{w.description}</p>
								<div className="flex items-center justify-between mt-auto mb-3">
									<div className="flex items-center gap-2">
										<Download className="w-4 h-4 text-gray-500" fill="currentColor" />
										<span className="text-xs text-gray-500">{w.downloads_count || "1.2k"} downloads</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-sm font-semibold text-[#007BFF]">{w.price === 0 ? "Free" : `${w.price} ₫`}</span>
									</div>
								</div>
								<Link href={`/workflows/${w.id}`} className="mt-auto">
									<Button
										variant="default"
										size="sm"
										className="w-full text-xs"
									>
										View Details
									</Button>
								</Link>
							</Card>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}