import Link from "next/link";
import Image from "next/image";
import { workflows } from "../../lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Star, Clock } from "lucide-react";

export function SimilarWorkflows({ currentWorkflow }: any) {
	const similar = workflows
		.filter((w: any) => w.category === currentWorkflow.category && w.id !== currentWorkflow.id)
		.slice(0, 3);
	
	if (similar.length === 0) return null;
	
	return (
		<section className="mt-16">
			<h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Workflows</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{similar.map((workflow: any) => (
					<Link key={workflow.id} href={`/workflows/${workflow.id}`} className="cursor-pointer">
						<Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
							<div className="aspect-video bg-gradient-to-br from-[#007BFF] to-[#06b6d4] rounded-t-lg flex items-center justify-center">
								<Image
									src={workflow.image || "/placeholder-workflow.png"}
									alt={`${workflow.title} workflow automation template`}
									width={300}
									height={200}
									className="object-cover rounded-t-lg"
								/>
							</div>
							<CardHeader className="pb-3">
								<div className="flex items-center justify-between mb-2">
									<span className="text-xs font-medium text-[#007BFF] bg-[#007BFF]/10 px-2 py-1 rounded-full">
										{workflow.category}
									</span>
									<div className="flex items-center gap-1">
										<Star className="w-4 h-4 text-yellow-400 fill-current" />
										<span className="text-sm font-medium">{workflow.rating}</span>
									</div>
								</div>
								<CardTitle className="text-lg group-hover:text-[#007BFF] transition-colors">
									{workflow.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<p className="text-sm text-gray-600 line-clamp-2">{workflow.description}</p>
								<div className="flex items-center justify-between mt-3 text-sm text-gray-500">
									<span className="flex items-center gap-1">
										<Clock className="w-3 h-3" />
										{workflow.timeToSetup}
									</span>
									<span className="font-medium text-[#007BFF]">{workflow.price}</span>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</section>
	);
}
