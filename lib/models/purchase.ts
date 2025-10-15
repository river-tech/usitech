import { PurchaseStatus, PaymentMethod } from "./enums";

// 💰 PURCHASES & INVOICES MODELS

export interface Purchase {
  id: string;
  user_id: string;
  workflow_id: string;
  bank_account: string;
  bank_name: string;
  transfer_code: string;
  amount: number;
  status: PurchaseStatus;
  payment_method: PaymentMethod;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePurchaseRequest {
  user_id: string;
  workflow_id: string;
  bank_account: string;
  bank_name: string;
  transfer_code: string;
  amount: number;
  payment_method?: PaymentMethod;
}

export interface UpdatePurchaseRequest {
  status?: PurchaseStatus;
  paid_at?: string;
}

export interface PurchaseWithDetails extends Purchase {
  user: {
    id: string;
    name: string;
    email: string;
  };
  workflow: {
    id: string;
    title: string;
    price: number;
  };
  invoice?: Invoice;
}

export interface Invoice {
  id: string;
  purchase_id: string;
  invoice_number: string;
  billing_name: string;
  billing_email: string;
  amount: number;
  issued_at: string;
  created_at: string;
}

export interface CreateInvoiceRequest {
  purchase_id: string;
  billing_name: string;
  billing_email: string;
  amount: number;
}

export interface InvoiceWithPurchase extends Invoice {
  purchase: {
    id: string;
    user_id: string;
    workflow_id: string;
    amount: number;
    status: PurchaseStatus;
    created_at: string;
  };
}
