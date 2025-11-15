export type WorkflowFlowData = Record<string, unknown>;

export interface PurchasedWorkflow {
  id: string;
  title: string;
  description: string;
  price: number;
  status: string;
  features: string[];
  downloads_count: number;
  time_to_setup: number;
  video_demo: string;
  flow: WorkflowFlowData;
  rating_avg: number;
  created_at: string;
  updated_at: string;
  categories: string[];
}
