// ENUMS
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

export enum WorkflowStatus {
  ACTIVE = "active",
  EXPIRED = "expired"
}

export enum PurchaseStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  REJECT = "REJECT"
}


export enum DepositStatus {
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  FAILED = "FAILED"
}

export enum PaymentMethod {
  QR = "QR"
}

export enum NotificationType {
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR"
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",   
  PURCHASE = "PURCHASE",  
  REFUND = "REFUND"      
}