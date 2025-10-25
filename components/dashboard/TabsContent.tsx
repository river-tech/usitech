"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
} from "lucide-react";
import { Button } from "../ui/button";
import { type Tab } from "./TabsHeader";
import Link from "next/link";
import { ActivityItem } from "./RecentActivity";
import { useRouter } from "next/navigation";
import { NotificationType, UserProfile } from "../../lib/models";
import LikedWorkflowList from "./my-workflows/LikedWorkflowList";
import { useEffect, useState } from "react";
import { uploadAvatar } from "../../lib/api/UploadFile";
import UserApi from "../../lib/api/User";
import { Purchase } from "../../lib/models/purchase";
import { PurchasedWorkflow } from "../../lib/models/purchased-workflow";
import { Notification } from "../../lib/models/notification";
import { useUser } from "../../lib/contexts/UserContext";
import NotificationApi from "../../lib/api/Notification";
export type PurchaseItem = {
  id: string;
  name: string;
  date: string; // ISO or display string
  price: string; // formatted
  status: "Active" | "Expired";
  category?: string;
  thumbnailUrl?: string;
};

const recent: ActivityItem[] = [
  {
    id: "1",
    name: "CRM Data Sync",
    date: "2025-10-02",
    price: "$79",
    status: "Paid",
  },
  {
    id: "2",
    name: "Social Media Automation",
    date: "2025-09-28",
    price: "$35",
    status: "Pending",
  },
  {
    id: "3",
    name: "Lead Generation Bot",
    date: "2025-09-20",
    price: "$55",
    status: "Rejected",
  },
];

export type NotificationItem = {
  id: string;
  title: string;
  body?: string;
  time: string; // e.g. 2 hours ago
  highlight?: boolean;
  type?: NotificationType;
};

interface TabsContentProps {
  activeTab: Tab;
  purchases: PurchaseItem[];
  notifications: NotificationItem[];
  profile: UserProfile;
}

