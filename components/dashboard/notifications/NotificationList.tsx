"use client";

import { useState } from "react";
import NotificationCard, { type SimpleNotification } from "./NotificationCard";
import NotificationHeader from "./NotificationHeader";
import { mockNotifications } from "../../../lib/mock-data";

export default function NotificationList() {
  const [notifications, setNotifications] = useState<SimpleNotification[]>(mockNotifications);
  const [filter, setFilter] = useState("All");

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => String(n.id) !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (String(n.id) === id ? { ...n, unread: false } : n)));
  };

  const filteredNotifs = filter === "Unread" ? notifications.filter((n) => n.unread) : notifications;
  const totalUnread = notifications.filter((n) => n.unread).length;

  return (
    <div>
      <NotificationHeader onClearAll={handleClearAll} filter={filter} setFilter={setFilter} totalUnread={totalUnread} />

      {filteredNotifs.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifs.map((n) => (
            <NotificationCard key={n.id} notif={n} onDelete={handleDelete} onMarkRead={handleMarkRead} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">No notifications found.</div>
      )}
    </div>
  );
}


