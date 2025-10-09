"use client";

import { useState } from "react";
import ForgotPasswordEmailForm from "../../../components/auth/ForgotPasswordEmailForm";
import VerifyOtpForm from "../../../components/auth/VerifyOtpForm";
import ResetPasswordForm from "../../../components/auth/ResetPasswordForm"; 

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EAF2FF] to-[#FFFFFF] px-4">
      {step === 1 && <ForgotPasswordEmailForm setStep={setStep} />}
      {step === 2 && <VerifyOtpForm setStep={setStep} />}
      {step === 3 && <ResetPasswordForm />}
    </div>
  );
}
