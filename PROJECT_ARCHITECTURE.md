# 🏗️ USITech Project Architecture Overview

## 📋 Project Summary
**USITech** là một nền tảng marketplace cho automation workflows được xây dựng bằng Next.js 15 với App Router, TypeScript, Tailwind CSS, và Framer Motion.

---

## 🎯 Tech Stack

### Core Technologies
- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion 12.23.22
- **Icons**: Lucide React 0.544.0
- **Database**: Prisma 6.17.1
- **Validation**: Zod 4.1.12

### Development Tools
- **Bundler**: Turbopack (Next.js)
- **Linting**: ESLint 9
- **Package Manager**: npm
- **Fonts**: Geist Sans & Geist Mono

---

## 📁 Project Structure

```
usitech/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (private)/               # Protected routes
│   │   ├── 📁 dashboard/           # User dashboard
│   │   │   ├── 📁 checkout/        # Payment flow
│   │   │   ├── 📁 my-workflows/    # User's workflows
│   │   │   ├── 📁 notifications/   # Notification center
│   │   │   ├── 📁 overview/        # Dashboard overview
│   │   │   ├── 📁 settings/       # User settings
│   │   │   └── page.tsx           # Main dashboard
│   │   └── layout.tsx             # Private layout wrapper
│   ├── 📁 (public)/                # Public routes
│   │   ├── 📁 about/               # About page
│   │   ├── 📁 contact/             # Contact page
│   │   ├── 📁 search/              # Workflow search
│   │   ├── 📁 workflows/           # Workflow marketplace
│   │   └── layout.tsx             # Public layout
│   ├── 📁 auth/                    # Authentication
│   │   ├── 📁 login/
│   │   ├── 📁 register/
│   │   └── 📁 forgot-password/
│   ├── layout.tsx                 # Root layout
│   ├── globals.css                 # Global styles
│   └── favicon.ico
│
├── 📁 components/                   # React Components
│   ├── 📁 about/                   # About page components
│   ├── 📁 auth/                    # Auth form components
│   ├── 📁 contact/                  # Contact page components
│   ├── 📁 dashboard/               # Dashboard components
│   │   ├── 📁 checkout/            # Checkout flow
│   │   ├── 📁 my-workflows/        # User workflows
│   │   ├── 📁 notifications/       # Notification system
│   │   ├── 📁 overview/            # Dashboard overview
│   │   └── 📁 workflow-detail/    # Workflow details
│   ├── 📁 search/                  # Search components
│   ├── 📁 shared/                  # Shared components
│   │   ├── Header.tsx              # Site header
│   │   ├── Footer.tsx              # Site footer
│   │   ├── ProtectedRoute.tsx      # Auth guard
│   │   └── MotionProvider.tsx      # Animation wrapper
│   ├── 📁 ui/                      # UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...                     # Other UI components
│   └── 📁 workflow/                # Workflow components
│       ├── CommentCard.tsx
│       ├── CommentForm.tsx
│       └── CommentsSection.tsx
│
├── 📁 lib/                          # Utilities & Logic
│   ├── 📁 models/                  # Database models
│   │   ├── enums.ts                # All enums
│   │   ├── user.ts                 # User models
│   │   ├── notification.ts         # Notification models
│   │   ├── contact.ts              # Contact models
│   │   ├── workflow.ts             # Workflow models
│   │   ├── purchase.ts             # Purchase models
│   │   ├── index.ts                # Export all models
│   │   └── README.md               # Models documentation
│   ├── 📁 auth/                    # Authentication logic
│   ├── 📁 about/                   # About page data
│   ├── 📁 contact/                 # Contact page data
│   ├── 📁 search/                  # Search functionality
│   ├── auth.ts                     # Auth utilities
│   ├── data.ts                     # Static data
│   ├── mock-data.ts                # Mock data
│   ├── theme.ts                    # Theme configuration
│   ├── types.ts                    # Legacy types
│   └── utils.ts                    # Utility functions
│
├── 📁 public/                      # Static assets
│   ├── logo.png
│   ├── background1.png
│   ├── crm.png
│   ├── marketing.png
│   └── ...                         # Other images
│
├── 📄 Configuration Files
│   ├── package.json                # Dependencies
│   ├── next.config.ts              # Next.js config
│   ├── tsconfig.json               # TypeScript config
│   ├── eslint.config.mjs           # ESLint config
│   ├── postcss.config.mjs          # PostCSS config
│   └── .gitignore                  # Git ignore rules
│
└── 📄 Documentation
    ├── README.md                   # Project overview
    ├── DASHBOARD_README.md         # Dashboard documentation
    ├── database.md                 # Database schema
    ├── api-list.md                 # API documentation
    └── api-summary.txt             # API summary
```

