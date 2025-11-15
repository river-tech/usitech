"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNotification } from "../../../../lib/contexts/NotificationContext";
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Trash2, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";

export default function NotificationsPage() {
  const { 
    notifications, 
    isLoading: loading, 
    error,
    markAsRead,
    deleteNotification,
    deleteAllNotifications,
    refreshNotifications
  } = useNotification();
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleMarkAsRead = async (notificationId: string) => {
    setActionLoading(notificationId);
    try {
      await markAsRead(notificationId);
    } catch {
      // Error marking notification as read
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    setActionLoading(notificationId);
    try {
      await deleteNotification(notificationId);
    } catch {
      // Error deleting notification
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteAll = async () => {
    setActionLoading('all');
    try {
      await deleteAllNotifications();
    } catch {
      // Error deleting all notifications
    } finally {
      setActionLoading(null);
    }
  };

  const getNotificationStyles = (type: string, isUnread: boolean) => {
    if (isUnread) {
      return "bg-[#EAF4FF] border-[#cfe5ff]";
    }

    switch (type.toLowerCase()) {
      case 'success':
        return "bg-green-50 border-green-200";
      case 'warning':
        return "bg-yellow-50 border-yellow-200";
      case 'error':
        return "bg-red-50 border-red-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
    }
  };

  const formatTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const unreadCount = notifications.filter(n => n.is_unread).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF2FF] via-[#F8FAFC] to-white">
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[#007BFF] hover:text-[#0056CC] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#002B6B] mb-2">Notifications</h1>
              <p className="text-gray-600">Stay updated with your account activity</p>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-[#002B6B]">
                {notifications.length} {notifications.length === 1 ? 'Notification' : 'Notifications'}
              </div>
              {unreadCount > 0 && (
                <div className="text-sm text-[#007BFF] font-medium">
                  {unreadCount} unread
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {notifications.length > 0 && (
          <div className="mb-6 flex gap-3">
            <Button
              onClick={handleDeleteAll}
              disabled={actionLoading === 'all'}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              {actionLoading === 'all' ? (
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete All
            </Button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading notifications...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-600 font-medium mb-2">Error Loading Notifications</div>
            <div className="text-red-500 text-sm">{error}</div>
            <Button onClick={() => refreshNotifications()}>Refresh</Button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-gray-600 font-medium mb-2">No Notifications</div>
            <div className="text-gray-500 text-sm">You&apos;re all caught up! No new notifications.</div>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`rounded-2xl border ${getNotificationStyles(
                  notification.type,
                  notification.is_unread
                )} p-6 shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-[#0F172A] mb-2">
                          {notification.title}
                        </div>
                        <div className="text-gray-700 text-sm mb-3">
                          {notification.message}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatTime(notification.created_at)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {notification.is_unread && (
                          <Button
                            onClick={() => handleMarkAsRead(notification.id)}
                            disabled={actionLoading === notification.id}
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:bg-green-50"
                          >
                            {actionLoading === notification.id ? (
                              <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                        
                        <Button
                          onClick={() => handleDeleteNotification(notification.id)}
                          disabled={actionLoading === notification.id}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          {actionLoading === notification.id ? (
                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
