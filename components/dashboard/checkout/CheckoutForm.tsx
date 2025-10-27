"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useWallet } from "@/lib/contexts/WalletContext";
import WorkflowApi from "@/lib/api/Workflow";

export default function CheckoutForm({ total, orderId }: { total: string; orderId: string }) {
  const { userEmail, userName } = useAuth()
  const { walletStats } = useWallet();
  const walletBalance = walletStats?.balance;
  const workflowApi = WorkflowApi();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Xử lý submit: kiểm tra số dư ví, nếu đủ, trừ tiền và redirect, nếu không thì báo lỗi
  // (Ở đây giả lập, trong thực tế cần gọi API backend để xử lý thực sự)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    setIsLoading(true);
    const result = await workflowApi.orderWorkflow(orderId);
    if (result.success) {
      setIsLoading(false);
      router.push(`/dashboard/checkout/${result.data.purchase_id}/invoice`);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6 text-[#0F172A]"
    >
      <div>
        <h2 className="text-xl font-semibold text-[#0F172A]">Complete Your Purchase</h2>
        <p className="text-gray-600 text-sm">Pay with your wallet balance</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-[#0F172A]">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Email Address *</Label>
            <Input readOnly placeholder="your@email.com" required value={userEmail || ""} />
          </div>
          <div className="col-span-2">
            <Label>Full Name *</Label>
            <Input readOnly placeholder="John Doe" required value={userName || ""} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-[#0F172A]">Payment Method</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="method"
              value="wallet"
              checked
              readOnly
              disabled
            />
            <span>Payment with wallet balance</span>
          </label>
          <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 border border-blue-200 rounded-2xl px-6 py-4 mt-3 text-[#0369A1] flex flex-col md:flex-row md:items-center gap-3 md:gap-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-200 w-10 h-10 flex items-center justify-center rounded-full shadow-sm">
                <svg
                  className="w-6 h-6 text-blue-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs text-blue-700 font-semibold">Wallet Balance</div>
                <div className="font-mono font-bold text-[1.1rem] text-blue-900">
                  {typeof walletBalance === "number"
                    ? walletBalance.toLocaleString("vi-VN") + " ₫"
                    : "—"}
                </div>
              </div>
            </div>
            <Button
              type="button"
              variant="secondary"
              className="ml-0 md:ml-auto px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow transition hover:from-blue-600 hover:to-cyan-600"
              onClick={() => router.push("/dashboard/wallet")}
            >
              + Add Funds
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-[#0F172A]">Order Amount</h3>
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-gray-600 font-medium text-base">
              Payment Amount:
            </span>
            <span className="font-mono font-extrabold text-lg text-green-700 bg-green-50 px-3 py-1 rounded-lg">
              {total}
            </span>
          </div>
          {typeof walletBalance === "number" && walletBalance < parseInt(total.replace(/[^\d]/g, "")) && (
            <span className="text-red-600 bg-red-50 rounded-lg px-3 py-1 text-sm font-semibold flex items-center gap-1">
              <svg className="w-4 h-4 mr-1 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9zm-9 4v-4" />
              </svg>
              Wallet balance is insufficient
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <input type="checkbox" required />
        <p>
          I agree to the <span className="text-blue-600 underline">Terms of Service</span> and <span className="text-blue-600 underline">Privacy Policy</span>.
        </p>
      </div>

      <Button
        type="submit"
        onClick={handleSubmit}
        className="w-full  text-[#0F172A] h-12 text-base font-semibold border border-gray-200 shadow-sm"
        disabled={typeof walletBalance === "number" && walletBalance < parseInt(total.replace(/[^\d]/g, "")) || isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-[#06B6D4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#06B6D4" strokeWidth="4"/>
              <path className="opacity-75" fill="#06B6D4" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Processing Payment...
          </span>
        ) : (
          <>Pay – {total}</>
        )}
      </Button>
    </form>
  );

}
