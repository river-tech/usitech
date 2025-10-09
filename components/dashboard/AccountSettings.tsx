"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { User, Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setShowError(false);
    setShowSuccess(false);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate 10% chance of error for demo purposes
      if (Math.random() < 0.1) {
        setShowError(true);
      } else {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      }
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (showError) setShowError(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-8 rounded-2xl border border-gray-200 shadow-sm bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#007BFF]/10 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-[#007BFF]" />
            </div>
            <h2 className="text-xl font-semibold text-[#002B6B]">Account Information</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Update your personal information and account details.
          </p>
        </CardHeader>

        <CardContent>
          {showSuccess && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Your account information has been updated successfully!
              </AlertDescription>
            </Alert>
          )}

          {showError && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                Failed to update account information. Please try again.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                  className="mt-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-[#007BFF] focus:border-transparent"
                />
              </div>

              <div>
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                  className="mt-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-[#007BFF] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="rounded-xl border-gray-300 focus:ring-2 focus:ring-[#007BFF] focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Changing your email will require verification
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white rounded-xl hover:brightness-110 transition-all duration-200"
            >
              {isLoading ? "Updating..." : "Update Account Information"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
