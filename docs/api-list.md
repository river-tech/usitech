# 🧠 USITech API Specification Map

**Generated:** $(date)  
**Project:** USITech Workflow Marketplace  
**Status:** Frontend-only application with comprehensive API requirements identified

---

## 🎯 Executive Summary

**CRITICAL FINDING:** This USITech project is currently a **frontend-only application** with **no backend API routes** implemented. All data is served through static mock data files. However, the frontend components and pages reveal a comprehensive set of API requirements for a full-featured workflow marketplace.

**Analysis Results:**
- ✅ **Frontend Components:** Fully implemented with rich functionality
- ✅ **Database Schema:** Complete v2.7 design with 11 core tables
- ✅ **API Requirements:** 67 endpoints identified across client and admin sites
- ❌ **Backend Implementation:** 0% complete (0/67 endpoints implemented)

---

## 🧭 CLIENT SITE (usitech.io.vn)

### 🔐 Authentication & User Management

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/auth/register` | POST | Register new user account | Public | `auth/register/page.tsx` | users | `{name, email, password}` | `{user, token}` | ❌ Missing |
| `/api/auth/login` | POST | Authenticate user login | Public | `auth/login/page.tsx` | users | `{email, password}` | `{user, token}` | ❌ Missing |
| `/api/auth/logout` | POST | User logout | User | `components/shared/Header.tsx` | users | `{}` | `{success}` | ❌ Missing |
| `/api/auth/forgot-password` | POST | Request password reset | Public | `auth/forgot-password/page.tsx` | users | `{email}` | `{success}` | ❌ Missing |
| `/api/auth/reset-password` | POST | Reset password with token | Public | `components/auth/ResetPasswordForm.tsx` | users | `{token, password}` | `{success}` | ❌ Missing |
| `/api/auth/verify-otp` | POST | Verify OTP for password reset | Public | `components/auth/VerifyOtpForm.tsx` | users | `{email, otp}` | `{success}` | ❌ Missing |
| `/api/auth/me` | GET | Get current user profile | User | `components/dashboard/DashboardHeader.tsx` | users | `{}` | `User` | ❌ Missing |
| `/api/auth/profile` | PUT | Update user profile | User | `dashboard/settings/page.tsx` | users | `{name, email, avatar_url}` | `User` | ❌ Missing |
| `/api/auth/change-password` | PUT | Change user password | User | `components/dashboard/ChangePasswordForm.tsx` | users | `{currentPassword, newPassword}` | `{success}` | ❌ Missing |

### 🛍️ Workflow Marketplace

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/workflows` | GET | List all workflows with filters | Public | `workflows/page.tsx`, `search/page.tsx` | workflows, categories, workflow_assets | `{search?, category?, priceRange?, minRating?, sortBy?, page?, limit?}` | `{workflows: Workflow[], total: number}` | ❌ Missing |
| `/api/workflows/featured` | GET | Get featured workflows | Public | `components/shared/FeaturedWorkflowsSlider.tsx` | workflows, workflow_assets | `{}` | `Workflow[]` | ❌ Missing |
| `/api/workflows/[id]` | GET | Get workflow details | Public | `workflows/[id]/page.tsx` | workflows, workflow_assets, comments, categories | `{}` | `WorkflowWithDetails` | ❌ Missing |
| `/api/workflows/search` | GET | Search workflows | Public | `search/SearchClient.tsx` | workflows, categories | `{q, tags?, page?, limit?}` | `{workflows: Workflow[], total: number}` | ❌ Missing |
| `/api/workflows/category/[category]` | GET | Get workflows by category | Public | `workflows/page.tsx` | workflows, categories | `{}` | `Workflow[]` | ❌ Missing |
| `/api/workflows/[id]/download` | POST | Download workflow file | User | `components/dashboard/my-workflows/WorkflowCard.tsx` | workflows, purchases | `{}` | `{downloadUrl}` | ❌ Missing |

