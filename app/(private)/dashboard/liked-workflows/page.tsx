"use client";

import LikedWorkflowList from "../../../../components/dashboard/my-workflows/LikedWorkflowList";
import Link from "next/link";

export default function LikedWorkflowsPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-[#007BFF] text-sm font-medium hover:underline transition mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to dashboard
          </Link>
        </div>
      </div>

      <LikedWorkflowList />
    </div>
  );
}


