"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { Shield, CheckCircle, ArrowLeft } from "lucide-react";
import AuthApi from "../../lib/api/Auth";
interface VerifyOtpFormProps {
  setStep: (step: number) => void;
  email: string;
  setOtp: (otp: string) => void;
  otp: string;
}

export default function VerifyOtpForm({ setStep, email, setOtp, otp }: VerifyOtpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const auth = AuthApi();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true);
    
    // Mock API call
    const result = await auth.verifyResetOtp( email, otp.toString());
    if (result.success) {
      setShowSuccess(true);
      setStep(3);
    } else {
      setError(result.error || "Failed to verify OTP");
    }
    setIsLoading(false);
  };

  const handleResendOtp = () => {
    setResendCooldown(30);
    // Mock resend logic
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="max-w-md mx-auto p-8 rounded-2xl shadow-md bg-white">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-[#007BFF]/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-[#007BFF]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#002B6B]">Verify OTP</h1>
          <p className="text-gray-600 mt-2">Enter the 6-digit OTP sent to your email.</p>
        </CardHeader>

        <CardContent>
          {showSuccess ? (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                OTP verified successfully! Redirecting to password reset...
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              <div>
                <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                  Enter OTP
                </Label>
                <Input
                  ref={inputRef}
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  placeholder="123456"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                  maxLength={6}
                  className="mt-1 text-center text-2xl tracking-widest rounded-xl border-gray-300 focus:ring-2 focus:ring-[#007BFF] focus:border-transparent"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white rounded-xl hover:brightness-110 transition-all duration-200"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0}
                  className="text-sm text-gray-600 hover:text-[#007BFF]"
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                </Button>
              </div>

              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-600 hover:text-[#007BFF] flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Email
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
