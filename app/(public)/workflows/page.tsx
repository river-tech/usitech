import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { workflows } from "../../../lib/data";

export default function WorkflowsPage() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<h1 className="text-2xl font-semibold mb-6">Workflows</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{workflows.map((w) => (
					<Link key={w.id} href={`/workflows/${w.id}`}>
						<Card className="hover:shadow-sm transition-shadow">
							<CardHeader>
								<CardTitle>{w.title}</CardTitle>
								<CardDescription>{w.category}</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600">{w.description}</p>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
