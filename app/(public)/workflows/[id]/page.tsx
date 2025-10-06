import { notFound } from "next/navigation";
import { workflows } from "../../../../lib/data";

export default function WorkflowDetails({ params }: { params: { id: string } }) {
	const wf = workflows.find((w) => w.id === params.id);
	if (!wf) return notFound();
	return (
		<div className="mx-auto max-w-3xl px-4 py-10">
			<h1 className="text-2xl font-semibold">{wf.title}</h1>
			<p className="mt-2 text-gray-600">Category: {wf.category}</p>
			<p className="mt-4 text-gray-700">{wf.description}</p>
			<div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">Add details UI here later.</div>
		</div>
	);
}
