"use client";
import { motion } from "framer-motion";
import { ShoppingCart, DollarSign, Workflow, Bookmark } from "lucide-react";
import UserApi from "../../lib/api/User";
import { useEffect, useState } from "react";
import { DashboardUser } from "../../lib/models/user";

interface StatItem {
  id: keyof DashboardUser;
  value: number;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  // Để value khỏi đây, mình lấy value động từ dashboardUser
}


const defaultStats: StatItem[] = [
  { id: "total_purchases", value: 0, label: "Total Purchases", icon: ShoppingCart },
  { id: "total_spent", value: 0, label: "Total Spent", icon: DollarSign },
  { id: "active_workflows", value: 0, label: "Active Workflows", icon: Workflow },
  { id: "saved_workflows", value: 0, label: "Saved Workflows", icon: Bookmark },
];

export default function StatsGrid() {
  const user = UserApi();

  const [dashboardUser, setDashboardUser] = useState<DashboardUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      const userData = await user.getDashboardUser();
      if (userData.success && mounted) {
        setDashboardUser(userData.data);
      }
      setLoading(false);
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  // Render 0 hoặc dấu ... trong khi loading, hoặc lấy giá trị default.
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
      {defaultStats.map((item, idx) => {
        const Icon = item.icon;

        // Chỉ hiển thị value thực khi dashboardUser đã được set & không loading
        let valueDisplay = "0";
        if (dashboardUser && typeof dashboardUser[item.id] !== "undefined") {
          // Format number and currency for "spent"
          if (item.id === "total_spent") {
            // Cho ví dụ: số tiền là dạng số nguyên (vd: 847000), muốn hiển thị "847,000 đ"
            // Xét nếu là string, thì in ra, nếu là number thì format.
            const val = dashboardUser[item.id];
            if (typeof val === "number") {
              valueDisplay = val.toLocaleString("vi-VN") + " đ";
            } else if (typeof val === "string") {
              // check nếu đã có đ, thì giữ nguyên
              valueDisplay = (val as string).match(/đ|₫|vnđ/i)
                ? val
                : val + " đ";
            } else {
              valueDisplay = String(val);
            }
          } else {
            valueDisplay = String(dashboardUser[item.id]);
          }
        } else if (loading) {
          valueDisplay = "...";
        }

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
                <div className="text-xl font-bold text-[#0F172A]">
                  {valueDisplay}
                </div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
