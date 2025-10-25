"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserApi from "../../../../lib/api/User";
import { PurchasedWorkflow } from "../../../../lib/models/purchased-workflow";
import { ArrowLeft, Eye, Heart, Star, Clock, Users, Play, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";

export default function LikedWorkflowsPage() {
  const [workflows, setWorkflows] = useState<PurchasedWorkflow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const userApi = UserApi();
  const router = useRouter();

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
      } catch (error) {
        console.log('Failed to load wishlist:', error);
        setError("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };
    
    loadWorkflows();
  }, []);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleViewDetails = (workflowId: string) => {
    router.push(`/workflows/${workflowId}`);
  };

  const handlePurchase = (workflowId: string) => {
    // TODO: Implement purchase functionality
    console.log('Purchase workflow:', workflowId);
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
              <p className="text-gray-600">Workflows you've saved for later</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((workflow, index) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2 line-clamp-2">
                      {workflow.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        Wishlist
                      </span>
                      {workflow.categories && workflow.categories.length > 0 && (
                        <span className="text-xs text-[#0a637a] bg-[#d7f6ff] px-2 py-1 rounded-full">
                          {workflow.categories[0]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#002B6B]">
                      {formatPrice(workflow.price)}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {workflow.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-600">{workflow.rating_avg.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">{workflow.downloads_count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">{workflow.time_to_setup}min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-600">Demo</span>
                  </div>
                </div>

                {/* Features */}
                {workflow.features && workflow.features.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Key Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {workflow.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {workflow.features.length > 3 && (
                        <span className="text-xs text-gray-500">+{workflow.features.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleViewDetails(workflow.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-[#007BFF] text-[#007BFF] hover:bg-[#EAF2FF]"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    onClick={() => handlePurchase(workflow.id)}
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white hover:brightness-110"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Purchase
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}