### 🏷️ Categories Management

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/categories` | GET | Get all categories | Public | `components/shared/FilterSidebar.tsx` | categories | `{}` | `Category[]` | ❌ Missing |
| `/api/categories/[id]` | GET | Get category details | Public | `workflows/page.tsx` | categories | `{}` | `Category` | ❌ Missing |

### 💬 Comments & Ratings

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/workflows/[id]/comments` | GET | Get workflow comments | Public | `components/workflow/CommentsSection.tsx` | comments, users | `{page?, limit?}` | `{comments: CommentWithUser[], total: number}` | ❌ Missing |
| `/api/workflows/[id]/comments` | POST | Add comment/rating | User | `components/workflow/CommentForm.tsx` | comments | `{content, rating, parent_comment_id?}` | `Comment` | ❌ Missing |
| `/api/comments/[id]` | PUT | Update comment | User | `components/workflow/CommentCard.tsx` | comments | `{content}` | `Comment` | ❌ Missing |
| `/api/comments/[id]` | DELETE | Delete comment | User | `components/workflow/CommentCard.tsx` | comments | `{}` | `{success}` | ❌ Missing |
| `/api/comments/[id]/like` | POST | Like/unlike comment | User | `components/workflow/CommentCard.tsx` | comment_likes | `{}` | `{liked: boolean}` | ❌ Missing |

### ❤️ Favorites System

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/users/[id]/favorites` | GET | Get user favorites | User | `components/dashboard/my-workflows/LikedWorkflowList.tsx` | favorites, workflows | `{}` | `Workflow[]` | ❌ Missing |
| `/api/workflows/[id]/favorite` | POST | Add to favorites | User | `components/shared/WorkflowCard.tsx` | favorites | `{}` | `{favorited: boolean}` | ❌ Missing |
| `/api/workflows/[id]/favorite` | DELETE | Remove from favorites | User | `components/shared/WorkflowCard.tsx` | favorites | `{}` | `{favorited: boolean}` | ❌ Missing |

### 💰 Purchases & Checkout

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/users/[id]/purchases` | GET | Get user purchases | User | `components/dashboard/my-workflows/PurchasedWorkflowList.tsx` | purchases, workflows, invoices | `{}` | `PurchaseWithDetails[]` | ❌ Missing |
| `/api/purchases` | POST | Create new purchase | User | `components/dashboard/checkout/CheckoutForm.tsx` | purchases, invoices | `{workflow_id, bank_account, bank_name, transfer_code, amount}` | `Purchase` | ❌ Missing |
| `/api/purchases/[id]` | GET | Get purchase details | User | `dashboard/checkout/[id]/page.tsx` | purchases, invoices, workflows | `{}` | `PurchaseWithDetails` | ❌ Missing |
| `/api/purchases/[id]/status` | PUT | Update purchase status | User | `components/dashboard/checkout/CheckoutForm.tsx` | purchases | `{status}` | `Purchase` | ❌ Missing |
| `/api/invoices/[id]` | GET | Get invoice details | User | `dashboard/checkout/[id]/invoice/page.tsx` | invoices, purchases | `{}` | `InvoiceWithPurchase` | ❌ Missing |

### 🔔 Notifications

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/users/[id]/notifications` | GET | Get user notifications | User | `components/dashboard/notifications/NotificationList.tsx` | notifications | `{page?, limit?, unread_only?}` | `{notifications: Notification[], total: number}` | ❌ Missing |
| `/api/notifications/[id]/read` | PUT | Mark notification as read | User | `components/dashboard/notifications/NotificationCard.tsx` | notifications | `{}` | `Notification` | ❌ Missing |
| `/api/notifications/[id]` | DELETE | Delete notification | User | `components/dashboard/notifications/NotificationCard.tsx` | notifications | `{}` | `{success}` | ❌ Missing |
| `/api/notifications/clear-all` | DELETE | Clear all notifications | User | `components/dashboard/notifications/NotificationHeader.tsx` | notifications | `{}` | `{success}` | ❌ Missing |

### 📞 Contact & Support

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/contact` | POST | Submit contact message | Public | `components/contact/ContactForm.tsx` | contact_messages | `{full_name, email, subject?, message}` | `{success}` | ❌ Missing |

