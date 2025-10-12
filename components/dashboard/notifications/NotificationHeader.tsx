import * as React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";

export default function NotificationHeader({
  onClearAll,
  filter,
  setFilter,
  totalUnread,
}: {
  onClearAll: () => void;
  filter: string;
  setFilter: (f: string) => void;
  totalUnread: number;
}) {
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const handleClearAll = () => {
    onClearAll();
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-[#007BFF] text-sm font-medium hover:underline transition mb-2 cursor-pointer"
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
          <h1 className="text-2xl font-bold text-[#0F172A]">Notifications</h1>
          <p className="text-gray-600 text-sm mt-1">
            You have {totalUnread} unread notification{totalUnread !== 1 ? "s" : ""}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            {["All", "Unread"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                  filter === tab
                    ? "bg-white text-[#007BFF] font-medium shadow-sm"
                    : "text-gray-600 hover:text-[#0057D8]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowConfirmModal(true)} className="border-gray-200 hover:bg-gray-50">
            Clear All
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.45)", transition: "background 0.3s" }}
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className={`
              bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl
              transition-all duration-300
              transform
              animate-modal-in
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
              Clear All Notifications
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to clear all notifications? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                className="transition-all duration-200 hover:scale-105"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleClearAll}
                className="transition-all duration-200 hover:scale-105"
              >
                Clear All
              </Button>
            </div>
          </div>
          <style jsx global>{`
            @keyframes modalIn {
              0% {
                opacity: 0;
                transform: translateY(40px) scale(0.96);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .animate-modal-in {
              animation: modalIn 0.32s cubic-bezier(0.4,0,0.2,1);
            }
          `}</style>
        </div>
      )}
    </>
  );
}


