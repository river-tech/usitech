import Link from "next/link";
import * as React from "react";

export default function PurchaseHeader() {
  return (
    <div className="mb-6">
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
      <h1 className="text-2xl font-bold text-[#0F172A]">Purchase History</h1>
      <p className="text-gray-600 text-sm mt-1">
        Review your previous workflow purchases and manage your downloads.
      </p>
    </div>
  );
}