---

## 🧑‍💼 ADMIN SITE (admin.usitech.io.vn)

### 🔐 Admin Authentication

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/admin/login` | POST | Admin login | Public | `auth/login/page.tsx` | users | `{email, password}` | `{user, token}` | ❌ Missing |
| `/api/admin/logout` | POST | Admin logout | Admin | `components/shared/Header.tsx` | users | `{}` | `{success}` | ❌ Missing |

### 📊 Dashboard Analytics

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/admin/stats` | GET | Get dashboard statistics | Admin | `dashboard/page.tsx` | workflows, users, purchases, invoices | `{}` | `{totalUsers, totalWorkflows, totalSales, totalRevenue, recentActivity}` | ❌ Missing |
| `/api/admin/analytics` | GET | Get detailed analytics | Admin | `analytics/page.tsx` | workflows, purchases, analytics_daily | `{period?, workflow_id?}` | `{sales, revenue, downloads, trends}` | ❌ Missing |

### 👥 User Management

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/admin/users` | GET | Get all users | Admin | `users/page.tsx` | users | `{page?, limit?, search?, role?}` | `{users: User[], total: number}` | ❌ Missing |
| `/api/admin/users/[id]` | GET | Get user details | Admin | `users/[id]/page.tsx` | users, purchases, notifications | `{}` | `UserWithDetails` | ❌ Missing |
| `/api/admin/users/[id]` | PUT | Update user | Admin | `users/[id]/edit/page.tsx` | users | `{name, email, role, is_deleted}` | `User` | ❌ Missing |
| `/api/admin/users/[id]` | DELETE | Delete user | Admin | `users/[id]/page.tsx` | users | `{}` | `{success}` | ❌ Missing |
| `/api/admin/users/[id]/purchases` | GET | Get user purchases | Admin | `users/[id]/purchases/page.tsx` | purchases, workflows, invoices | `{}` | `PurchaseWithDetails[]` | ❌ Missing |

### 🛍️ Workflow Management

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/admin/workflows` | GET | Get all workflows for admin | Admin | `workflows/page.tsx` | workflows, categories, workflow_assets | `{page?, limit?, search?, status?}` | `{workflows: WorkflowWithDetails[], total: number}` | ❌ Missing |
| `/api/admin/workflows` | POST | Create new workflow | Admin | `workflows/create/page.tsx` | workflows, workflow_assets | `{title, description, price, category_id, features, time_to_setup, video_demo, flow}` | `Workflow` | ❌ Missing |
| `/api/admin/workflows/[id]` | GET | Get workflow for editing | Admin | `workflows/[id]/edit/page.tsx` | workflows, workflow_assets, categories | `{}` | `WorkflowWithDetails` | ❌ Missing |
| `/api/admin/workflows/[id]` | PUT | Update workflow | Admin | `workflows/[id]/edit/page.tsx` | workflows, workflow_assets | `{title, description, price, status, features, time_to_setup, video_demo, flow}` | `Workflow` | ❌ Missing |
| `/api/admin/workflows/[id]` | DELETE | Delete workflow | Admin | `workflows/[id]/page.tsx` | workflows | `{}` | `{success}` | ❌ Missing |
| `/api/admin/workflows/[id]/assets` | POST | Upload workflow asset | Admin | `workflows/[id]/edit/page.tsx` | workflow_assets | `{asset_url, kind}` | `WorkflowAsset` | ❌ Missing |
| `/api/admin/workflows/[id]/assets/[asset_id]` | DELETE | Delete workflow asset | Admin | `workflows/[id]/edit/page.tsx` | workflow_assets | `{}` | `{success}` | ❌ Missing |

