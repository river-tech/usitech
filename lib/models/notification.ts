export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_unread: boolean;
  created_at: string;
}

export interface NotificationResponse {
  success: boolean;
  message: string;
  deleted_count?: number;
}