"use client";

import Link from "next/link";
import { Bell, RefreshCw, CheckCircle2 } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  type?: "update" | "success" | "general";
}

interface NotificationsCardProps {
  items: NotificationItem[];
}

export default function NotificationsCard({ items }: NotificationsCardProps) {
  const iconFor = (type?: string) => {
    switch (type) {
      case "update":
        return <RefreshCw className="w-4 h-4 text-[#007BFF]" />;
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#0F172A]">Recent Notifications</h3>
        <Link href="/dashboard/notifications" className="text-sm text-[#007BFF] hover:underline">View all</Link>
      </div>
      <div className="space-y-3 text-sm">
        {items.map((n) => (
          <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="mt-0.5">{iconFor(n.type)}</div>
            <div className="flex-1">
              <div className="text-[#0F172A]">{n.title}</div>
              <div className="text-xs text-gray-500">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


