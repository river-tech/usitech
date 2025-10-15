import * as React from "react";
import { X, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { NotificationType } from "../../../lib/models";

export type SimpleNotification = {
  id: string | number;
  title: string;
  message: string;
  timeAgo: string;
  unread?: boolean;
  type?: NotificationType;
};

export default function NotificationCard({
  notif,
  onDelete,
  onMarkRead,
}: {
  notif: SimpleNotification;
  onDelete: (id: string) => void;
  onMarkRead: (id: string) => void;
}) {
  const getNotificationStyles = (type?: NotificationType, unread?: boolean) => {
    const baseStyles = "relative cursor-pointer rounded-2xl border p-4 pr-10 mb-3 transition hover:shadow-md";
    
    if (!type) {
      return `${baseStyles} ${unread ? "bg-blue-50/80 border-blue-100" : "bg-white border-gray-100"}`;
    }

    switch (type) {
      case NotificationType.SUCCESS:
        return `${baseStyles} ${unread ? "bg-green-50/80 border-green-100" : "bg-white border-green-100"}`;
      case NotificationType.WARNING:
        return `${baseStyles} ${unread ? "bg-yellow-50/80 border-yellow-100" : "bg-white border-yellow-100"}`;
      case NotificationType.ERROR:
        return `${baseStyles} ${unread ? "bg-red-50/80 border-red-100" : "bg-white border-red-100"}`;
      default:
        return `${baseStyles} ${unread ? "bg-blue-50/80 border-blue-100" : "bg-white border-gray-100"}`;
    }
  };

  const getIcon = (type?: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS:
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case NotificationType.WARNING:
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case NotificationType.ERROR:
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTitleColor = (type?: NotificationType, unread?: boolean) => {
    if (!unread) return "text-gray-800";
    
    switch (type) {
      case NotificationType.SUCCESS:
        return "text-green-900";
      case NotificationType.WARNING:
        return "text-yellow-900";
      case NotificationType.ERROR:
        return "text-red-900";
      default:
        return "text-[#0F172A]";
    }
  };

  return (
    <div
      onClick={() => onMarkRead(String(notif.id))}
      className={getNotificationStyles(notif.type, notif.unread)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(String(notif.id));
        }}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">
          {getIcon(notif.type)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold ${getTitleColor(notif.type, notif.unread)}`}>
            {notif.title}
          </h4>
          <p className="text-gray-600 text-sm mt-1 leading-relaxed">{notif.message}</p>
          <p className="text-xs text-gray-400 mt-2">{notif.timeAgo}</p>
        </div>
      </div>
    </div>
  );
}


