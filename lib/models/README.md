# Database Models

Thư mục này chứa tất cả các TypeScript models dựa trên database schema của USITech.

## Cấu trúc thư mục

```
lib/models/
├── enums.ts          # Tất cả các enum types
├── user.ts           # User management models
├── notification.ts    # Notification models
├── contact.ts        # Contact message models
├── workflow.ts       # Workflow marketplace models
├── purchase.ts       # Purchase & invoice models
├── index.ts          # Export tất cả models
└── README.md         # Documentation này
```

## Các Models chính

### 1. **Enums** (`enums.ts`)
- `UserRole`: USER, ADMIN
- `WorkflowStatus`: active, expired
- `PurchaseStatus`: ACTIVE, PENDING, REJECT
- `PaymentMethod`: QR
- `NotificationType`: SUCCESS, WARNING, ERROR

### 2. **User Management** (`user.ts`)
- `User`: Model chính cho user
- `UserProfile`: Profile public của user
- `CreateUserRequest`: Request tạo user mới
- `UpdateUserRequest`: Request cập nhật user

### 3. **Notifications** (`notification.ts`)
- `Notification`: Model thông báo
- `CreateNotificationRequest`: Tạo thông báo mới
- `UpdateNotificationRequest`: Cập nhật thông báo
- `NotificationWithUser`: Thông báo kèm thông tin user

### 4. **Contact Messages** (`contact.ts`)
- `ContactMessage`: Model tin nhắn liên hệ
- `CreateContactMessageRequest`: Tạo tin nhắn mới
- `UpdateContactMessageRequest`: Cập nhật trạng thái
- `ContactMessageWithStats`: Tin nhắn kèm thống kê

### 5. **Workflow Marketplace** (`workflow.ts`)
- `Workflow`: Model workflow chính
- `Category`: Danh mục workflow
- `WorkflowAsset`: Assets của workflow
- `Comment`: Bình luận workflow
- `Favorite`: Workflow yêu thích
- Các request/response models tương ứng

### 6. **Purchases & Invoices** (`purchase.ts`)
- `Purchase`: Model giao dịch mua
- `Invoice`: Model hóa đơn
- `CreatePurchaseRequest`: Tạo giao dịch mới
- `UpdatePurchaseRequest`: Cập nhật giao dịch
- Các models kèm thông tin chi tiết

## Cách sử dụng

```typescript
// Import tất cả models
import { User, Workflow, Notification, PurchaseStatus } from '@/lib/models';

// Hoặc import từng loại
import { User, CreateUserRequest } from '@/lib/models/user';
import { Workflow, Category } from '@/lib/models/workflow';
```

## Lưu ý

- Tất cả models đều có TypeScript interfaces rõ ràng
- Có đầy đủ request/response models cho API
- Models có thể kèm thông tin liên quan (ví dụ: `WorkflowWithDetails`)
- Backward compatibility được duy trì trong `lib/types.ts`
