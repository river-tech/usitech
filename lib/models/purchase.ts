export interface Purchase {
  id: string;
  workflow_id: string;
  workflow_title: string;
  amount: number;
  status: string;
  payment_method: string;
  paid_at: string;
  created_at: string;
}

export interface PurchaseItem {
  id: string;
  name: string;
  date: string;
  price: string;
  status: "Active" | "Expired";
  category?: string;
  thumbnailUrl?: string;
}