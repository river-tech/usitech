"use client";
import React, { useRef, useEffect, useState } from "react";
import { workflows } from "../../lib/data";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Download, Star } from "lucide-react";

// Responsive items per page
function getItemsPerPage() {
	if (typeof window === "undefined") return 1;
	if (window.innerWidth >= 1280) return 10; // xl
	if (window.innerWidth >= 1024) return 4; // lg
	if (window.innerWidth >= 768) return 3; // md
	if (window.innerWidth >= 640) return 2; // sm
	return 1;
}

export default function FeaturedWorkflowsSlider() {
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
	const total = workflows.length;
	const slides = [...workflows, ...workflows]; // duplicate for seamless loop
	const slideCount = slides.length;

	// Move slide continuously from left to right, slow and always moving, infinite loop
	useEffect(() => {
		let lastTime = performance.now();
		const speed = 0.02; // px per ms, very slow

		function animate(now: number) {
			const elapsed = now - lastTime;
			lastTime = now;
			setOffset((prev) => {
				let next = prev + speed * elapsed;
				// When offset >= totalWidth/2, reset to 0 for seamless loop
				const totalWidth = itemWidth * total;
				if (totalWidth === 0) return 0;
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
		// eslint-disable-next-line
	}, [itemWidth, total]);

	// No dots, no hover, just continuous loop

	return (
		<div className="relative select-none">
			<div className="overflow-hidden w-full" ref={containerRef}>
				<div
					className="flex"
					style={{
						width: `${(slideCount * 100) / Math.max(itemsPerPage, 1)}%`,
						transform: `translateX(-${offset}px)`,
						transition: "none",
					}}
				>
					{slides.map((w, i) => (
						<div
							key={`${w.id}-${i < total ? "main" : "clone"}`}
							className="px-2 py-10 flex-shrink-0 flex-grow-0"
							style={{
								flexBasis: `${100 / Math.max(itemsPerPage, 1)}%`,
								maxWidth: `${100 / Math.max(itemsPerPage, 1)}%`,
								minWidth: 0,
							}}
						>
							<Card className="group bg-white rounded-2xl shadow-sm hover:shadow-lg hover:scale-102 hover:cursor-pointer hover:shadow-md duration-300  transition-all border border-gray-100 p-6 flex flex-col h-full">
								<div className="flex items-center gap-2 mb-2">
									<div className="icon-placeholder w-6 h-6 bg-gray-200 rounded-full" />
									<span className="text-xs font-semibold text-[#007BFF]">{w.category}</span>
									<span className="ml-auto flex items-center gap-1">
										<Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
										<span className="text-xs text-gray-500">{w.rating ?? "4.8"}</span>
									</span>
								</div>
								{/* Image/illustration placeholder */}
								<div className="w-full h-36 hover:scale-102 hover:cursor-pointer duration-300  bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
									{w.image ? (
										<img src={w.image[0] as string} alt={w.title} className="object-cover w-full h-full rounded-xl" />
									) : (
										<div className="icon-placeholder w-24 h-24 bg-gray-200 rounded-xl" />
									)}
								</div>
								<h3 className="font-bold text-lg text-[#1A1A1A] mb-1">{w.title}</h3>
								<p className="text-gray-600 text-sm flex-1 mb-3">{w.description}</p>
								<div className="flex items-center justify-between mt-auto mb-3">
									<div className="flex items-center gap-2">
										<Download className="w-4 h-4 text-gray-500" fill="currentColor" />
										<span className="text-xs text-gray-500">{w.downloads ?? "1.2k"} downloads</span>
									</div>
									<span className="text-sm font-semibold text-[#007BFF]">{w.price===0 ? "Free" : `$${w.price}`}</span>
								</div>
								<Link href={`/workflows/${w.id}`} className="mt-auto">
									<Button
										// className="w-full rounded-xl bg-gradient-to-r from-[#007BFF] to-[#0057D8] text-white font-medium py-2 hover:from-[#339CFF] hover:to-[#3388FF] shadow transition"
                                        variant="default"
                                        size="lg"
                                        className="w-full"
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