export interface Workflow {
  id: string;
  title: string;
  category: string;
  rating: number;
  description: string;
  tags: string[];
  features: string[];
  downloads: number;
  price: number;
  image: string[];
  author: string;
  timeToSetup: string;
  featured?: boolean;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
}