### 🏷️ Category Management

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/admin/categories` | GET | Get all categories | Admin | `categories/page.tsx` | categories | `{}` | `Category[]` | ❌ Missing |
| `/api/admin/categories` | POST | Create new category | Admin | `categories/create/page.tsx` | categories | `{name, image_url}` | `Category` | ❌ Missing |
| `/api/admin/categories/[id]` | PUT | Update category | Admin | `categories/[id]/edit/page.tsx` | categories | `{name, image_url}` | `Category` | ❌ Missing |
| `/api/admin/categories/[id]` | DELETE | Delete category | Admin | `categories/[id]/page.tsx` | categories | `{}` | `{success}` | ❌ Missing |

### 💰 Purchase Management

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/admin/purchases` | GET | Get all purchases | Admin | `purchases/page.tsx` | purchases, users, workflows, invoices | `{page?, limit?, status?, user_id?}` | `{purchases: PurchaseWithDetails[], total: number}` | ❌ Missing |
| `/api/admin/purchases/[id]` | GET | Get purchase details | Admin | `purchases/[id]/page.tsx` | purchases, users, workflows, invoices | `{}` | `PurchaseWithDetails` | ❌ Missing |
| `/api/admin/purchases/[id]/status` | PUT | Update purchase status | Admin | `purchases/[id]/page.tsx` | purchases | `{status, paid_at?}` | `Purchase` | ❌ Missing |
| `/api/admin/invoices` | GET | Get all invoices | Admin | `invoices/page.tsx` | invoices, purchases, users | `{page?, limit?}` | `{invoices: InvoiceWithPurchase[], total: number}` | ❌ Missing |

### 🔔 Notification Management

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/admin/notifications` | GET | Get all notifications | Admin | `notifications/page.tsx` | notifications, users | `{page?, limit?, user_id?}` | `{notifications: NotificationWithUser[], total: number}` | ❌ Missing |
| `/api/admin/notifications` | POST | Send notification | Admin | `notifications/create/page.tsx` | notifications | `{user_id, title, message, type}` | `Notification` | ❌ Missing |
| `/api/admin/notifications/[id]` | DELETE | Delete notification | Admin | `notifications/page.tsx` | notifications | `{}` | `{success}` | ❌ Missing |

### 📞 Contact Management

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/admin/contact-messages` | GET | Get contact messages | Admin | `contact/page.tsx` | contact_messages | `{page?, limit?, is_resolved?}` | `{messages: ContactMessage[], total: number}` | ❌ Missing |
| `/api/admin/contact-messages/[id]` | GET | Get contact message details | Admin | `contact/[id]/page.tsx` | contact_messages | `{}` | `ContactMessage` | ❌ Missing |
| `/api/admin/contact-messages/[id]` | PUT | Mark message as resolved | Admin | `contact/[id]/page.tsx` | contact_messages | `{is_resolved}` | `ContactMessage` | ❌ Missing |
| `/api/admin/contact-messages/[id]` | DELETE | Delete contact message | Admin | `contact/[id]/page.tsx` | contact_messages | `{}` | `{success}` | ❌ Missing |

### 📝 Audit Logs

| Endpoint | Method | Description | Auth Level | Used In | Database Tables | Request Body | Response Data | Status |
|-----------|--------|-------------|------------|----------|-----------------|--------------|---------------|---------|
| `/api/admin/audit-logs` | GET | Get audit logs | Admin | `logs/page.tsx` | audit_logs, users | `{page?, limit?, admin_id?, action?, target_type?}` | `{logs: AuditLogWithUser[], total: number}` | ❌ Missing |

---

## 📊 Implementation Status Summary

### Overall Progress: 0% (0/67 endpoints implemented)

| Category | Client Site | Admin Site | Total Required | Implemented | Progress |
|----------|-------------|------------|----------------|-------------|----------|
| Authentication | 9 | 2 | 11 | 0 | 0% |
| Workflows | 6 | 7 | 13 | 0 | 0% |
| Categories | 2 | 4 | 6 | 0 | 0% |
| Comments | 5 | 0 | 5 | 0 | 0% |
| Favorites | 3 | 0 | 3 | 0 | 0% |
| Purchases | 5 | 4 | 9 | 0 | 0% |
| Notifications | 4 | 3 | 7 | 0 | 0% |
| Contact | 1 | 4 | 5 | 0 | 0% |
| Analytics | 0 | 2 | 2 | 0 | 0% |
| Users | 0 | 5 | 5 | 0 | 0% |
| Audit Logs | 0 | 1 | 1 | 0 | 0% |
| **Total** | **35** | **32** | **67** | **0** | **0%** |

