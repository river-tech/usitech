"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import UserApi from "../../../../lib/api/User";
import { PurchasedWorkflow } from "../../../../lib/models/purchased-workflow";
import { ArrowLeft, Eye, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";
import { useWishlist } from "../../../../lib/contexts/WishlistContext";

export default function LikedWorkflowsPage() {
  const [workflows, setWorkflows] = useState<PurchasedWorkflow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const userApi = useMemo(() => UserApi(), []);
  const router = useRouter();
  const { removeFromWishlist } = useWishlist();

  useEffect(() => {
    const loadWorkflows = async () => {
      setLoading(true);
      try {
        const result = await userApi.getMyWishlist();
        if (result.success) {
          setWorkflows(result.data);
        } else {
          setError(result.error || "Failed to load wishlist");
        }
      } catch {
        setError("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };
    
    loadWorkflows();
  }, [userApi]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleViewDetails = (workflowId: string) => {
    router.push(`/workflows/${workflowId}`);
  };

  const handlePurchase = (workflowId: string) => {
    router.push(`/workflows/${workflowId}`);
  };

  const handleRemoveFromWishlist = async (workflowId: string) => {
    try {
      const result = await removeFromWishlist(workflowId);
      if (result.success) {
        // Remove from local state
        setWorkflows(prev => prev.filter(w => w.id !== workflowId));
      }
    } catch {
      // Error removing from wishlist
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
              <h1 className="text-3xl font-bold text-[#002B6B] mb-2">My Wishlist</h1>
              <p className="text-gray-600">Workflows you&apos;ve saved for later</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#002B6B]">
                {workflows.length} {workflows.length === 1 ? 'Item' : 'Items'}
              </div>
              <div className="text-sm text-gray-600">
                Total Value: {formatPrice(workflows.reduce((sum, w) => sum + w.price, 0))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading wishlist...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-600 font-medium mb-2">Error Loading Wishlist</div>
            <div className="text-red-500 text-sm">{error}</div>
          </div>
        ) : workflows.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-gray-600 font-medium mb-2">Your Wishlist is Empty</div>
            <div className="text-gray-500 text-sm mb-6">Start exploring workflows and add them to your wishlist.</div>
            <Link href="/workflows">
              <Button className="bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white rounded-xl px-6">
                Browse Workflows
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {workflows.map((workflow, index) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.33, delay: index * 0.07 }}
                className="relative flex bg-white rounded-3xl border border-blue-100 px-6 py-5 shadow-lg hover:shadow-2xl hover:border-blue-300 transition-all duration-350 items-center group"
                style={{ minHeight: 112 }}
              >
                {/* Thumbnail with overlay */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow shrink-0 mr-6 flex items-center justify-center bg-gradient-to-br from-[#ddeaff] to-[#f4f8ff]">
                  <span className="text-3xl select-none text-blue-200 font-semibold">IMG</span>
                
                </div>

                {/* Info Block */}
                <div className="flex-1 min-w-0 flex flex-col gap-1 justify-center">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="text-lg font-semibold text-[#062855] truncate max-w-[150px] md:max-w-[240px]">
                      {workflow.title}
                    </h3>
                   
                  </div>
                  <div className="text-gray-500 text-sm truncate max-w-[260px] md:max-w-[400px]">
                    {workflow.description || "No description provided."}
                  </div>
                  {workflow.categories && workflow.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {workflow.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="inline-block bg-blue-100 text-[#1764b1] text-[11px] font-semibold rounded-full px-2 py-0.5"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price & Actions */}
                <div className="flex flex-col items-end min-w-[145px] ml-5 gap-3 self-stretch justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gradient bg-gradient-to-r from-[#2487ff] to-[#013374] bg-clip-text text-transparent drop-shadow-lg">
                      {formatPrice(workflow.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleViewDetails(workflow.id)}
                      variant="ghost"
                      className="flex items-center gap-2 px-2 h-8 text-sm font-medium rounded-lg text-[#13409f] hover:bg-blue-50 border-none shadow-none"
                    >
                      <Eye className="w-5 h-5" />
                      View
                    </Button>
                    <Button
                      onClick={() => handlePurchase(workflow.id)}
                      className="flex items-center gap-2 px-4 h-8 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#144299] to-[#41a4ff] text-white hover:brightness-110 transition"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Purchase
                    </Button>
                    <Button
                      onClick={() => handleRemoveFromWishlist(workflow.id)}
                      variant="outline"
                      className="flex items-center gap-2 px-3 h-8 text-sm font-semibold rounded-lg text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                {/* Remove Btn */}
            
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
