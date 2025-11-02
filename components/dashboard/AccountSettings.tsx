"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User, Mail, CheckCircle, AlertCircle, Upload, X } from "lucide-react";
import { useAuth } from "../../lib/contexts/AuthContext";
import UserApi from "../../lib/api/User";
import { UserProfile } from "../../lib/models/user";
import { uploadAvatar } from "../../lib/api/UploadFile";
import Image from "next/image";

export default function AccountSettings() {
  const { userAvatar, userName, userEmail, refreshUserData, setUserAvatar } = useAuth();
  const userApi = UserApi();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "", // Will be updated via useEffect
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load user profile from API
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const result = await userApi.getUserProfile();
        if (result.success) {
          setFormData({
            name: result.data.name || "",
            email: result.data.email,
            avatar: result.data.avatar_url || ""
          });
        }
      } catch (error) {
        // Error loading profile
      } finally {
        setIsLoadingProfile(false);
      }
    };
    
    loadProfile();
  }, []);

  // Sync formData avatar with context avatar
  useEffect(() => {
    setFormData(prev => ({ ...prev, avatar: userAvatar || "" }));
  }, [userAvatar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setShowError(false);
    setShowSuccess(false);
    
    try {
      const result = await userApi.updateUserProfile(formData.name, formData.avatar);
      
      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1000);
        await refreshUserData();
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (showError) setShowError(false);
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setShowError(true);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setShowError(true);
      return;
    }

    setIsUploadingAvatar(true);
    
    try {
      // Use existing uploadAvatar function
      const avatarUrl = await uploadAvatar(event);
      
      if (avatarUrl) {
        // Update form data with new avatar URL
        setFormData(prev => ({ ...prev, avatar: avatarUrl }));
        
        // Update global avatar state immediately for navbar
        // Update avatar in context
        await refreshUserData();
        setUserAvatar(avatarUrl);
        
        const result = await userApi.updateUserProfile(formData.name, avatarUrl);
        if (result.success) {
          setShowSuccess(true);
          
        } else {
          setShowError(true);
        }
        
      } 
    } catch (error) {
      setShowError(true);
    } finally {
      setIsUploadingAvatar(false);
    }
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
          {isLoadingProfile ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Loading profile...</span>
            </div>
          ) : (
            <>
              {showSuccess && (
                <Alert className="mb-6 border-green-200 bg-green-50 animate-in slide-in-from-top-2 duration-500">
                  <CheckCircle className="h-4 w-4 text-green-600 animate-pulse" />
                  <AlertDescription className="text-green-800">
                    <div className="flex items-center gap-2">
                      <span>Your account information has been updated successfully!</span>
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-ping"></div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {showError && (
                <Alert className="mb-6 border-red-200 bg-red-50 animate-in slide-in-from-top-2 duration-500">
                  <AlertCircle className="h-4 w-4 text-red-600 animate-pulse" />
                  <AlertDescription className="text-red-800">
                    <div className="flex items-center gap-2">
                      <span>Failed to update account information. Please try again.</span>
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload Section */}
            <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
              <div className="relative group">
                {/* Avatar with animated border */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border-2 border-gray-200">
                  <Image
                    src={formData?.avatar || "/defaultAva.jpg"}
                    alt="Avatar"
                    width={60}
                    height={60}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                
                
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Picture</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload a new profile picture. JPG, PNG or GIF. Max 5MB.
                </p>
                
                <div className="flex gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="bg-gradient-to-r from-[#007BFF] to-[#06B6D4] text-white hover:from-[#0056CC] hover:to-[#0891B2] rounded-lg px-6 py-2 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-50"
                  >
                    {isUploadingAvatar ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="animate-pulse">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 animate-bounce" />
                        <span>Choose File</span>
                      </>
                    )}
                  </Button>
                  
                  {/* Upload progress indicator */}
                  {isUploadingAvatar && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-[#007BFF] rounded-full animate-pulse"></div>
                      <span>Processing image...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="mt-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-[#007BFF] focus:border-transparent transition-all duration-300 hover:border-[#007BFF] hover:shadow-md focus:shadow-lg"
              />
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
                  disabled
                  className="rounded-xl border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white rounded-xl hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:scale-100 disabled:opacity-50 group"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="animate-pulse">Updating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Update Account Information</span>
                    <div className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                )}
              </Button>
            </form>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
