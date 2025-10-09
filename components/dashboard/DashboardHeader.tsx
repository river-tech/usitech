"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";

interface DashboardHeaderProps {
  userName: string;
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
        Welcome back, {userName} 👋
      </h1>
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-gray-600 text-sm">Here’s a quick overview of your account and recent activity.</p>
        <Link href="/workflows">
          <Button className="bg-gradient-to-r from-[#002B6B] to-[#007BFF] hover:brightness-110 text-white font-semibold rounded-xl shadow-md px-5 py-2 h-10">Browse Workflows</Button>
        </Link>
      </div>
    </motion.div>
  );
}


