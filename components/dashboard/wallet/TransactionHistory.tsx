"use client";

import { motion } from "framer-motion";
import { History, ArrowUpRight, ArrowDownRight, Clock, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletTransaction } from "@/lib/models/Wallet";
import { PurchaseStatus, TransactionType } from "@/lib/models/enums";
import { DepositStatus } from "@/lib/models/enums";
import { useState } from "react";

function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export default function TransactionHistory({ transactions }: { transactions: WalletTransaction[] }) {
  const [showAll, setShowAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter transactions by status
  const filteredTransactions = transactions.filter(tx => {
    if (statusFilter === "all") return true;
    return tx.status === statusFilter;
  });

  // Get transactions to display
  const displayTransactions = showAll ? filteredTransactions : filteredTransactions.slice(0, 4);

  const renderTransaction = (tx: WalletTransaction, index: number) => (
    <motion.div
      key={tx.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            tx.transaction_type === TransactionType.DEPOSIT
              ? "bg-green-100"
              : tx.transaction_type === TransactionType.PURCHASE
              ? "bg-red-100"
              : "bg-blue-100"
          }`}>
            <div className={`${
              tx.transaction_type === TransactionType.DEPOSIT
                ? "text-green-600"
                : tx.transaction_type === TransactionType.PURCHASE
                ? "text-red-600"
                : "text-blue-600"
            }`}>
              {tx.transaction_type === TransactionType.DEPOSIT ? (
                <ArrowUpRight className="w-6 h-6" />
              ) : tx.transaction_type === TransactionType.PURCHASE ? (
                <ArrowDownRight className="w-6 h-6" />
              ) : (
                <Clock className="w-6 h-6" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-base">
              {tx.transaction_type === TransactionType.DEPOSIT
                ? "Deposit"
                : tx.transaction_type === TransactionType.PURCHASE
                  ? "Purchase"
                  : "Other"}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-1">
              {tx.note ||
                (tx.transaction_type === TransactionType.DEPOSIT
                  ? "Deposit to wallet"
                  : tx.transaction_type === TransactionType.PURCHASE
                  ? "Purchase workflow"
                  : "Transaction")}
            </p>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <p className={`font-bold text-lg ${
            tx.transaction_type === TransactionType.DEPOSIT
              ? "text-green-600"
              : tx.transaction_type === TransactionType.PURCHASE
              ? "text-red-600"
              : "text-blue-600"
          } mb-2`}>
            {tx.transaction_type === TransactionType.DEPOSIT ? "+" : "-"}
            {formatVND(tx.amount)}
          </p>
          <div className="flex flex-col items-end gap-1">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              tx.status === DepositStatus.SUCCESS
                ? "bg-green-100 text-green-700"
                : tx.status === DepositStatus.PENDING
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
              {tx.status?.toUpperCase()}
            </span>
            <span className="text-xs text-gray-500">{formatTimeAgo(tx.created_at)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 rounded-2xl shadow-sm bg-white border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <History className="w-6 h-6 text-blue-600" /> Transaction History
          </h3>
          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm text-black border border-gray-300 rounded-lg px-2 py-1 focus:outline-none"
              >
                <option value="all">All</option>
                <option  value={DepositStatus.SUCCESS}>Success</option>
                <option value={DepositStatus.PENDING}>Pending</option>
                <option value={PurchaseStatus.REJECT}>Reject</option>
              </select>
            </div>
            {/* View All Button */}
            {filteredTransactions.length > 4 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {showAll ? "Show Less" : "View All"}
              </Button>
            )}
          </div>
        </div>

        {displayTransactions.length === 0 ? (
          <div className="text-center p-6 text-gray-500">
            {statusFilter === "all" ? "No transactions yet." : `No ${statusFilter} transactions.`}
          </div>
        ) : (
          <div className={`space-y-4 ${showAll ? "max-h-96 overflow-y-auto pr-2" : ""}`}>
            {displayTransactions.map((tx, index) => renderTransaction(tx, index))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
