import { NotificationType } from "./enums";

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_unread: boolean;
  created_at: string;
}

export interface CreateNotificationRequest {
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
}

export interface UpdateNotificationRequest {
  is_unread?: boolean;
}

export interface NotificationWithUser {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_unread: boolean;
  created_at: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
