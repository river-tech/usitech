"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/contexts/WalletContext";
import Image from "next/image";

const BANKS = [
  { id: "vcb", name: "Vietcombank" },
  { id: "tcb", name: "Techcombank" },
  { id: "acb", name: "ACB" },
  { id: "mb", name: "MB Bank" },
  { id: "vib", name: "VIB" },
  { id: "bidv", name: "BIDV" },
  { id: "tpb", name: "TPBank" },
  { id: "agribank", name: "Agribank" },
];

export default function AddFunds() {
  const { createDeposit, getWalletStats, getTransactions, getLastBankTransfer, lastBankTransfer } = useWallet();
  const [amountInput, setAmountInput] = useState("");
  const [selectedBank, setSelectedBank] = useState<string>(lastBankTransfer?.bank_name ?? BANKS[0].id);
  const [error, setError] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>(lastBankTransfer?.bank_account ?? "");
  const [showPreview, setShowPreview] = useState(false);
  const quickAmounts = [100000, 500000, 1000000, 2000000];
  useEffect(() => {
    console.log("Last bank transfer:", lastBankTransfer);
    getLastBankTransfer();
  }, []);

  // Update form when lastBankTransfer data is loaded
  useEffect(() => {
    if (lastBankTransfer) {
      console.log("Updating form with last bank transfer:", lastBankTransfer);
      setSelectedBank(lastBankTransfer.bank_name);
      setAccountNumber(lastBankTransfer.bank_account);
    }
  }, [lastBankTransfer]);
 
  // Generate a random 8-character alphanumeric transfer code
  function generateTransferCode(length: number = 8): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
  // Use a fixed transfer code after preview is opened, don't change on rerender
  const [transferCode] = useState(generateTransferCode());

  const handleConfirm = async(e?: React.FormEvent) => {
    setError("");
    e?.preventDefault();
    if (!amountInput || !selectedBank || !accountNumber) {
      setError("Please complete all fields");
      return;
    }
  //  const result = 
  const result = await createDeposit({
    bank_name: selectedBank,
    bank_account: accountNumber,
    transfer_code: transferCode,
    amount: parseInt(amountInput),
  });
  if (result?.success ) {
    setShowPreview(true);
  } else {
    setError(result?.error ?? "Failed to create deposit");
  }
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  const handleCompleteTransfer = async () => {
     // Don't reload page, just reset state after success
     setAmountInput("");
     setSelectedBank(BANKS[0].id);
     setAccountNumber("");
     setShowPreview(false);
     // Optionally update balance via API here
     getWalletStats();
     getTransactions();

  }
  // Find the selected bank object (for preview display)
  const selectedBankObj = BANKS.find((bank) => bank.id === selectedBank);

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

        {/* If showPreview is false, show form. If true, show non-modal preview */}
        {!showPreview ? (
          <form
            className="space-y-4 text-[15px] font-normal"
            onSubmit={handleConfirm}
            autoComplete="off"
          >
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Transfer Code
              </label>
              <input
                type="text"
                placeholder="Transfer Code"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm bg-white transition-all placeholder:text-gray-400"
                value={transferCode}
                readOnly
              />
            </div>
            {/* Bank selection */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Bank</label>
              <select
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm bg-white transition-all placeholder:text-gray-400"
                value={selectedBank}
                onChange={(e) => {
                  setSelectedBank(e.target.value);
                }}
              >
                {BANKS.map((bank) => (
                  <option value={bank.id} key={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Account Number input */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                placeholder="Account Number"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 shadow font-sans transition-all placeholder:text-gray-400 bg-white"
                value={accountNumber}
                  
                onChange={(e) => {
                  setAccountNumber(e.target.value.replace(/[^0-9]/g, ""));
                }}
                maxLength={20}
                autoComplete="off"
                inputMode="numeric"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Quick Amount</label>
              <div className="grid grid-cols-2 gap-2">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setAmountInput(amount.toString())}
                    className="py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors font-sans border border-blue-200"
                    tabIndex={-1}
                  >
                    {amount.toLocaleString("en-US")} ₫
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Amount (₫)
              </label>
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 shadow font-sans transition-all placeholder:text-gray-400 bg-white"
                value={amountInput}
                onChange={(e) => {
                  setAmountInput(e.target.value.replace(/[^0-9]/g, ""));
                }}
                autoComplete="off"
                inputMode="numeric"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-2 text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 transition-all shadow text-white font-sans"
            >
              Confirm Information
            </Button>
            {error && <p className="text-xs text-red-500 mb-3 text-center">{error}</p>}
          </form>
        ) : (
          // Show confirmation preview - no modal, don't reload page
          <div className="mt-5 text-black">
            <h3 className="text-xl font-semibold text-center mb-3">Transfer Confirmation</h3>
            <p className="text-sm mb-2 text-gray-700 font-medium text-center">
              Please transfer exactly <span className="text-blue-600">{amountInput}₫</span> to the information below:
            </p>
            <div className="space-y-2 bg-blue-50 rounded-lg py-3 px-4 mb-3 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="font-medium">Transfer Code:</span>
                <span className="font-mono">{transferCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Bank:</span>
                <span className="font-mono">{selectedBankObj ? selectedBankObj.name : selectedBank}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Account Number:</span>
                <span className="font-mono">{accountNumber}</span>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-inner w-fit mx-auto">
              <div className="relative w-[220px] h-[220px] overflow-hidden rounded-2xl shadow-lg mx-auto">
  <Image
    src="/QR.PNG"
    alt="QR Code"
    width={400}
    height={400}
    className="object-cover scale-[1.4] translate-y-[-15%]"
  />
</div>
  <p className="text-center text-gray-500 mt-2 text-sm">Scan this QR to transfer</p>
</div>
            </div>
            <p className="text-xs text-gray-500 mb-3 text-center">
              You <span className="font-semibold text-red-500">must transfer EXACTLY</span> according to the information above. Once completed, please click "I have completed the transfer".
            </p>
            <div className="flex flex-col gap-2">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
                onClick={() => {
                  handleCompleteTransfer();
                }}
                type="button"
              >
                I have completed the transfer
              </button>
              <button
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-xl transition"
                onClick={handleEdit}
                type="button"
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
