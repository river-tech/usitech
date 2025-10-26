"use client";

import { Wallet, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface WalletHeaderProps {
  userName: string;
}

export default function WalletHeader({ userName }: WalletHeaderProps) {
  return (
    <div className="mb-8">
      <Link href="/dashboard" className="cursor-pointer mb-20">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
      <div className="flex items-center mt-5 justify-between">
        
        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
              <p className="text-gray-600">Manage your funds and transactions</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Welcome back,</p>
          <p className="font-semibold text-gray-900">{userName}</p>
        </div>
      </div>
    </div>
  );
}
