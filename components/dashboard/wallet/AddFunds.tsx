"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/contexts/WalletContext";
import { useWebSocket } from "@/lib/socket/hooks";
import Image from "next/image";
import cookie from "js-cookie";

const BANKS = [
  { id: "MB", name: "MB Bank" },
  { id: "VCB", name: "Vietcombank" },
  { id: "TCB", name: "Techcombank" },
  { id: "ACB", name: "ACB" },
  { id: "BIDV", name: "BIDV" },
  { id: "TPB", name: "TPBank" },
  { id: "VIB", name: "VIB" },
  { id: "AGRIBANK", name: "Agribank" },
];

export default function AddFunds() {
  const { getWalletStats, getTransactions } = useWallet();
  const [amountInput, setAmountInput] = useState("");
  const [selectedBank, setSelectedBank] = useState<string>("MB");
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [depositData, setDepositData] = useState<{
    transaction_id?: string;
    transfer_code?: string;
    qr_url?: string;
    amount?: number;
  }>({});

  const quickAmounts = [100000, 500000, 1000000, 2000000];

  // WebSocket listener for wallet_update events
  const { on, off } = useWebSocket({
    endpoint: "wallet",
    autoConnect: true,
  });

  // Use ref to store latest showPreview state to avoid re-registering listener
  const showPreviewRef = useRef(showPreview);
  useEffect(() => {
    showPreviewRef.current = showPreview;
  }, [showPreview]);

  // Listen for wallet_update events (deposit_success)
  useEffect(() => {
    const handleWalletUpdate = (data: any) => {
      if (data.type === "wallet_update" && data.event === "deposit_success") {
        // Only handle if we're in preview mode (QR and bank info are shown)
        if (showPreviewRef.current) {
          console.log("Deposit success detected via WebSocket, refreshing wallet data...");
          getWalletStats();
          getTransactions();
          setShowPreview(false);
          setAmountInput("");
        }
      }
    };

    on("wallet_update", handleWalletUpdate);

    // Cleanup listener on unmount
    return () => {
      off("wallet_update", handleWalletUpdate);
    };
  }, [on, off, getWalletStats, getTransactions]);

  const handleConfirm = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");

    const amount = parseInt(amountInput);
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount");
      return;
    }
    if (amount < 20000) {
      setError("Minimum deposit is 20,000 VND");
      return;
    }
    if (amount > 5000000) {
      setError("Maximum deposit is 5,000,000 VND");
      return;
    }

    try {
      const res = await fetch("https://api.usitech.io.vn/api/wallet/deposit/init", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${cookie.get("access_token")}` },
        body: JSON.stringify({ amount, bank_name: selectedBank }),
      });
      const data = await res.json();

      if (data?.transfer_code && data?.qr_url) {
        setDepositData(data);
        // setSelectedBank(data.bank_name);
        // setAmountInput(data.amount.toString());
        setShowPreview(true);
      } else {
        setError("Failed to initialize deposit.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error during deposit init.");
    }
  };

  const handleEdit = () => {
    setShowPreview(false);
    setDepositData({});
  };

  const handleCompleteTransfer = async () => {
    try {
      // Gọi confirm (hoặc có thể chỉ reload transactions)
      await getWalletStats();
      await getTransactions();
      setShowPreview(false);
      setAmountInput("");
    } catch (err) {
      console.error(err);
      setError("Error refreshing wallet info.");
    }
  };

  const selectedBankObj = BANKS.find((b) => b.id === selectedBank);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 to-white border border-blue-100 shadow-sm hover:shadow-md transition-all font-sans">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Add Funds</h2>
        </div>

        {!showPreview ? (
          <form onSubmit={handleConfirm} className="space-y-4 text-[15px] font-normal">
            {/* Bank select */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Bank</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 bg-white"
              >
                {BANKS.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick amount buttons */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Quick Amount</label>
              <div className="grid grid-cols-2 gap-2">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setAmountInput(amount.toString())}
                    className="py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-xl border border-blue-200"
                  >
                    {amount.toLocaleString("en-US")} ₫
                  </button>
                ))}
              </div>
            </div>

            {/* Amount input */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Amount (₫)</label>
              <input
                type="text"
                placeholder="Enter amount"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 bg-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-2 text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 transition-all shadow text-white"
            >
              Confirm Information
            </Button>
            {error && <p className="text-xs text-red-500 text-center">{error}</p>}
          </form>
        ) : (
          // Preview section
          <div className="mt-5 text-black">
            <h3 className="text-xl font-semibold text-center mb-3">Transfer Confirmation</h3>
            <p className="text-sm mb-2 text-gray-700 text-center">
              Please transfer exactly{" "}
              <span className="text-blue-600 font-semibold">{amountInput}₫</span>
            </p>
            <div className="space-y-2 bg-blue-50 rounded-lg py-3 px-4 mb-3 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="font-medium">Transfer Code:</span>
                <span className="font-mono">{depositData.transfer_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Bank:</span>
                <span className="font-mono">{selectedBankObj?.name ?? selectedBank}</span>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-inner w-fit mx-auto">
                <div className="relative w-[220px] h-[220px]">
                  <Image
                    src={depositData.qr_url ?? ""}
                    alt="QR Code"
                    width={220}
                    height={220}
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl"
                onClick={handleCompleteTransfer}
              >
                I have completed the transfer
              </button>
              <button
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-xl"
                onClick={handleEdit}
              >
                Edit Information
              </button>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}