// Legacy types - use models from lib/models instead
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

// Re-export from models for backward compatibility
export { 
  PurchaseStatus as NewPurchaseStatus,
  NotificationType as NewNotificationType,
  User,
  Notification,
  Workflow,
  Category,
  Comment,
  Purchase,
  Invoice
} from "./models";


