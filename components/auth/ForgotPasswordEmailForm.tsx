"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { Mail, CheckCircle } from "lucide-react";
import AuthApi from "../../lib/api/Auth";
interface ForgotPasswordEmailFormProps {
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
}

export default function ForgotPasswordEmailForm({ setStep, setEmail }: ForgotPasswordEmailFormProps) {
  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const auth = AuthApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    setIsLoading(true);
    
    // Mock API call
    const result = await auth.resendOtp(emailInput);
    if (result.success) {
      setEmail(emailInput); // Pass email to parent
      setShowSuccess(true);
      setStep(2); // Skip step 2, go directly to step 3
    } else {
      setError(result.error || "Failed to send OTP");
    }
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
            <Mail className="w-6 h-6 text-[#007BFF]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#002B6B]">Forgot Password</h1>
          <p className="text-gray-600 mt-2">Enter your registered email to receive an OTP.</p>
        </CardHeader>

        <CardContent>
          {showSuccess ? (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                An OTP has been sent to your email. Please check your inbox.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  className="mt-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-[#007BFF] focus:border-transparent"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !emailInput}
                className="w-full bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white rounded-xl hover:brightness-110 transition-all duration-200"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
