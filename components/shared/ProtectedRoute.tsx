"use client";
import * as React from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto max-w-3xl px-4 py-16 text-center">
			<div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
				<h1 className="text-xl font-semibold mb-2">Login to access this page</h1>
				<p className="text-gray-600">This route is protected. Add your auth logic later.</p>
			</div>
			<div className="mt-6 text-sm text-gray-600">Replace this component with real auth checks when ready.</div>
		</div>
	);
}
