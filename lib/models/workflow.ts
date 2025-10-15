import { WorkflowStatus } from "./enums";

// 💼 WORKFLOW MARKETPLACE MODELS

export interface Workflow {
  id: string;
  title: string;
  description: string;
  price: number;
  status: WorkflowStatus;
  features: string[];
  downloads_count: number;
  time_to_setup: number;
  video_demo: string;
  flow: Record<string, any>; // JSONB type
  rating_avg: number;
  created_at: string;
  updated_at: string;
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

export interface WorkflowWithDetails extends Workflow {
  categories: Category[];
  assets: WorkflowAsset[];
  comments_count: number;
  is_favorited?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
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
