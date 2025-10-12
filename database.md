# 🗄️ UsITech Database Schema (v2)

This schema is inferred from the current Next.js UI (Admin + User Dashboard) and mock data. It supports workflows marketplace, purchases/checkout, invoices, notifications, comments, likes, settings, and analytics.

## ERD Overview (text diagram)

```
users (id) ───┬───────────────┐
              │               │
              │               ├─< notifications (user_id)
              │               │
              │               ├─< purchases (user_id) ──┐
              │               │                          └─= invoices (purchase_id)
              │               │
              │               ├─< favorites (user_id) >─┐
              │               │                          │
              │               └─< comments (user_id)  >─┼─< comment_likes (user_id)
                                                        │
workflows (id) ──┬─< purchases (workflow_id)
                 │
                 ├─< workflow_assets (workflow_id)
                 ├─< workflow_docs (workflow_id)
                 ├─< workflow_reviews (workflow_id)
                 ├─< comments (workflow_id) ──┬─< comment_likes
                 │                             └─ self-replies via parent_comment_id
                 └─< analytics_daily (workflow_id)

system_settings (key)           audit_logs (admin_id -> users.id)
```

Conventions:
- UUID as primary keys; `created_at` and `updated_at` on all tables.
- `is_deleted` soft-deletes on `users`, `workflows`.
- snake_case naming.
- Cascading deletes where appropriate (e.g., a workflow delete cascades comments, favorites, analytics; a user delete cascades their notifications, favorites, comments). For hard deletes, combine with `is_deleted` policies in app-layer.

---

## Enumerations (recommended)

```sql
-- Roles
CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');

-- Workflow status
CREATE TYPE workflow_status AS ENUM ('active', 'draft', 'archived');

-- Purchase status (aligns with UI: Active, Pending, Reject)
CREATE TYPE purchase_status AS ENUM ('ACTIVE', 'PENDING', 'REJECT', 'REFUNDED', 'FAILED');

-- Payment method (align with UI: card, paypal, bank/qr)
CREATE TYPE payment_method AS ENUM ('CARD', 'PAYPAL', 'BANK_TRANSFER', 'QR');
```

---

## Tables

### 1) users

Purpose: Accounts for end users and admins.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'USER',
  last_login TIMESTAMPTZ,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

Key relationships:
- `audit_logs.admin_id` → `users.id` (admins subset by role)
- cascades from `users` to notifications, favorites, comments, comment_likes, purchases (or set null per compliance)

---

### 2) workflows

Purpose: Marketplace items with assets, docs, video, category, price.

```sql
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(80) NOT NULL,
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  status workflow_status NOT NULL DEFAULT 'active',
  file_url TEXT,            -- downloadable package or repo link
  video_url TEXT,           -- optional demo video
  tags TEXT[],              -- optional simple tag array (can be split to normalized table if needed)
  downloads_count BIGINT NOT NULL DEFAULT 0,
  rating_avg NUMERIC(3,2),
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_workflows_category ON workflows(category);
CREATE INDEX idx_workflows_status ON workflows(status);
CREATE INDEX idx_workflows_price ON workflows(price);
```

Associated detail tables:
- `workflow_assets` (thumbnails, gallery)
- `workflow_docs` (documentation list items)
- `workflow_reviews` (rating + review content)
- `analytics_daily` (time series)

---

### 3) workflow_assets

Purpose: Store image/gallery assets per workflow.

```sql
CREATE TABLE workflow_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  asset_url TEXT NOT NULL,
  kind VARCHAR(30) NOT NULL DEFAULT 'image',   -- image, thumbnail
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_workflow_assets_wf ON workflow_assets(workflow_id, position);
```

---

### 4) workflow_docs

Purpose: Orderable list of docs/bullets for detail page.

```sql
CREATE TABLE workflow_docs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_workflow_docs_wf ON workflow_docs(workflow_id, position);
```

---

### 5) favorites

Purpose: "Workflows you liked" (wishlist). Supports wishlist counts.

```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, workflow_id)
);
CREATE INDEX idx_favorites_workflow ON favorites(workflow_id);
```

---

### 6) comments

Purpose: Public comments with nested replies, like/unlike.

```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- allow anon removal
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_comments_wf ON comments(workflow_id);
CREATE INDEX idx_comments_parent ON comments(parent_comment_id);
```

Likes pivot:
```sql
CREATE TABLE comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (comment_id, user_id)
);
```

---

### 7) notifications

Purpose: In-app notifications per user, with unread flag.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  message TEXT,
  is_unread BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_unread);
