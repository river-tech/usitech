# API Gap Analysis — UsITech Marketplace

Generated: 2025-10-16

Mục tiêu: Đối chiếu danh sách API yêu cầu với mã nguồn hiện tại (Next.js App Router) và chỉ ra API còn thiếu hoặc dư thừa.

Tổng quan: Không tìm thấy bất kỳ route handler nào trong `app/api/`. Tất cả các API trong danh sách đều đang thiếu trong codebase hiện tại.

---

## 1) Bảng tổng hợp trạng thái

| Endpoint | Method | Trạng thái | Gợi ý file handler (App Router) |
|---|---|---|---|
| /api/auth/register | POST | Missing | `app/api/auth/register/route.ts`
| /api/auth/login | POST | Missing | `app/api/auth/login/route.ts`
| /api/auth/me | GET | Missing | `app/api/auth/me/route.ts`
| /api/auth/profile | PUT | Missing | `app/api/auth/profile/route.ts`
| /api/auth/change-password | PUT | Missing | `app/api/auth/change-password/route.ts`
| /api/auth/forgot-password | POST | Missing | `app/api/auth/forgot-password/route.ts`
| /api/auth/verify-reset-otp | POST | Missing | `app/api/auth/verify-reset-otp/route.ts`
| /api/auth/set-new-password | POST | Missing | `app/api/auth/set-new-password/route.ts`
| /api/workflows | GET | Missing | `app/api/workflows/route.ts`
| /api/workflows/feature | GET | Missing | `app/api/workflows/feature/route.ts` (cân nhắc đổi `featured`)
| /api/workflows/:id/related | GET | Missing | `app/api/workflows/[id]/related/route.ts`
| /api/workflows/:id | GET | Missing | `app/api/workflows/[id]/route.ts`
| /api/categories | GET | Missing | `app/api/categories/route.ts`
| /api/workflows/search | GET | Missing | `app/api/workflows/search/route.ts`
| /api/wishlist | GET | Missing | `app/api/wishlist/route.ts`
| /api/workflows/:id/wishlist | POST | Missing | `app/api/workflows/[id]/wishlist/route.ts`
| /api/workflows/:id/wishlist | DELETE | Missing | `app/api/workflows/[id]/wishlist/route.ts`
| /api/workflows/:id/reviews | POST | Missing | `app/api/workflows/[id]/reviews/route.ts`
| /api/workflows/reviews/:id | DELETE | Missing | `app/api/workflows/reviews/[id]/route.ts`
| /api/workflows/:id/reviews | GET | Missing | `app/api/workflows/[id]/reviews/route.ts`
| /api/orders/:id | POST | Missing | `app/api/orders/[id]/route.ts`
| /api/orders/:id/invoice | GET | Missing | `app/api/orders/[id]/invoice/route.ts`
| /api/workflows/detail/:id | GET | Missing | `app/api/workflows/detail/[id]/route.ts` (có thể hợp nhất với `/workflows/[id]`)
| /api/users/:id/notifications | GET | Missing | `app/api/users/[id]/notifications/route.ts`
| /api/notifications/:id/read | PATCH | Missing | `app/api/notifications/[id]/route.ts` (PATCH)
| /api/notifications/:id | DELETE | Missing | `app/api/notifications/[id]/route.ts` (DELETE)
| /api/notifications/user/:user_id | DELETE | Missing | `app/api/notifications/user/[user_id]/route.ts`
| /api/contact | POST | Missing | `app/api/contact/route.ts`
| /api/my-workflow | GET | Missing | `app/api/my-workflow/route.ts`
| /api/users/:id/dashboard | GET | Missing | `app/api/users/[id]/dashboard/route.ts`

Kết luận: 30/30 API đang thiếu trong code.

---

## 2) API dư thừa

- Không phát hiện route handler nào trong codebase → không có API dư so với danh sách yêu cầu.

---

## 3) Đề xuất bổ sung/điều chỉnh để hoàn thiện

- **Auth** bổ sung:
  - `POST /api/auth/resend-otp` — gửi lại OTP
  - `POST /api/auth/logout` — thu hồi token
  - `GET /api/auth/refresh` — refresh access token
- **Workflows**:
  - `POST /api/workflows/[id]/download` — cấp link tải (có thời hạn)
  - Gộp `GET /api/workflows/detail/:id` vào `GET /api/workflows/:id` cho đơn giản, thêm `include=assets,docs,reviews` qua query
- **Payments/Webhooks**:
  - `POST /api/webhooks/payment` — nhận callback thanh toán (Stripe/MoMo/VNPay)
- **Admin**:
  - `GET /api/admin/stats`, `GET /api/admin/users`, `GET /api/admin/purchases`, CRUD workflows admin
- **Observability**:
  - `GET /api/admin/audit-logs`, `GET /api/admin/analytics`

---

## 4) Ghi chú triển khai

- Validation: dùng `zod` cho body/query; phản hồi theo chuẩn `{ success, data, error }`.
- Auth: dùng JWT, middleware bảo vệ route (user/admin). Có thể dùng `next/headers` + `cookies()`.
- ORM: Prisma mapping theo models trong `lib/models/*`.
- Phân trang & filter: chuẩn `page`, `limit`, `q`, `category`, `rating`, `priceMin`, `priceMax`.

