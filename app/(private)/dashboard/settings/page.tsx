"use client";

import { motion } from "framer-motion";
import AccountSettings from "../../../../components/dashboard/AccountSettings";
import ChangePasswordForm from "../../../../components/dashboard/ChangePasswordForm";
import { Separator } from "../../../../components/ui/separator";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
       <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-[#007BFF] text-sm font-medium hover:underline transition mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to dashboard
          </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-[#002B6B] mb-2">Account Settings</h1>
        <p className="text-gray-600">
          Manage your account information and security settings
        </p>
      </motion.div>

      <div className="space-y-8">
        <AccountSettings />
        
        <Separator className="my-8" />
        
        <ChangePasswordForm />
      </div>
    </div>
  );
}
