"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IWalletStats } from "@/lib/models/Wallet";

function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function WalletStats({ Stats }: { Stats: IWalletStats }) {
  const stats = [
    {
      title: "Total Deposited",
      value: Stats?.total_deposited || 0,
      color: "from-green-400/90 to-emerald-600/90",
      icon: <ArrowUpRight className="w-6 h-6 text-white" />,
    },
    {
      title: "Total Spent",
      value: Stats?.total_spent || 0,
      color: "from-rose-400/90 to-rose-600/90",
      icon: <ArrowDownRight className="w-6 h-6 text-white" />,
    },
    {
      title: "Wallet Balance",
      value: Stats?.balance || 0,
      color: "from-blue-400/90 to-indigo-600/90",
      icon: <Wallet className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="relative overflow-hidden rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div
              className={`absolute right-5 top-5 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.color} shadow-md`}
            >
              {stat.icon}
            </div>
            <p className="text-gray-500 font-medium mb-2">{stat.title}</p>
            <h2 className="text-2xl font-bold text-gray-900">{formatVND(stat.value)}</h2>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
