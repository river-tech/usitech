export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  subject?: string;
  message: string;
  is_resolved: boolean;
  created_at: string;
}

export interface CreateContactMessageRequest {
  full_name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface UpdateContactMessageRequest {
  is_resolved?: boolean;
}

export interface ContactMessageWithStats {
  id: string;
  full_name: string;
  email: string;
  subject?: string;
  message: string;
  is_resolved: boolean;
  created_at: string;
  resolved_at?: string;
}
