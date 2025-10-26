import { WorkflowStatus } from "./enums";

// 💼 WORKFLOW MARKETPLACE MODELS

export interface Workflow {
  id: string;
  title: string;
  wishlist_count: number;
  description: string;
  price: number;
  status: WorkflowStatus;
  features: string[];
  downloads_count: number;
  time_to_setup: number;
  video_demo: string;
  flow: Record<string, any>;
  rating_avg: number;
  created_at: string;
  updated_at: string;
  categories: string[];
  image_urls: string[];
  is_like?: boolean; // Field từ workflow detail API
  is_buy?: boolean;
}



export interface CreateWorkflowRequest {
  title: string;
  description: string;
  price: number;
  features: string[];
  time_to_setup: number;
  video_demo: string;
  flow: Record<string, any>;
}

export interface UpdateWorkflowRequest {
  title?: string;
  description?: string;
  price?: number;
  status?: WorkflowStatus;
  features?: string[];
  time_to_setup?: number;
  video_demo?: string;
  flow?: Record<string, any>;
}
export interface DetailWorkflow {
  id: string;
  title: string;
  description: string;
  price: number;
  status: WorkflowStatus;
  features: string[];
  downloads_count: number;
  wishlist_count: number;
  time_to_setup: number;
  video_demo: string;
  flow: Record<string, any>;
  rating_avg: number;
  created_at: string;
  updated_at: string;
  categories: string[];
  image_urls: string[];
  is_like: boolean;
  is_buy :boolean ;
}

export interface Invoice {
  invoice_number: string;
  issued_at: string;
  status: string;
  billing_name: string;
  billing_email: string;
  workflow: Workflow;
  amount: number;
}

export interface RelatedWorkflow {
  id: string;
  title: string;
  thumbnail_url: string;
  rating_avg: number;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  icon_url: string;
  workflows_count: number;
}

export interface CreateCategoryRequest {
  name: string;
  image_url: string;
}

export interface WorkflowCategory {
  id: string;
  workflow_id: string;
  category_id: string;
  created_at: string;
}

export interface WorkflowAsset {
  id: string;
  workflow_id: string;
  asset_url: string;
  kind: string;
  created_at: string;
}

export interface CreateWorkflowAssetRequest {
  workflow_id: string;
  asset_url: string;
  kind: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  workflow_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  workflow_id: string;
  user_id: string;
  rating: number;
  parent_comment_id?: string;
  content: string;
  likes_count: number;
  created_at: string;
}

export interface CreateCommentRequest {
  workflow_id: string;
  user_id: string;
  rating: number;
  parent_comment_id?: string;
  content: string;
}

export interface CommentWithUser extends Comment {
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
  replies?: CommentWithUser[];
}