---

## 🏛️ Architecture Patterns

### 1. **App Router Structure**
```
app/
├── (private)/          # Route groups for protected pages
├── (public)/           # Route groups for public pages
├── auth/               # Authentication routes
└── layout.tsx          # Root layout
```

### 2. **Component Organization**
```
components/
├── [feature]/         # Feature-specific components
├── shared/            # Reusable components
├── ui/               # UI primitives
└── [domain]/         # Domain-specific components
```

### 3. **Data Layer**
```
lib/
├── models/           # Database models & types
├── [feature]/       # Feature-specific logic
└── utils.ts         # Shared utilities
```

---

## 🔄 Data Flow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Public Pages  │    │  Private Pages  │    │   Auth Pages    │
│                 │    │                 │    │                 │
│ • Home          │    │ • Dashboard     │    │ • Login         │
│ • About         │    │ • My Workflows  │    │ • Register      │
│ • Contact       │    │ • Notifications │    │ • Forgot Pass   │
│ • Search        │    │ • Settings      │    │                 │
│ • Workflows     │    │ • Checkout      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Shared Layout  │
                    │                 │
                    │ • Header        │
                    │ • Footer        │
                    │ • Navigation    │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Component Layer │
                    │                 │
                    │ • UI Primitives │
                    │ • Feature Comps  │
                    │ • Shared Comps  │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Data Layer     │
                    │                 │
                    │ • Models         │
                    │ • Mock Data      │
                    │ • Utilities      │
                    └─────────────────┘
```

---

## 🎨 Design System

### Color Palette
- **Primary**: `#002B6B` (Dark Blue)
- **Accent**: `#007BFF` (Blue)
- **Secondary**: `#06B6D4` (Cyan)
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Yellow)
- **Error**: `#EF4444` (Red)

### Typography
- **Font Family**: Geist Sans (Primary), Geist Mono (Code)
- **Font Weights**: 400, 500, 600, 700

### Component Styling
```css
/* Panel Style */
bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-sm

/* Button Gradients */
bg-gradient-to-r from-[#002B6B] to-[#007BFF]

/* Hover Effects */
hover:shadow-md transition-all duration-300
```

---

## 🗄️ Database Schema Overview

### Core Entities
```
users ──┬── notifications
        ├── purchases ── invoices
        ├── favorites
        └── comments

workflows ──┬── workflow_assets
           ├── workflow_categories
           ├── comments
           ├── favorites
           └── purchases
```

### Key Tables
- **users**: User accounts & profiles
- **workflows**: Marketplace items
- **purchases**: Transaction records
- **invoices**: Billing documents
- **notifications**: In-app notifications
- **comments**: User reviews & discussions
- **favorites**: User wishlist

---

## 🚀 Key Features

### 1. **Workflow Marketplace**
- Browse & search workflows
- Category filtering
- Detailed workflow pages
- User reviews & ratings

### 2. **User Dashboard**
- Purchase history
- Active workflows
- Notifications center
- Account settings

### 3. **Checkout System**
- Payment processing
- Invoice generation
- Order management

### 4. **Notification System**
- Real-time notifications
- Type-based styling (Success/Warning/Error)
- Mark as read functionality

### 5. **Authentication**
- User registration/login
- Password reset
- Protected routes

---

## 🔧 Development Workflow

### Scripts
```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint checking
```

### Development Features
- **Hot Reload**: Instant updates during development
- **TypeScript**: Full type safety
- **Turbopack**: Fast bundling
- **ESLint**: Code quality enforcement

---

## 📊 Project Metrics

- **Total Files**: ~150+ files
- **Components**: ~80+ React components
- **Pages**: ~15+ routes
- **Models**: 6 main data models
- **Dependencies**: 15+ production packages

---

## 🎯 Future Enhancements

### Planned Features
- [ ] Real API integration
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Workflow analytics
- [ ] User preferences
- [ ] Email notifications
- [ ] Mobile app

### Technical Improvements
- [ ] Database integration (Prisma)
- [ ] Authentication system
- [ ] State management (Zustand/Redux)
- [ ] Testing framework
- [ ] CI/CD pipeline
- [ ] Performance optimization

---

*Generated on: $(date)*
*Project Version: 0.1.0*
*Last Updated: October 2024*
