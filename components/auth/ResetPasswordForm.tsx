"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { Lock, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthApi from "../../lib/api/Auth";

interface ResetPasswordFormProps {
  email: string;
  otp: string;
}

export default function ResetPasswordForm({ email, otp }: ResetPasswordFormProps) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const auth = AuthApi();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Call API to reset password
      const result = await auth.setNewPassword(email,  otp , formData.password); // Using dummy OTP
      if (result.success) {
        setShowSuccess(true);
          router.push("/auth/login");
      } else {
        setErrors({ general: result.error || "Failed to reset password" });
      }
    } catch (error) {
      setErrors({ general: "Network error, please try again" });
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="max-w-md mx-auto p-8 rounded-2xl shadow-md bg-white">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold text-[#002B6B]">Success!</h1>
            <p className="text-gray-600 mt-2">Your password has been reset successfully.</p>
          </CardHeader>

          <CardContent>
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                You can now log in with your new password. Redirecting to login page...
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="max-w-md mx-auto p-8 rounded-2xl shadow-md bg-white">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-[#007BFF]/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-[#007BFF]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#002B6B]">Reset Password</h1>
          <p className="text-gray-600 mt-2">Enter your new password for <strong>{email}</strong></p>
        </CardHeader>

        <CardContent>
          {errors.general && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {errors.general}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                New Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  className={`rounded-xl border-gray-300 focus:ring-2 focus:ring-[#007BFF] focus:border-transparent ${
                    errors.password ? "border-red-300 focus:ring-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm New Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                  className={`rounded-xl border-gray-300 focus:ring-2 focus:ring-[#007BFF] focus:border-transparent ${
                    errors.confirmPassword ? "border-red-300 focus:ring-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white rounded-xl hover:brightness-110 transition-all duration-200"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
