import { PurchaseStatus, NotificationType } from "./models/enums";
import { Notification } from "./models";

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
    price: 1896000,
    payment: "Credit Card",
    status: PurchaseStatus.ACTIVE,
  },
  {
    id: "2",
    workflow: "Social Media Automation",
    category: "Marketing",
    image: "/background1.png",
    date: "2025-09-28",
    price: 840000,
    payment: "PayPal",
    status: PurchaseStatus.ACTIVE,
  },
  {
    id: "3",
    workflow: "Lead Generation Bot",
    category: "AI",
    image: "/background1.png",
    date: "2025-09-20",
    price: 1320000,
    payment: "Bank Transfer",
    status: PurchaseStatus.PENDING,
  },
  {
    id: "4",
    workflow: "E-commerce Tracker",
    category: "E-commerce",
    image: "/background1.png",
    date: "2025-08-12",
    price: 2376000,
    payment: "Credit Card",
    status: PurchaseStatus.PENDING,
  },
];

export type MockNotification = {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  unread?: boolean;
  type?: NotificationType;
};

export const mockNotifications: MockNotification[] = [
  {
    id: "1",
    title: "Workflow Update Available",
    message: "The Email Marketing Automation workflow v2.1 is now live with new features and improvements.",
    timeAgo: "2 hours ago",
    unread: true,
    type: NotificationType.SUCCESS,
  },
  {
    id: "2",
    title: "Purchase Confirmed",
    message: "Your purchase of CRM Data Sync has been completed successfully. You can now access it in your dashboard.",
    timeAgo: "1 day ago",
    unread: false,
    type: NotificationType.SUCCESS,
  },
  {
    id: "3",
    title: "New Feature Release",
    message: "Try out the new AI-powered Workflow Generator now! Create custom workflows in minutes.",
    timeAgo: "3 days ago",
    unread: true,
    type: NotificationType.SUCCESS,
  },
  {
    id: "4",
    title: "System Maintenance Warning",
    message: "Scheduled maintenance will occur on Oct 10, 2:00 AM UTC. Some features may be temporarily unavailable.",
    timeAgo: "5 days ago",
    unread: false,
    type: NotificationType.WARNING,
  },
  {
    id: "5",
    title: "Payment Failed",
    message: "Your payment for the Marketing Automation workflow failed. Please update your payment method.",
    timeAgo: "1 week ago",
    unread: true,
    type: NotificationType.ERROR,
  },
  {
    id: "6",
    title: "Account Security Alert",
    message: "We detected unusual activity on your account. Please verify your identity to secure your account.",
    timeAgo: "2 weeks ago",
    unread: false,
    type: NotificationType.WARNING,
  },
  {
    id: "7",
    title: "Workflow Execution Error",
    message: "Your CRM Data Sync workflow encountered an error. Please check your configuration and try again.",
    timeAgo: "3 weeks ago",
    unread: true,
    type: NotificationType.ERROR,
  },
  {
    id: "8",
    title: "Welcome to USITech!",
    message: "Thank you for joining USITech! Explore our workflow marketplace to boost your productivity.",
    timeAgo: "1 month ago",
    unread: false,
    type: NotificationType.SUCCESS,
  },
];

export type MockComment = {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  rating?: number;
  replies?: MockComment[];
};

export const mockWorkflowDetails = [
  {
    id: "1",
    title: "Advanced Email Marketing Automation",
    category: "Marketing",
    date: "2025-10-08",
    video: "/videos/email-automation-demo.mp4",
    docs: [
      "How to install the workflow",
      "Integrate with your CRM (HubSpot, Zoho)",
      "Setting up triggers and conditions",
      "Tracking performance and ROI metrics",
      "Advanced segmentation strategies",
      "A/B testing best practices"
    ],
  },
  {
    id: "2",
    title: "CRM Data Sync Engine",
    category: "CRM",
    date: "2025-09-20",
    video: "/videos/crm-sync-demo.mp4",
    docs: [
      "Connecting to data sources",
      "Mapping and synchronization rules",
      "Error handling best practices",
      "Performance optimization tips",
      "Security and compliance guidelines"
    ],
  },
  {
    id: "3",
    title: "Lead Capture to CRM",
    category: "CRM",
    date: "2025-10-02",
    video: "/videos/lead-capture-demo.mp4",
    docs: [
      "Setting up lead capture forms",
      "CRM integration configuration",
      "Lead scoring and qualification",
      "Automated follow-up sequences",
      "Reporting and analytics setup"
    ],
  },
];

export const mockComments: MockComment[] = [
  {
    id: "1",
    author: {
      name: "Nguyễn Văn A",
    },
    content: "This workflow is very useful! I've used it to automate sales processes and save a lot of time. Thanks to the author!",
    createdAt: "2024-01-15T10:30:00Z",
    rating: 5,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Trần Thị B",
        },
        content: "I'm also using this workflow, very effective!",
        createdAt: "2024-01-15T11:45:00Z",
        replies: [
          {
            id: "1-1-1",
            author: {
              name: "You",
            },
        content: "Thanks for sharing your experience!",
        createdAt: "2024-01-15T12:00:00Z",
          }
        ]
      }
    ]
  },
  {
    id: "2",
    author: {
      name: "Lê Minh C",
    },
    content: "Does anyone know how to customize this workflow to fit our company's CRM system? I'm having trouble with integration.",
    createdAt: "2024-01-14T15:20:00Z",
    rating: 4,
    replies: [
      {
        id: "2-1",
        author: {
          name: "Phạm Văn D",
        },
        content: "You can contact the author directly via email. They are very supportive!",
        createdAt: "2024-01-14T16:30:00Z",
      }
    ]
  },
  {
    id: "3",
    author: {
      name: "Hoàng Thị E",
    },
    content: "This workflow has helped me increase work efficiency by 40%. Very worth the investment!",
    createdAt: "2024-01-13T09:15:00Z",
    rating: 5,
  },
  {
    id: "4",
    author: {
      name: "Vũ Văn F",
    },
    content: "I've purchased and used this workflow for 2 months. Results are great, but there are some UI improvements needed.",
    createdAt: "2024-01-12T14:45:00Z",
    rating: 3,
  },
  {
    id: "5",
    author: {
      name: "Đặng Thị G",
    },
    content: "Can anyone guide me on how to set up this workflow from scratch? I'm new and don't have much experience.",
    createdAt: "2024-01-11T20:30:00Z",
    rating: 4,
    replies: [
      {
        id: "5-1",
        author: {
          name: "Bùi Văn H",
        },
        content: "I can guide you. You can contact me via email: buivanh@example.com",
        createdAt: "2024-01-11T21:00:00Z",
      },
      {
        id: "5-2",
        author: {
          name: "Nguyễn Văn A",
        },
        content: "I'm also ready to help! We can create a group chat to discuss.",
        createdAt: "2024-01-11T21:15:00Z",
      }
    ]
  }
];


