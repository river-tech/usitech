"use client";

import { useWallet } from "@/lib/contexts/WalletContext";
import WalletHeader from "@/components/dashboard/wallet/WalletHeader";
import WalletStats from "@/components/dashboard/wallet/WalletStats";
import AddFunds from "@/components/dashboard/wallet/AddFunds";
import TransactionHistory from "@/components/dashboard/wallet/TransactionHistory";

import { useAuth } from "@/lib/contexts/AuthContext";

export default function WalletPage() {
  const { userName } = useAuth();
  const { walletStats, transactions, isLoading } = useWallet();



  if (isLoading ) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 font-medium">Loading wallet...</span>
      </div>
    );
  }


  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <WalletHeader userName={userName || "UsITech User"} />
      
      <WalletStats 
        Stats={walletStats}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AddFunds 
         
        />
        
        <TransactionHistory 
          transactions={transactions}
        />
      </div>
    </div>
  );
}