---

## 5) Coverage

- Tổng API yêu cầu: **30**
- API hiện có: **0**
- Coverage: **0%**

> File này phản ánh trạng thái tại thời điểm tạo. Sau khi bổ sung route handlers, cập nhật lại để theo dõi tiến độ.

---

## 6) Đối chiếu lại theo danh sách bạn vừa gửi (bao gồm logout/OTP/refresh/verify-transaction)

| # | Method | Endpoint | Trạng thái | Ghi chú/đề xuất handler |
|---|---|---|---|---|
| 1 | POST | /api/auth/register | Missing | `app/api/auth/register/route.ts` |
| 2 | POST | /api/auth/login | Missing | `app/api/auth/login/route.ts` |
| 3 | POST | /api/auth/logout | Missing | `app/api/auth/logout/route.ts` |
| 4 | POST | /api/auth/resend-otp | Missing | `app/api/auth/resend-otp/route.ts` |
| 5 | GET | /api/auth/refresh | Missing | `app/api/auth/refresh/route.ts` |
| 6 | PUT | /api/auth/change-password | Missing | `app/api/auth/change-password/route.ts` |
| 7 | POST | /api/auth/forgot-password | Missing | `app/api/auth/forgot-password/route.ts` |
| 8 | POST | /api/auth/verify-reset-otp | Missing | `app/api/auth/verify-reset-otp/route.ts` |
| 9 | POST | /api/auth/set-new-password | Missing | `app/api/auth/set-new-password/route.ts` |
| 10 | GET | /api/workflows | Missing | `app/api/workflows/route.ts` |
| 11 | GET | /api/workflows/feature | Missing | Nên dùng `/featured`; handler: `app/api/workflows/featured/route.ts` |
| 12 | GET | /api/workflows/:id/related | Missing | `app/api/workflows/[id]/related/route.ts` |
| 13 | GET | /api/workflows/:id | Missing | `app/api/workflows/[id]/route.ts` |
| 14 | GET | /api/categories | Missing | `app/api/categories/route.ts` |
| 15 | GET | /api/workflows/search | Missing | `app/api/workflows/search/route.ts` |
| 16 | GET | /api/wishlist | Missing | `app/api/wishlist/route.ts` (user) |
| 17 | POST | /api/workflows/:id/wishlist | Missing | `app/api/workflows/[id]/wishlist/route.ts` (POST) |
| 18 | GET | /api/my-workflow | Missing | `app/api/my-workflow/route.ts` |
| 19 | DELETE | /api/workflows/:id/wishlist | Missing | `app/api/workflows/[id]/wishlist/route.ts` (DELETE) |
| 20 | POST | /api/workflows/:id/reviews | Missing | `app/api/workflows/[id]/reviews/route.ts` (POST) |
| 21 | DELETE | /api/workflows/reviews/:id | Missing | `app/api/workflows/reviews/[id]/route.ts` |
| 22 | GET | /api/workflows/:id/reviews | Missing | `app/api/workflows/[id]/reviews/route.ts` (GET) |
| 23 | POST | /api/orders/:id | Missing | (trùng 32) Nên chuẩn hóa: `POST /api/orders` với body `{ workflow_id }` → `app/api/orders/route.ts` |
| 24 | GET | /api/orders/:id/invoice | Missing | `app/api/orders/[id]/invoice/route.ts` |
| 25 | GET | /api/workflows/detail/:id | Missing | Trùng chức năng với 13; nên hợp nhất vào `/api/workflows/[id]` với query `include=` |
| 26 | GET | /api/users/:id/notifications | Missing | `app/api/users/[id]/notifications/route.ts` |
| 27 | PATCH | /api/notifications/:id/read | Missing | Có thể dùng `PATCH /api/notifications/[id]` |
| 28 | DELETE | /api/notifications/:id | Missing | `app/api/notifications/[id]/route.ts` |
| 29 | DELETE | /api/notifications/user/:user_id | Missing | `app/api/notifications/user/[user_id]/route.ts` |
| 30 | POST | /api/contact | Missing | `app/api/contact/route.ts` |
| 31 | GET | /api/users/:id/dashboard | Missing | `app/api/users/[id]/dashboard/route.ts` |
| 32 | POST | /api/orders/:id | Duplicate | Trùng #23. Đề xuất thay bằng `POST /api/orders` |
| 33 | POST | /api/workflows/verify-transaction | Missing | `app/api/workflows/verify-transaction/route.ts` (server-side hook kiểm tra transfer_code) |

Kết luận cập nhật: 32 mục hợp lệ + 1 mục duplicate (#23, #32). Hiện tại coverage vẫn **0%** do chưa có route.

Gợi ý payment/workflow kiểm tra email chuyển khoản theo `transfer_code`:
- Xây `POST /api/workflows/verify-transaction` nhận `{ transfer_code, amount, bank_name, bank_account }`.
- Service đọc email (cron/background workflow) parse nội dung; khi match `transfer_code` → gọi endpoint trên để kích hoạt purchase (`status=Paid`, `paid_at=now()`), đồng thời tạo invoice.