---

## 🚨 Critical Missing APIs

### Phase 1: Core APIs (Priority 1) - 25 endpoints
1. **Authentication APIs** (11 endpoints) - User registration, login, profile management
2. **Workflow APIs** (13 endpoints) - CRUD operations for workflows
3. **Category APIs** (6 endpoints) - Category management

### Phase 2: User Features (Priority 2) - 20 endpoints
1. **Comment APIs** (5 endpoints) - Comments and ratings system
2. **Favorite APIs** (3 endpoints) - User favorites functionality
3. **Notification APIs** (7 endpoints) - User notifications
4. **Contact APIs** (5 endpoints) - Contact form and message management

### Phase 3: Admin Features (Priority 3) - 22 endpoints
1. **Admin APIs** (22 endpoints) - Dashboard statistics, user management, workflow management

---

## 🛠️ Technology Stack Recommendations

### Backend Framework
- **FastAPI** (Python) - High performance, automatic API documentation
- **Next.js API Routes** (Node.js) - If staying in JavaScript ecosystem
- **Express.js** (Node.js) - Traditional Node.js backend

### Database & ORM
- **PostgreSQL** - Primary database
- **Prisma** - Type-safe database client
- **Redis** - Caching and session storage

### Authentication
- **JWT Tokens** - Stateless authentication
- **NextAuth.js** - If using Next.js API routes
- **bcrypt** - Password hashing

### File Storage
- **AWS S3** - Workflow files and assets
- **Cloudinary** - Image optimization and CDN
- **Local Storage** - Development environment

### Email Service
- **SendGrid** - Transactional emails
- **AWS SES** - Cost-effective email service
- **Nodemailer** - SMTP email sending

### Validation & Documentation
- **Pydantic** (Python) - Request/response validation
- **Zod** (TypeScript) - Schema validation
- **Swagger/OpenAPI** - API documentation

---

## 🎯 Next Steps

### 1. **Backend Infrastructure Setup**
- Choose technology stack (FastAPI recommended)
- Setup PostgreSQL database with Prisma
- Implement authentication system with JWT
- Setup file upload handling

### 2. **Core API Implementation**
- Start with authentication endpoints
- Implement workflow CRUD operations
- Add category management
- Implement purchase flow

### 3. **Frontend Integration**
- Replace mock data with API calls
- Implement error handling and loading states
- Add form validation
- Implement real-time notifications

### 4. **Testing & Deployment**
- Write comprehensive API tests
- Setup CI/CD pipeline
- Deploy to production environment
- Monitor API performance

---

## 📋 Data Models Reference

### Core Models (from `/lib/models/`)
- **User**: `{id, name, email, avatar_url, role, is_deleted, created_at}`
- **Workflow**: `{id, title, description, price, status, features, downloads_count, rating_avg, created_at}`
- **Purchase**: `{id, user_id, workflow_id, amount, status, payment_method, paid_at, created_at}`
- **Notification**: `{id, user_id, title, message, type, is_unread, created_at}`
- **Comment**: `{id, workflow_id, user_id, content, rating, likes_count, created_at}`

### Request/Response Types
- **CreateUserRequest**: `{name, email, password}`
- **CreateWorkflowRequest**: `{title, description, price, category_id, features}`
- **CreatePurchaseRequest**: `{workflow_id, bank_account, bank_name, transfer_code, amount}`
- **CreateNotificationRequest**: `{user_id, title, message, type}`

---

**⚠️ CRITICAL:** This project requires a complete backend implementation before it can function as a production application. The frontend is fully prepared and waiting for API integration.

**📈 Estimated Development Time:** 8-12 weeks for full implementation with proper testing and deployment.
