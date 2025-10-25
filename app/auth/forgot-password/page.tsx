"use client";

import { useState } from "react";
import ForgotPasswordEmailForm from "../../../components/auth/ForgotPasswordEmailForm";
import ResetPasswordForm from "../../../components/auth/ResetPasswordForm"; 
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EAF2FF] to-[#FFFFFF] px-4">
      {step === 1 && <ForgotPasswordEmailForm setStep={setStep} setEmail={setEmail}  />}
      {step === 2 && <VerifyOtpForm setStep={setStep} email={email} setOtp={setOtp} otp={otp} />}
      {step === 3 && <ResetPasswordForm email={email} otp={otp} />}
    </div>
  );
}
