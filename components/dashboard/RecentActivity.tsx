"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export interface ActivityItem {
  id: string;
  name: string;
  date: string;
  price: string;
  status: "Active" | "Expired";
}

interface RecentActivityProps {
  items: ActivityItem[];
}

export default function RecentActivity({ items }: RecentActivityProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#0F172A]">Recent Activity</h3>
        <Link href="/dashboard/purchases" className="text-sm text-[#007BFF] hover:underline">View All</Link>
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
            {items.map((it, idx) => (
              <motion.tr key={it.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: idx * 0.05 }} className="border-t border-gray-100">
                <td className="py-3 font-medium text-[#0F172A]">{it.name}</td>
                <td className="py-3 text-gray-600">{it.date}</td>
                <td className="py-3 text-gray-600">{it.price}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${it.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                    {it.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


