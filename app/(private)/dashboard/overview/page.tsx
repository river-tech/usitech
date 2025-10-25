"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserApi from "../../../../lib/api/User";
import { Purchase } from "../../../../lib/models/purchase";
import { ArrowLeft, Download, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";

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

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
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
              <p className="text-gray-600">View all your workflow purchases and downloads</p>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-[#002B6B]">
                {purchases.length} {purchases.length === 1 ? 'Purchase' : 'Purchases'}
              </div>
              <div className="text-sm text-gray-600">
                Total: {formatPrice(purchases.reduce((sum, p) => sum + p.amount, 0))}
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
              <Download className="w-8 h-8 text-gray-400" />
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
          <div className="space-y-4">
            {purchases.map((purchase, index) => (
              <motion.div
                key={purchase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[#0F172A]">
                        {purchase.workflow_title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(purchase.status)}`}>
                        {purchase.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Purchase Date:</span>
                        <br />
                        {formatDate(purchase.paid_at || purchase.created_at)}
                      </div>
                      <div>
                        <span className="font-medium">Payment Method:</span>
                        <br />
                        {purchase.payment_method}
                      </div>
                      <div>
                        <span className="font-medium">Amount:</span>
                        <br />
                        <span className="text-lg font-bold text-[#002B6B]">
                          {formatPrice(purchase.amount)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#007BFF] text-[#007BFF] hover:bg-[#EAF2FF]"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#007BFF] hover:bg-[#EAF2FF]"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}