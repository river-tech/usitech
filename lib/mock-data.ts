import { PurchaseStatus } from "./types";

export type MockUserPurchase = {
  id: string;
  workflow: string;
  date: string;
  price: number;
  category: string;
  image: string;
  payment: string;
  status: PurchaseStatus;
};

export const mockUserPurchases: MockUserPurchase[] = [
  {
    id: "1",
    workflow: "CRM Data Sync",
    category: "CRM",
    image: "/background1.png",
    date: "2025-10-02",
    price: 79,
    payment: "Credit Card",
    status: PurchaseStatus.Active,
  },
  {
    id: "2",
    workflow: "Social Media Automation",
    category: "Marketing",
    image: "/background1.png",
    date: "2025-09-28",
    price: 35,
    payment: "PayPal",
    status: PurchaseStatus.Active,
  },
  {
    id: "3",
    workflow: "Lead Generation Bot",
    category: "AI",
    image: "/background1.png",
    date: "2025-09-20",
    price: 55,
    payment: "Bank Transfer",
    status: PurchaseStatus.Pending,
  },
  {
    id: "4",
    workflow: "E-commerce Tracker",
    category: "E-commerce",
    image: "/background1.png",
    date: "2025-08-12",
    price: 99,
    payment: "Credit Card",
    status: PurchaseStatus.Pending,
  },
];

export type MockNotification = {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  unread?: boolean;
};

export const mockNotifications: MockNotification[] = [
  {
    id: "1",
    title: "Workflow Update Available",
    message: "The Email Marketing Automation workflow v2.1 is now live.",
    timeAgo: "2 hours ago",
    unread: true,
  },
  {
    id: "2",
    title: "Purchase Confirmed",
    message: "Your purchase of CRM Data Sync has been completed successfully.",
    timeAgo: "1 day ago",
    unread: false,
  },
  {
    id: "3",
    title: "New Feature Release",
    message: "Try out the new AI-powered Workflow Generator now!",
    timeAgo: "3 days ago",
    unread: true,
  },
  {
    id: "4",
    title: "System Maintenance",
    message: "Scheduled downtime on Oct 10, 2:00 AM UTC.",
    timeAgo: "5 days ago",
    unread: false,
  },
];


