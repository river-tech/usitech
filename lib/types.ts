export enum PurchaseStatus {
  Active = "Active",
  Pending = "Pending",
  Reject = "Reject",
}

export enum NotificationType {
  SUCCESS = "SUCCESS",
  WARNING = "WARNING", 
  ERROR = "ERROR",
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_unread: boolean;
  created_at: string;
}


