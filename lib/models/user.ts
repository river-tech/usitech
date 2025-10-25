import { UserRole } from "./enums";

// 👤 USER MANAGEMENT MODELS

export interface User {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
  password_hash: string;
  role: UserRole;
  is_deleted: boolean;
  created_at: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar_url?: string;
}

export interface UserProfile {
  id: string;
  avatar_url: string;
  name: string;
  email: string;
  created_at: string;
}

export interface DashboardUser {
  total_purchases: number;
  total_spent: number;
  active_workflows: number;
  saved_workflows: number;
}
