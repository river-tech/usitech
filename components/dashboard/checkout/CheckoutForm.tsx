"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export default function CheckoutForm({ total, orderId }: { total: string; orderId: string }) {
  const [method, setMethod] = useState("qr");
  const [bankAccount, setBankAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [transferCode, setTransferCode] = useState("");
  const router = useRouter();

  // Tạo mã chuyển khoản với ID workflow và mã random
  useEffect(() => {
    const code = generateTransferCode(orderId);
    setTransferCode(code);
  }, [orderId]);

  const generateTransferCode = (workflowId: string) => {
    // Tạo mã random 6 chữ số
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Kết hợp workflow ID và mã random
    return `${workflowId}-${randomCode}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/dashboard/checkout/${orderId}/invoice`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6 text-[#0F172A]">
      <div>
        <h2 className="text-xl font-semibold text-[#0F172A]">Complete Your Purchase</h2>
        <p className="text-gray-600 text-sm">Secure checkout powered by industry-standard encryption</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-[#0F172A]">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Email Address *</Label>
            <Input placeholder="your@email.com" required />
          </div>
          <div>
            <Label>Country *</Label>
            <Input placeholder="Vietnam" required />
          </div>
          <div>
            <Label>First Name *</Label>
            <Input placeholder="John" required />
          </div>
          <div>
            <Label>Last Name *</Label>
            <Input placeholder="Doe" required />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-[#0F172A]">Bank Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Bank Name *</Label>
            <Input 
              placeholder="Vietcombank, Techcombank, BIDV..." 
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required 
            />
          </div>
          <div>
            <Label>Account Number *</Label>
            <Input 
              placeholder="1234567890" 
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              required 
            />
          </div>
        </div>
        {transferCode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 font-medium mb-2">Your Transfer Code:</p>
            <div className="bg-white border border-blue-300 rounded px-3 py-2 font-mono text-lg font-bold text-blue-900">
              {transferCode}
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Use this code in the transfer content when making payment
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-[#0F172A]">Payment Method</h3>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="method" value="qr" checked={method === "qr"} onChange={() => setMethod("qr")} />
            Chuyển khoản QR Code
          </label>
        </div>
      </div>

      {method === "qr" && (
        <div className="space-y-4">
          <h3 className="font-medium text-[#0F172A]">Thông tin chuyển khoản</h3>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm text-gray-600 mb-2">Quét mã QR hoặc chuyển khoản theo thông tin sau:</p>
            <div className="space-y-2 text-sm">
              <p><strong>Ngân hàng:</strong> Vietcombank</p>
              <p><strong>Số tài khoản:</strong> 1234567890</p>
              <p><strong>Chủ tài khoản:</strong> NGUYEN VAN A</p>
              <p><strong>Số tiền:</strong> {total}</p>
              <p><strong>Nội dung:</strong> {transferCode || `${bankName} ${bankAccount}`}</p>
            </div>
            {transferCode && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800 font-medium">
                  ⚠️ Quan trọng: Sử dụng mã chuyển khoản này trong nội dung chuyển tiền
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Mã: <span className="font-mono font-bold">{transferCode}</span>
                </p>
              </div>
            )}
            <div className="mt-4 flex justify-center">
              <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-center text-sm">QR Code<br/>sẽ hiển thị ở đây</p>
              </div>
            </div>
          </div>
        </div>
      )}
{/* 
      <div className="space-y-4">
        <h3 className="font-medium text-[#0F172A]">Billing Address</h3>
        <Input placeholder="Address" required />
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="City" required />
          <Input placeholder="ZIP/Postal Code" required />
        </div>
      </div> */}

      <div className="flex items-center gap-2 text-sm">
        <input type="checkbox" required />
        <p>
          I agree to the <span className="text-blue-600 underline">Terms of Service</span> and <span className="text-blue-600 underline">Privacy Policy</span>.
        </p>
      </div>

      <Button type="submit" className="w-full bg-gradient-to-r from-[#007BFF] to-[#06B6D4] text-white h-12 text-base font-semibold">
        Purchase – {total}
      </Button>
    </form>
  );
}


