"use client";
import { PurchaseStatus } from "@/lib/models/enums";
import { Invoice } from "@/lib/models/workflow";

export default function InvoiceCard({ invoice }: { invoice: Invoice }) {

  const statusColor =
    invoice?.status === PurchaseStatus.PENDING || invoice?.status === "PENDING"
      ? "text-yellow-600"
      : invoice?.status === PurchaseStatus.ACTIVE || invoice?.status === "ACTIVE"
      ? "text-green-600"
      : "text-gray-500";

  // Company Info (static)
  const company = {
    name: "UsITech Ltd.",
    email: "support@usitech.io.vn",
    address: "123 Tech Street, HCMC",
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-100 border border-indigo-200 rounded-2xl shadow-lg p-6 space-y-6 max-w-3xl mx-auto animate-fade-in transition-all duration-500">
      {/* Invoice Header */}
      <div className="flex justify-between items-start border-b pb-4 relative">
        {/* Accent underline */}
        <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-blue-400/70 via-indigo-500/60 to-transparent rounded-full pointer-events-none blur-md animate-pulse" />
        <div>
          <h3 className="text-xl font-bold text-indigo-700 tracking-wide drop-shadow-[0_1px_0_rgba(63,131,248,0.10)] animate-slide-in">
            Sales Invoice
          </h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            Status:{" "}
            <span
              className={`font-medium ${statusColor} px-2 py-0.5 rounded-full shadow-sm bg-indigo-50/60`}
              style={{ transition: 'background 0.3s, color 0.3s' }}
            >
              {invoice?.status}
            </span>
          </p>
        </div>
      </div>

      {/* Billing/Company Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="animate-fade-in-up delay-100">
          <h4 className="font-semibold text-indigo-900 mb-3">Billing Information</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-blue-800 font-semibold">Name:</span>{" "}
              <span className="font-medium text-gray-800">
                {invoice?.billing_name ?? "—"}
              </span>
            </p>
            <p>
              <span className="text-blue-800 font-semibold">Email:</span>{" "}
              <span className="font-medium text-gray-800">
                {invoice?.billing_email ?? "—"}
              </span>
            </p>
            {/* Additional fields such as phone can be added here if available */}
          </div>
        </div>
        <div className="animate-fade-in-up delay-150">
          <h4 className="font-semibold text-indigo-900 mb-3">Company Information</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-blue-800 font-semibold">Company:</span>{" "}
              <span className="font-medium text-gray-800">UsITech Ltd.</span>
            </p>
            <p>
              <span className="text-blue-800 font-semibold">Email:</span>{" "}
              <span className="font-medium text-gray-800">support@usitech.io.vn</span>
            </p>
            <p>
              <span className="text-blue-800 font-semibold">Address:</span>{" "}
              <span className="font-medium text-gray-800">123 Tech Street, HCMC</span>
            </p>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="animate-fade-in-up delay-200">
        <h4 className="font-semibold text-indigo-900 mb-3">Product details</h4>
        <div className="border border-indigo-100 rounded-lg overflow-hidden shadow transition-all hover:shadow-md hover:border-indigo-300 bg-white/90">
          <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100">
            <div className="flex justify-between items-center">
              <span className="font-medium text-indigo-700">Product</span>
              <span className="font-medium text-indigo-700">Price</span>
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-medium text-indigo-900 animate-pop">
                  {invoice?.workflow?.title ?? "—"}
                </h5>
                <p className="text-sm text-gray-600">
                  {(invoice?.workflow?.categories?.[0] ?? "—") +
                    " • ID: " +
                    (invoice?.workflow?.id ?? "—")}
                </p>
              </div>
              <span className="font-semibold text-indigo-700 text-lg animate-scale-in">
                {Number(invoice?.workflow?.price ?? 0).toLocaleString("vi-VN")} đ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-100 to-white rounded-lg p-4 animate-fade-in-up delay-300">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-indigo-900">Total:</span>
          <span className="text-2xl font-extrabold text-indigo-700 drop-shadow animate-scale-in">
            {Number(invoice?.amount ?? 0).toLocaleString("vi-VN")} đ
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <div>Payment method: <span className="font-medium text-indigo-700">Bank transfer</span></div>
          <div>
            Status:{" "}
            <span
              className={`font-medium ${statusColor} bg-indigo-50 px-2 py-0.5 rounded-full inline-block shadow-sm animate-pulse`}
              style={{ transition: 'background 0.3s, color 0.3s' }}
            >
              {invoice?.status}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-indigo-100 text-center animate-fade-in-up delay-400">
        <div className="text-sm text-indigo-700 mb-2 font-medium animate-pop">
          Thank you for choosing and using our service!
        </div>
        <div className="text-sm text-gray-500">
          Need support? Contact:{" "}
          <a
            href="mailto:support@usitech.io.vn"
            className="text-indigo-600 font-semibold hover:underline transition-colors duration-200"
          >
            support@usitech.io.vn
          </a>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-fade-in-up {
          animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
        .delay-100 { animation-delay: .15s }
        .delay-150 { animation-delay: .22s }
        .delay-200 { animation-delay: .30s }
        .delay-300 { animation-delay: .39s }
        .delay-400 { animation-delay: .48s }
        @keyframes pop {
          0% { transform: scale(0.98);}
          60% { transform: scale(1.06);}
          90% { transform: scale(1);}
        }
        .animate-pop { animation: pop .7s cubic-bezier(0.7,0,0.3,1) both; }
        @keyframes scale-in {
          0% { transform: scale(0.85);}
          100% { transform: scale(1);}
        }
        .animate-scale-in { animation: scale-in .35s .2s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes slide-in {
          from { transform: translateX(-10px); opacity:0.6;}
          to { transform: none; opacity:1;}
        }
        .animate-slide-in { animation: slide-in .65s cubic-bezier(0.4,0,0.2,1) both;}
      `}
      </style>
    </div>
  );
}

