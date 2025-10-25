"use client";
import { motion } from "framer-motion";
import { ShoppingCart, DollarSign, Workflow, Bookmark, User } from "lucide-react";
import UserApi from "../../lib/api/User";
import { useEffect, useState } from "react";
import { DashboardUser } from "../../lib/models/user";

interface StatItem {
  id: string;
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface StatsGridProps {
  stats?: Partial<Record<"purchases"|"spent"|"active"|"saved", string>>;
}

const defaultStats: StatItem[] = [
  { id: "purchases", label: "Total Purchases", value: "12", icon: ShoppingCart },
  { id: "spent", label: "Total Spent", value: "$847", icon: DollarSign },
  { id: "active", label: "Active Workflows", value: "5", icon: Workflow },
  { id: "saved", label: "Saved Workflows", value: "18", icon: Bookmark },
];
  

export default function StatsGrid() {
  const user = UserApi()

const [dashboardUser, setDashboardUser] = useState<DashboardUser | null>(null);

useEffect(() => {
  const fetchData = async () => {
    const userData = await user.getDashboardUser();
    if (userData.success) {
      setDashboardUser(userData.data);
    }
  };
  fetchData();
}, []);
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
      {defaultStats.map((item, idx) => {
        const Icon = item.icon;
        const value = dashboardUser?.[item.id as keyof DashboardUser] || 0;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#002B6B] to-[#007BFF] flex items-center justify-center text-white">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-[#0F172A]">{value}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}


