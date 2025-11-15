export interface Notification {
  id: string;
  user_id: string;
  type: string;
  notification_type?: string; // Type from socket notification (e.g., "SUCCESS", "ERROR", "WARNING", "INFO")
  title: string;
  message: string;
  is_unread: boolean;
  created_at: string;
}
