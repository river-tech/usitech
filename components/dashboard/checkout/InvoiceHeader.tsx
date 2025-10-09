
import Link from "next/link";

export default function InvoiceHeader() {
  return (
    <>
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
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Invoice</h1>
        <p className="text-gray-600 text-sm">Thank you for your purchase!</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">UsITech Ltd.</p>
        <p className="text-sm text-gray-500">support@usitech.io.vn</p>
      </div>
    </div>
    </>
  );
}


