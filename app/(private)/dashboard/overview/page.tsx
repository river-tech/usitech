"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserApi from "../../../../lib/api/User";
import { Purchase } from "../../../../lib/models/purchase";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { PurchaseStatus } from "@/lib/models/enums";

// --- ENUM STATUS





function getStatusStyle(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
    case "paid":
      return {
        color: "text-green-700",
        bg: "bg-green-100",
        border: "border-green-200"
      };
    case "pending":
      return {
        color: "text-yellow-700",
        bg: "bg-yellow-100",
        border: "border-yellow-200"
      };
    case "failed":
    case "cancelled":
      return {
        color: "text-red-700",
        bg: "bg-red-100",
        border: "border-red-200"
      };
    default:
      return {
        color: "text-gray-700",
        bg: "bg-gray-100",
        border: "border-gray-200"
      };
  }
}

export default function OverviewPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const userApi = UserApi();

  useEffect(() => {
    const loadPurchases = async () => {
      setLoading(true);
      try {
        const result = await userApi.getMyPurchases();
        if (result.success) {
          setPurchases(result.data);
        } else {
          setError(result.error || "Failed to load purchases");
        }
      } catch (error) {
        console.log('Failed to load purchases:', error);
        setError("Failed to load purchases");
      } finally {
        setLoading(false);
      }
    };
    loadPurchases();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF2FF] via-[#F8FAFC] to-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[#007BFF] hover:text-[#0056CC] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#002B6B] mb-2">Purchase History</h1>
              <p className="text-gray-600">View all your workflow purchases</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#002B6B]">
                {purchases.length} {purchases.length === 1 ? 'Purchase' : 'Purchases'}
              </div>
              <div className="text-sm text-gray-600">
                Total: {purchases.reduce((sum, p) => sum + p.amount, 0)}đ
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading purchases...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-600 font-medium mb-2">Error Loading Purchases</div>
            <div className="text-red-500 text-sm">{error}</div>
          </div>
        ) : purchases.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-gray-600 font-medium mb-2">No Purchases Yet</div>
            <div className="text-gray-500 text-sm mb-6">You haven't purchased any workflows yet.</div>
            <Link href="/workflows">
              <Button className="bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white rounded-xl px-6">
                Browse Workflows
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase, index) => {
              const status = purchase.status || '';
              const style = getStatusStyle(status);
              return (
                <motion.div
                  key={purchase.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: index * 0.04 }}
                  className="relative"
                >
                  <div
                    className={`flex items-center justify-between rounded-2xl border ${style.border} shadow-sm hover:shadow-lg transition-all duration-200 bg-white px-7 py-6`}
                  >
                    {/* Thumbnail & Main Info */}
                    <div className="flex items-center gap-5 min-w-0 flex-1">
                      <div className="rounded-xl h-14 w-14 flex items-center justify-center bg-gradient-to-br from-[#EAF2FF] to-white border border-gray-200 text-[#002B6B] font-bold text-2xl select-none uppercase shadow-sm shrink-0">
                        {purchase.workflow_title ? purchase.workflow_title[0] : "?"}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-4 mb-1 min-w-0">
                          <h3 className="text-lg font-semibold text-[#062855] truncate max-w-[260px] md:max-w-[370px] leading-tight">{purchase.workflow_title}</h3>
                          <span className={`flex items-center capitalize px-3 py-1 rounded-full text-xs font-semibold border transition
                            ${status === PurchaseStatus.ACTIVE
                              ? "bg-green-50 text-green-700 border-green-100"
                              : status === PurchaseStatus.PENDING
                                ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                                : "bg-red-50 text-red-700 border-red-100"
                            }`}>
                            {status === PurchaseStatus.ACTIVE
                              ? "Active"
                              : status === PurchaseStatus.PENDING
                                ? "Pending"
                                : "Rejected"}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          Purchased on <span className="font-medium text-gray-600">{formatDate(purchase.paid_at || purchase.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* View Details Button */}
                    <div className="flex flex-col items-end justify-between pl-6 ml-2 min-w-[140px]">
                      <div className="text-lg text-[#002B6B] font-bold leading-tight mb-2">{purchase.amount}<span className="text-sm font-medium ml-0.5">đ</span></div>
                      <Link href={`/dashboard/checkout/${purchase.id}/invoice`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2 text-[#007BFF] hover:bg-blue-50 hover:text-[#0056b3] px-2.5 rounded-xl font-semibold transition"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}