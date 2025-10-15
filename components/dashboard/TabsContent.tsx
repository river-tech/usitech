"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Eye, BadgeCheck, ArrowRight, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { type Tab } from "./TabsHeader";
import Link from "next/link";
import { ActivityItem } from "./RecentActivity";
import { useRouter } from "next/navigation";
import { NotificationType } from "../../lib/models";
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
    status: "Active",
  },
  {
    id: "2",
    name: "Social Media Automation",
    date: "2025-09-28",
    price: "$35",
    status: "Active",
  },
  {
    id: "3",
    name: "Lead Generation Bot",
    date: "2025-09-20",
    price: "$55",
    status: "Expired",
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
}

const fade: React.ComponentProps<typeof motion.div>["variants"] = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function TabsContent({
  activeTab,
  purchases,
  notifications,
}: TabsContentProps) {
    console.log(activeTab);
    const router = useRouter();
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
                    {recent.map((it, idx) => (
                      <motion.tr
                        key={it.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="border-t border-gray-100"
                      >
                        <td className="py-3 font-medium text-[#0F172A]">
                          {it.name}
                        </td>
                        <td className="py-3 text-gray-600">{it.date}</td>
                        <td className="py-3 text-gray-600">{it.price}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              it.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {it.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
              <h2 className="text-xl font-semibold text-[#0F172A]">My Workflows</h2>
              <Link href="/dashboard/my-workflows" className="text-sm text-[#007BFF] hover:underline cursor-pointer">View all</Link>
            </div>
            <div className="space-y-3">
              {purchases.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-gray-200 rounded-2xl p-3 md:p-4 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                      <span className="text-sm text-gray-400">IMG</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base md:text-lg font-semibold text-[#0F172A]">
                          {p.name}
                        </h3>
                        {p.category && (
                          <span className="text-[10px] md:text-xs font-semibold text-[#0a637a] bg-[#d7f6ff] px-2 py-0.5 rounded-full">
                            {p.category}
                          </span>
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 mt-0.5">
                        Purchased on {p.date}
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                        <Button
                          
                          variant="outline"
                          className="rounded-xl border-[#00A3FF] text-[#007BFF] hover:bg-[#EAF2FF] flex items-center gap-2 px-3 py-1.5 h-9 text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                        <button onClick={() => router.push(`/dashboard/my-workflows/${p.id}`)}   className="text-sm text-gray-700 hover:text-[#007BFF] inline-flex items-center gap-1.5 cursor-pointer">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right min-w-[72px]">
                    <div className="text-base md:text-lg font-bold text-[#0F172A]">
                      {p.price}
                    </div>
                    <div className="mt-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold ${
                          p.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              <h2 className="text-xl font-semibold text-[#0F172A]">Notifications</h2>
              
              <div className="flex items-center gap-4">
                <Link href="/dashboard/notifications" className="text-sm text-[#007BFF] hover:underline cursor-pointer">View all</Link>
                <button className="text-sm text-gray-600 hover:text-[#007BFF] cursor-pointer">Mark all as read</button>
              </div>
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 3).map((n) => {
                const getNotificationStyles = (type?: NotificationType, highlight?: boolean) => {
                  if (highlight) {
                    return "bg-[#EAF4FF] border-[#cfe5ff]";
                  }
                  
                  switch (type) {
                    case NotificationType.SUCCESS:
                      return "bg-green-50 border-green-200";
                    case NotificationType.WARNING:
                      return "bg-yellow-50 border-yellow-200";
                    case NotificationType.ERROR:
                      return "bg-red-50 border-red-200";
                    default:
                      return "bg-white border-gray-200";
                  }
                };

                const getIcon = (type?: NotificationType) => {
                  switch (type) {
                    case NotificationType.SUCCESS:
                      return <CheckCircle2 className="w-4 h-4 text-green-600" />;
                    case NotificationType.WARNING:
                      return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
                    case NotificationType.ERROR:
                      return <XCircle className="w-4 h-4 text-red-600" />;
                    default:
                      return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
                  }
                };

                return (
                  <div
                    key={n.id}
                    className={`rounded-2xl border ${getNotificationStyles(n.type, n.highlight)} p-4 md:p-5`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[#0F172A] mb-1">
                          {n.title}
                        </div>
                        {n.body && (
                          <div className="text-gray-700 text-sm mb-2">{n.body}</div>
                        )}
                        <div className="text-xs text-gray-500">{n.time}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
           
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className=" w-full flex justify-end">
                    <Link href="/dashboard/settings" className="text-sm text-[#007BFF] hover:underline cursor-pointer">View all</Link>
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    className="w-full h-10 rounded-xl border border-gray-200 px-3 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF]"
                    defaultValue="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    className="w-full h-10 rounded-xl border border-gray-200 px-3 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF]"
                    defaultValue="Doe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    className="w-full h-10 rounded-xl border border-gray-200 px-3 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF]"
                    defaultValue="john@example.com"
                  />
                </div>
              </div>

              <div className="mt-6">
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
              </div>

              <Button className="mt-6 bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white rounded-xl px-6">
                Save Changes
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