```

---

### 8) purchases

Purpose: Single-workflow checkout per UI. Holds financials and status.

```sql
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE RESTRICT,
  currency CHAR(3) NOT NULL DEFAULT 'USD',
  amount NUMERIC(12,2) NOT NULL,           -- subtotal before tax
  tax NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL,            -- final charged amount
  payment_method payment_method NOT NULL,
  status purchase_status NOT NULL DEFAULT 'PENDING',
  paid_at TIMESTAMPTZ,                     -- when payment succeeded
  invoice_id UUID UNIQUE,                  -- filled after invoice generated
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_total CHECK (total = amount + tax)
);
CREATE INDEX idx_purchases_user ON purchases(user_id);
CREATE INDEX idx_purchases_workflow ON purchases(workflow_id);
CREATE INDEX idx_purchases_status ON purchases(status);
```

Rationale: UI checks purchase state (Active/Pending/Reject). A single purchase maps to a single workflow. For bundles, introduce `orders` and `order_items` later.

---

### 9) invoices

Purpose: One-to-one with purchases for billing documents.

```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID NOT NULL UNIQUE REFERENCES purchases(id) ON DELETE CASCADE,
  invoice_number VARCHAR(40) NOT NULL UNIQUE,
  billing_name VARCHAR(160),
  billing_email VARCHAR(150),
  billing_address JSONB,       -- line1, line2, city, state, zip, country
  amount NUMERIC(12,2) NOT NULL,
  tax NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_invoices_number ON invoices(invoice_number);
```

---

### 10) workflow_reviews (public ratings)

Purpose: Ratings and short testimonials shown on detail pages.

```sql
CREATE TABLE workflow_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title VARCHAR(200),
  body TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (workflow_id, user_id)
);
CREATE INDEX idx_reviews_wf_rating ON workflow_reviews(workflow_id, rating);
```

---

### 11) analytics_daily

Purpose: Daily aggregates, supporting dashboards (downloads, revenue, sales count).

```sql
CREATE TABLE analytics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  downloads_count BIGINT NOT NULL DEFAULT 0,
  sales_count BIGINT NOT NULL DEFAULT 0,
  revenue NUMERIC(14,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (workflow_id, date)
);
CREATE INDEX idx_analytics_wf_date ON analytics_daily(workflow_id, date);
```

---

### 12) user_settings

Purpose: Per-user preferences (e.g., notification toggles in Settings tab).

```sql
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  workflow_updates BOOLEAN NOT NULL DEFAULT TRUE,
  marketing_emails BOOLEAN NOT NULL DEFAULT FALSE,
  locale VARCHAR(10),
  timezone VARCHAR(64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

### 13) system_settings

Purpose: Global key-value configuration (e.g., payment provider keys).

```sql
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(120) NOT NULL UNIQUE,
  value JSONB NOT NULL,        -- allows typed structured values
  value_type VARCHAR(30) NOT NULL DEFAULT 'json',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_system_settings_key ON system_settings(key);
```

---

### 14) audit_logs

Purpose: Admin activity log for moderation and operations.

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(120) NOT NULL,          -- e.g., 'WORKFLOW_UPDATE', 'USER_BAN'
  target_type VARCHAR(60) NOT NULL,      -- e.g., 'workflow', 'user', 'purchase'
  target_id UUID,                        -- id of the target record
  metadata JSONB,                        -- optional context
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_logs_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_logs_target ON audit_logs(target_type, target_id);
```

---

## Additional Indexing & Constraints Summary
- Unique: `users.email`, `favorites (user_id, workflow_id)`, `workflow_reviews (workflow_id, user_id)`, `invoices.purchase_id`, `invoices.invoice_number`.
- FK cascades: favorites, comments, comment_likes, notifications, analytics, workflow_assets, workflow_docs all cascade on workflow/user deletion.
- Purchases: `workflow_id` uses `RESTRICT` to preserve financial trail even if workflow is soft-deleted.
- Soft-delete fields: `users.is_deleted`, `workflows.is_deleted` (app-layer should exclude `is_deleted = TRUE`).
- Email unique index already present.

---

## How UI maps to schema
- Dashboard → Purchases table, joined to Workflows, Invoices, and User.
- Checkout & Invoice pages → `purchases` + `invoices` (1–1).
- Notifications page → `notifications` with `is_unread` + clear-all operations.
- My Workflows → from `purchases` by user, plus `favorites` for liked workflows.
- Workflow Detail page → `workflows`, `workflow_assets`, `workflow_docs`, `workflow_reviews` (ratings), `comments` (+ `comment_likes`), and `analytics_daily`.
- Settings page → `user_settings`; global admin → `system_settings`.
- Admin activity → `audit_logs`.

---

📘 Note: This schema is designed for a single-workflow purchase flow (as per current UI). If you later add cart/multi-item orders, introduce `orders` (header) and `order_items` (lines), and make `invoices` reference `orders` instead of `purchases`.
