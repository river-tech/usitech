import * as React from "react";
import { X } from "lucide-react";

export type SimpleNotification = {
  id: string | number;
  title: string;
  message: string;
  timeAgo: string;
  unread?: boolean;
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
  return (
    <div
      onClick={() => onMarkRead(String(notif.id))}
      className={`relative cursor-pointer rounded-2xl border p-4 pr-10 mb-3 transition hover:shadow-md ${
        notif.unread
          ? "bg-blue-50/80 border-blue-100"
          : "bg-white border-gray-100"
      }`}
   >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(String(notif.id));
        }}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
      >
        <X className="w-4 h-4" />
      </button>

      <h4
        className={`font-semibold ${notif.unread ? "text-[#0F172A]" : "text-gray-800"}`}
      >
        {notif.title}
      </h4>
      <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
      <p className="text-xs text-gray-400 mt-2">{notif.timeAgo}</p>
    </div>
  );
}


