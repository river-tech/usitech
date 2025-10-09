"use client";

import { Button } from "../ui/button";

interface AccountSummaryProps {
  memberSince: string;
  plan: string;
  downloads: number;
}

export default function AccountSummary({ memberSince, plan, downloads }: AccountSummaryProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm">
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A] mb-3">Account Summary</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center justify-between gap-2"><span className="text-gray-500">Member since:</span> {memberSince}</li>
            <li className="flex items-center justify-between gap-2"><span className="text-gray-500">Plan:</span> {plan}</li>
            <li className="flex items-center justify-between gap-2"><span className="text-gray-500">Downloads:</span> {downloads}</li>
          </ul>
        </div>
        
      </div>
  );
}


