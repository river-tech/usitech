"use client";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";

export default function SearchPage() {
	const [q, setQ] = useState("");
	return (
		<div className="mx-auto max-w-3xl px-4 py-10">
			<h1 className="text-2xl font-semibold mb-4">Search Workflows</h1>
			<Input placeholder="Search templates, categories…" value={q} onChange={(e) => setQ(e.target.value)} />
			<div className="mt-6 grid gap-4">
				<Card><CardContent className="p-4 text-sm text-gray-600">Results will appear here.</CardContent></Card>
			</div>
		</div>
	);
}