const fade: React.ComponentProps<typeof motion.div>["variants"] = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function TabsContent({
  activeTab,
  purchases,
  notifications,
  profile,
}: TabsContentProps) {
  console.log(activeTab);
  useEffect(() => {
    console.log(profile);
  }, [profile]);
  const router = useRouter();
  const { userName, setUserName } = useUser();
  useEffect(() => {
    setUserName(profile.name || "");
  }, [profile.name]);
  const [name, setName] = useState<string>(userName || "");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [apiPurchases, setApiPurchases] = useState<Purchase[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState<boolean>(false);
  const [purchasedWorkflows, setPurchasedWorkflows] = useState<PurchasedWorkflow[]>([]);
  const [loadingWorkflows, setLoadingWorkflows] = useState<boolean>(false);
  const [wishlistWorkflows, setWishlistWorkflows] = useState<PurchasedWorkflow[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState<boolean>(false);
  const [apiNotifications, setApiNotifications] = useState<Notification[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState<boolean>(false);
  const user = UserApi();
  const notificationApi = NotificationApi();

  // Load purchases from API
  useEffect(() => {
    const loadPurchases = async () => {
      setLoadingPurchases(true);
      try {
        const result = await user.getMyPurchases();
        if (result.success) {
          setApiPurchases(result.data);
        }
      } catch (error) {
        console.log('Failed to load purchases:', error);
      } finally {
        setLoadingPurchases(false);
      }
    };
    
    loadPurchases();
  }, []);

  // Load purchased workflows from API
  useEffect(() => {
    const loadWorkflows = async () => {
      setLoadingWorkflows(true);
      try {
        const result = await user.getMyPurchasedWorkflows();
        if (result.success) {
          setPurchasedWorkflows(result.data);
        }
      } catch (error) {
        console.log('Failed to load purchased workflows:', error);
      } finally {
        setLoadingWorkflows(false);
      }
    };
    
    loadWorkflows();
  }, []);

  // Load wishlist from API
  useEffect(() => {
    const loadWishlist = async () => {
      setLoadingWishlist(true);
      try {
        const result = await user.getMyWishlist();
        if (result.success) {
          setWishlistWorkflows(result.data);
        }
      } catch (error) {
        console.log('Failed to load wishlist:', error);
      } finally {
        setLoadingWishlist(false);
      }
    };
    
    loadWishlist();
  }, []);

  // Load notifications from API
  useEffect(() => {
    const loadNotifications = async () => {
      setLoadingNotifications(true);
      try {
        const result = await notificationApi.getMyNotifications();
        if (result.success) {
          setApiNotifications(result.data);
        }
      } catch (error) {
        console.log('Failed to load notifications:', error);
      } finally {
        setLoadingNotifications(false);
      }
    };
    
    loadNotifications();
  }, []);

  const handleSaveChanges = async () => {
    setLoading(true);
    const result = await user.updateUserProfile(name, profile.avatar_url || "");
    if (result.success) {
      setSuccess("Account settings updated successfully");
      setUserName(name);
      setLoading(false);
      router.refresh();
    } else {
      setError("Failed to update account settings");
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div className="mt-6">
      <AnimatePresence mode="wait">
        {activeTab === "overviews" && (
          <motion.div
            key="overview"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={fade}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#0F172A]">
                  Recent Activity
                </h3>
                <Link
                  href="/dashboard/overview"
                  className="text-sm text-[#007BFF] hover:underline cursor-pointer"
                >
                  View All
                </Link>
              </div>

              {loadingPurchases ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-600">Loading purchases...</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-600">
                        <th className="py-2">Workflow</th>
                        <th className="py-2">Purchase Date</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiPurchases.length > 0 ? (
                        apiPurchases.slice(0, 5).map((purchase, idx) => (
                          <motion.tr
                            key={purchase.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="border-t border-gray-100"
                          >
                            <td className="py-3 font-medium text-[#0F172A]">
                              {purchase.workflow_title}
                            </td>
                            <td className="py-3 text-gray-600">
                              {new Date(purchase.paid_at || purchase.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 text-gray-600">
                              ${purchase.amount.toFixed(2)}
                            </td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  purchase.status === "completed" || purchase.status === "paid"
                                    ? "bg-green-100 text-green-700"
                                    : purchase.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {purchase.status}
                              </span>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr className="bg-blue-50">
                          <td colSpan={4} className="py-8 text-center text-gray-500 rounded-2xl">
                            No purchases found yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
        {activeTab === "workflows" && (
          <motion.div
            key="workflows"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={fade}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#0F172A]">
                My Workflows
              </h2>
              <Link
                href="/dashboard/my-workflows"
                className="text-sm text-[#007BFF] hover:underline cursor-pointer"
              >
                View all
              </Link>
            </div>
            {loadingWorkflows ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Loading workflows...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {purchasedWorkflows.length > 0 ? (
                  purchasedWorkflows.slice(0, 3).map((workflow) => (
                    <div
                      key={workflow.id}
                      className="bg-white border border-gray-200 rounded-2xl p-3 md:p-4 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                          <span className="text-sm text-gray-400">IMG</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base md:text-lg font-semibold text-[#0F172A]">
                              {workflow.title}
                            </h3>
                            {workflow.categories && workflow.categories.length > 0 && (
                              <span className="text-[10px] md:text-xs font-semibold text-[#0a637a] bg-[#d7f6ff] px-2 py-0.5 rounded-full">
                                {workflow.categories[0]}
                              </span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-gray-600 mt-0.5 line-clamp-2">
                            {workflow.description}
                          </p>
                          <div className="mt-2 flex items-center gap-4">
                            <Button
                              onClick={() =>
                                router.push(`/dashboard/my-workflows/${workflow.id}`)
                              }
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-2 text-[#007BFF] hover:text-[#0057D8] border-none bg-transparent p-0 shadow-none hover:bg-sky-50 transition-colors rounded-lg"
                            >
                              <Eye className="w-4 h-4" />
                              <span className="font-medium">View Details</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right min-w-[72px]">
                        <div className="text-base md:text-lg font-bold text-[#0F172A]">
                          ${workflow.price.toFixed(2)}
                        </div>
                        <div className="mt-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold ${
                              workflow.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {workflow.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-blue-50 rounded-2xl p-8 text-center">
                    <div className="text-gray-500">No purchased workflows found yet.</div>
                  </div>
                )}
              </div>
            )}
            {/** Liked workflows moved to its own tab */}
          </motion.div>
        )}

        {activeTab === "liked" && (
          <motion.div
            key="liked"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={fade}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#0F172A]">
                Workflows You Liked
              </h2>
              <Link
                href="/dashboard/liked-workflows"
                className="text-sm text-[#007BFF] hover:underline cursor-pointer"
              >
                View all
              </Link>
            </div>
            {loadingWishlist ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Loading wishlist...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {wishlistWorkflows.length > 0 ? (
                  wishlistWorkflows.slice(0, 3).map((workflow) => (
                    <div
                      key={workflow.id}
                      className="bg-white border border-gray-200 rounded-2xl p-3 md:p-4 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                          <span className="text-sm text-gray-400">IMG</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base md:text-lg font-semibold text-[#0F172A]">
                              {workflow.title}
                            </h3>
                            {workflow.categories && workflow.categories.length > 0 && (
                              <span className="text-[10px] md:text-xs font-semibold text-[#0a637a] bg-[#d7f6ff] px-2 py-0.5 rounded-full">
                                {workflow.categories[0]}
                              </span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-gray-600 mt-0.5 line-clamp-2">
                            {workflow.description}
                          </p>
                          <div className="mt-2 flex items-center gap-4">
                            <Button
                              onClick={() =>
                                router.push(`/workflows/${workflow.id}`)
                              }
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-2 text-[#007BFF] hover:text-[#0057D8] border-none bg-transparent p-0 shadow-none hover:bg-sky-50 transition-colors rounded-lg"
                            >
                              <Eye className="w-4 h-4" />
                              <span className="font-medium">View Details</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right min-w-[72px]">
                        <div className="text-base md:text-lg font-bold text-[#0F172A]">
                          ${workflow.price.toFixed(2)}
                        </div>
                        <div className="mt-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold bg-blue-100 text-blue-700">
                            Wishlist
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-blue-50 rounded-2xl p-8 text-center">
                    <div className="text-gray-500">No workflows in your wishlist yet.</div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "notifications" && (
          <motion.div
            key="notifications"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={fade}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#0F172A]">
                Notifications
              </h2>

              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard/notifications"
                  className="text-sm text-[#007BFF] hover:underline cursor-pointer"
                >
                  View all
                </Link>
                <button className="text-sm text-gray-600 hover:text-[#007BFF] cursor-pointer">
                  Mark all as read
                </button>
              </div>
            </div>
            {loadingNotifications ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Loading notifications...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {apiNotifications.length > 0 ? (
                  apiNotifications.slice(0, 3).map((notification) => {
                    const getNotificationStyles = (type: string, isUnread: boolean) => {
                      if (isUnread) {
                        return "bg-[#EAF4FF] border-[#cfe5ff]";
                      }

                      switch (type.toLowerCase()) {
                        case 'success':
                          return "bg-green-50 border-green-200";
                        case 'warning':
                          return "bg-yellow-50 border-yellow-200";
                        case 'error':
                          return "bg-red-50 border-red-200";
                        default:
                          return "bg-white border-gray-200";
                      }
                    };

                    const getIcon = (type: string) => {
                      switch (type.toLowerCase()) {
                        case 'success':
                          return <CheckCircle2 className="w-4 h-4 text-green-600" />;
                        case 'warning':
                          return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
                        case 'error':
                          return <XCircle className="w-4 h-4 text-red-600" />;
                        default:
                          return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
                      }
                    };

                    const formatTime = (createdAt: string) => {
                      const date = new Date(createdAt);
                      const now = new Date();
                      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
                      
                      if (diffInHours < 1) return 'Just now';
                      if (diffInHours < 24) return `${diffInHours}h ago`;
                      const diffInDays = Math.floor(diffInHours / 24);
                      return `${diffInDays}d ago`;
                    };

                    return (
                      <div
                        key={notification.id}
                        className={`rounded-2xl border ${getNotificationStyles(
                          notification.type,
                          notification.is_unread
                        )} p-4 md:p-5`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex-shrink-0">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[#0F172A] mb-1">
                              {notification.title}
                            </div>
                            <div className="text-gray-700 text-sm mb-2">
                              {notification.message}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatTime(notification.created_at)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-blue-50 rounded-2xl p-8 text-center">
                    <div className="text-gray-500">No notifications yet.</div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            key="settings"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={fade}
            transition={{ duration: 0.25 }}
          >
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                {success}
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className=" w-full flex justify-end">
                <Link
                  href="/dashboard/settings"
                  className="text-sm text-[#007BFF] hover:underline cursor-pointer"
                >
                  View all
                </Link>
              </div>
              <div>
                <div className="font-bold text-xl text-[#002B6B] mb-4">
                  Account Settings
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    className="w-full h-10 rounded-xl border border-gray-200 px-3 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF]"
                    defaultValue={profile.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    className="w-full h-10 rounded-xl opacity-50 border border-gray-200 px-3 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF]"
                    defaultValue={profile.email}
                    disabled
                  />
                </div>
              </div>

              {/* <div className="mt-6">
                <div className="font-semibold text-gray-900 mb-3">
                  Notification Preferences
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked /> Email notifications
                    for new workflows
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked /> Updates on
                    purchased workflows
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" /> Marketing emails
                  </label>
                </div>
              </div> */}

              <Button
                className="mt-6 bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white rounded-xl px-6"
                onClick={handleSaveChanges}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
