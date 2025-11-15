"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import WalletApi from '../api/Wallet';
import { Deposit, IWalletStats, LastBankTransfer, WalletTransaction } from '../models/Wallet';
import { useWalletWebSocket, WalletStatusUpdate } from '../socket';
import { DepositStatus, TransactionType } from '../models/enums';

interface WalletContextType {
  isLoading: boolean;
  transactions: WalletTransaction[];
  walletStats: IWalletStats | undefined;
  getWalletStats: () => Promise<void>;
  getTransactions: () => Promise<void>;
  createDeposit: (deposit: Deposit) => Promise<{ success: boolean;   error?: string }>;
  getLastBankTransfer: () => Promise<{ success: boolean; error?: string }>;
  lastBankTransfer: LastBankTransfer | undefined;
}


const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const walletApi = useMemo(() => WalletApi(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [walletStats, setWalletStats] = useState<IWalletStats | undefined>(undefined);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [lastBankTransfer, setLastBankTransfer] = useState<LastBankTransfer | undefined>(undefined);

  // Helper function to update transaction status
  const updateTransactionStatus = useCallback((transaction: Partial<WalletTransaction> & { id: string }) => {
    setTransactions(prev => 
      prev.map(tx => 
        tx.id === transaction.id 
          ? { ...tx, ...transaction }
          : tx
      )
    );
  }, []);

  // Helper function to update wallet balance
  const updateWalletBalance = useCallback((wallet: Partial<IWalletStats>) => {
    if (typeof wallet.balance !== "undefined") {
      setWalletStats(prev => ({
        balance: wallet.balance,
        total_deposited: wallet.total_deposited ?? prev?.total_deposited,
        total_spent: wallet.total_spent ?? prev?.total_spent,
      }));
    }
  }, []);

  // Connect to WebSocket for real-time wallet updates
  const { isConnected } = useWalletWebSocket((data: WalletStatusUpdate) => {
    console.log("WebSocket wallet update received:", data);

    if (data.type === 'wallet_status_update') {
      // Cập nhật transaction status khi admin activate/reject
      if (data.transaction && data.transaction.id) {
        updateTransactionStatus(data.transaction as Partial<WalletTransaction> & { id: string });
      }

      // Cập nhật wallet balance
      if (data.wallet) {
        updateWalletBalance(data.wallet);
      }
    }
  });

  // Log WebSocket connection status - chỉ log một lần khi mount
  useEffect(() => {
    const checkConnection = () => {
      if (isConnected()) {
        console.log("✅ WebSocket connected - Ready to receive wallet updates");
      }
    };
    
    // Check ngay lập tức và sau 1 giây
    checkConnection();
    const timer = setTimeout(checkConnection, 1000);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Chỉ chạy một lần khi mount

  // Load wallet data on mount
  const getWalletStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await walletApi.getWalletStats();
      if (result.success) {
        // Map API response to our interface
        const walletData: IWalletStats = {
          balance: result.data.balance || 0,
          total_deposited: result.data.total_deposited || 0,
          total_spent: result.data.total_spent || 0
        };
        setWalletStats(walletData);
      }
    } catch {
      // Error loading wallet stats
    } finally {
      setIsLoading(false);
    }
  }, [walletApi]);

  const getTransactions = useCallback(async () => {
    try {
      const result = await walletApi.getTransactions();
      if (result.success) {
        // Map API response to our interface
        const transactionsData: WalletTransaction[] = (result.data as Partial<WalletTransaction>[]).map((tx) => ({
          id: tx.id ?? "",
          transaction_type: tx.transaction_type ?? TransactionType.DEPOSIT,
          amount: tx.amount ?? 0,
          status: tx.status ?? DepositStatus.PENDING,
          bank_name: tx.bank_name ?? '',
          bank_account: tx.bank_account ?? '',
          transfer_code: tx.transfer_code ?? '',
          note: tx.note ?? '',
          created_at: tx.created_at ?? new Date().toISOString()
        }));
        setTransactions(transactionsData);
      }
    } catch {
      // Error loading transactions
    } finally {
      setIsLoading(false);
    }
  }, [walletApi]);
  
  const createDeposit = async (deposit: Deposit) => {
    try {
      const result = await walletApi.createDeposit(deposit);
  
      if (result.success) {
        return { success: true, error: undefined };
      } else {
        return { success: false, error: result.error || "Deposit failed" };
      }
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unexpected error while creating deposit",
      };
    }
  };
  const getLastBankTransfer = useCallback(async () => {
    try {
      const result = await walletApi.getLastBankTransfer();
      if (result.success) {
        setLastBankTransfer(result.data);
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error || "Last bank transfer failed" };
      }
    } catch (error) {  
      return { success: false, error: error instanceof Error ? error.message : "Error getting last bank transfer" };
    }
  }, [walletApi]);

  useEffect(() => {
    getLastBankTransfer();
    getWalletStats();
    getTransactions();
  }, [getLastBankTransfer, getTransactions, getWalletStats]);
  const value: WalletContextType = {
    isLoading,
    transactions,
    walletStats,
    lastBankTransfer,
    createDeposit,
    getTransactions,
    getWalletStats,
    getLastBankTransfer,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
