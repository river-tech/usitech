"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import NotificationApi from '../api/Notification';
import { Notification } from '../models/notification';
import { useNotificationWebSocket } from '../socket';
import { showAlert, ToastType } from './ToastContext';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  getNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<{ success: boolean; error?: string }>;
  deleteNotification: (notificationId: string) => Promise<{ success: boolean; error?: string }>;
  deleteAllNotifications: () => Promise<{ success: boolean; error?: string }>;
  refreshNotifications: () => Promise<void>;
}

// Global reference for notifications loader (set by NotificationProvider)
let globalGetNotifications: (() => Promise<void>) | null = null;

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  // Memoize notificationApi to prevent recreation on every render
  const notificationApi = React.useMemo(() => NotificationApi(), []);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to add new notification
  const addNotification = React.useCallback((notification: Notification) => {
    setNotifications(prev => {
      // Kiểm tra xem notification đã tồn tại chưa
      const exists = prev.some(n => n.id === notification.id);
      if (exists) {
        return prev;
      }
      // Thêm notification mới vào đầu danh sách
      return [notification, ...prev];
    });
  }, []);

  // Map notification type to toast type
  const mapNotificationTypeToToastType = React.useCallback((notificationType: string): ToastType => {
    const typeLower = notificationType?.toLowerCase() || '';
    if (typeLower === 'success' || typeLower === 'completed' || typeLower === 'approved') {
      return 'success';
    } else if (typeLower === 'error' || typeLower === 'failed' || typeLower === 'rejected') {
      return 'error';
    } else if (typeLower === 'warning' || typeLower === 'pending' || typeLower === 'alert') {
      return 'warning';
    } else {
      return 'info';
    }
  }, []);

  // Use ref to store latest callbacks to avoid recreation
  const addNotificationRef = React.useRef(addNotification);
  const mapNotificationTypeToToastTypeRef = React.useRef(mapNotificationTypeToToastType);

  // Update refs when callbacks change
  React.useEffect(() => {
    addNotificationRef.current = addNotification;
    mapNotificationTypeToToastTypeRef.current = mapNotificationTypeToToastType;
  }, [addNotification, mapNotificationTypeToToastType]);

  // Connect to WebSocket for real-time notification updates
  // Stable callback using refs to prevent infinite loops
  const handleNotificationUpdate = React.useCallback((data: any) => {
    console.log("NotificationContext received WebSocket data (onNotificationUpdate):", data);
    
    // Handle different data formats
    let notificationToAdd: Notification | null = null;
    
    // Case 1: { type: "notification", notification: {...} }
    if (data?.type === "notification" && data?.notification) {
      console.log("data.notification", data.notification);
      notificationToAdd = data.notification as Notification;
      notificationToAdd.type = data.notification.notification_type;
    }
    // Case 2: Data itself is the notification { id, title, message, ... }
    else if (data?.id && data?.title) {
      notificationToAdd = data as unknown as Notification;
      notificationToAdd.type = data.notification_type;
    }
    // Case 3: { notification: {...} } without type
    else if (data?.notification) {
      notificationToAdd = data.notification as Notification;
      notificationToAdd.type = data.notification?.notification_type;
    }
    
    if (notificationToAdd) {
      console.log("Adding new notification:", notificationToAdd);
      // Use ref to avoid dependency issues
      addNotificationRef.current(notificationToAdd);
      
      // Show toast notification - use notification_type from socket notification
      const notificationType = notificationToAdd.notification_type || notificationToAdd.type;
      const toastType = mapNotificationTypeToToastTypeRef.current(notificationType);
      showAlert(
        notificationToAdd.message || notificationToAdd.title,
        toastType,
        5000
      );
    } else {
      console.log("Unknown notification data format, data:", data);
    }
  }, []); // Empty deps - use refs instead to prevent infinite loops

  const { isConnected } = useNotificationWebSocket(handleNotificationUpdate);

  // Calculate unread count
  const unreadCount = notifications.filter(n => n.is_unread).length;

  const getNotifications = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await notificationApi.getMyNotifications();
      if (result.success) {
        setNotifications(result.data);
      } else {
        setError(result.error || "Failed to load notifications");
      }
    } catch (error) {
      setError("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  }, [notificationApi]);

  const refreshNotifications = React.useCallback(async () => {
    await getNotifications();
  }, [getNotifications]);

  // Log WebSocket connection status - chỉ log một lần khi mount
  useEffect(() => {
    const checkConnection = () => {
      if (isConnected()) {
        console.log("✅ WebSocket connected - Ready to receive notification updates");
      }
    };
    
    // Check ngay lập tức và sau 1 giây
    checkConnection();
    const timer = setTimeout(checkConnection, 1000);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Chỉ chạy một lần khi mount

  // Load notifications on mount
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const markAsRead = async (notificationId: string) => {
    try {
      const result = await notificationApi.markNotificationAsRead(notificationId);
      if (result.success) {
        // Cập nhật local state
        setNotifications(prev => 
          prev.map(n => 
            n.id === notificationId 
              ? { ...n, is_unread: false }
              : n
          )
        );
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: "Failed to mark notification as read" };
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const result = await notificationApi.deleteNotification(notificationId);
      if (result.success) {
        // Xóa khỏi local state
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: "Failed to delete notification" };
    }
  };

  const deleteAllNotifications = async () => {
    try {
      const result = await notificationApi.deleteAllNotifications();
      if (result.success) {
        // Xóa tất cả khỏi local state
        setNotifications([]);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: "Failed to delete all notifications" };
    }
  };

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    isLoading,
    error,
    getNotifications,
    markAsRead,
    deleteNotification,
    deleteAllNotifications,
    refreshNotifications,
  };

  // Set global reference so AuthContext can call it
  React.useEffect(() => {
    globalGetNotifications = getNotifications;
    return () => {
      globalGetNotifications = null;
    };
  }, [getNotifications]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// Export function to get notifications from outside React context
export function loadNotificationsOnAuth() {
  if (globalGetNotifications) {
    return globalGetNotifications();
  }
  return Promise.resolve();
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

