# UsITech Dashboard (Private Area)

This module implements the private SaaS dashboard using Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and lucide-react. The UI reuses the same gradients, spacing, and typography as the public site.

## Structure

- app/(private)/dashboard/page.tsx — Overview page composed from modules
- components/dashboard/DashboardLayout.tsx — Sticky topbar + responsive sidebar
- components/dashboard/DashboardHeader.tsx — Greeting + CTA
- components/dashboard/StatsGrid.tsx — KPI cards (purchases, spent, active, saved)
- components/dashboard/RecentActivity.tsx — Recent purchases/activity table
- components/dashboard/QuickActions.tsx — Shortcuts (browse, download, support, billing)
- components/dashboard/NotificationsCard.tsx — Recent notifications list
- components/dashboard/AccountSummary.tsx — Account details + action buttons

## Styling Conventions

- Panels: `bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-sm`
- Brand: primary `#002B6B`, accent `#007BFF` (gradient partner `#06B6D4`)
- Buttons: gradient for primary CTAs; neutral/outline for secondary
- Motion: subtle framer-motion fade/slide, hover `transition-all duration-300`

## Adding New Sections

1. Create a component in `components/dashboard/`, e.g. `AnalyticsPanel.tsx`.
2. Keep props typed and self-contained. Avoid global state.
3. Import and place the component in `app/(private)/dashboard/page.tsx`.
4. If it needs a dedicated route, add a page under `app/(private)/dashboard/*` and a nav item in `DashboardLayout.tsx`.

## Data & State

- Current data is mocked in `page.tsx` and passed to components via props.
- In production, fetch in a server component (e.g., `getServerSession()` + DB) and hydrate client components with typed props.
- For shared filters/tabs, colocate state inside the smallest component. Lift only when multiple sections depend on it.

## Access Control

- Private pages are wrapped by the app’s `(private)` layout which contains a `ProtectedRoute` placeholder. Replace with your auth solution (NextAuth middleware, custom checks) to enforce access.

## Responsive Behavior

- Sidebar collapses on mobile; topbar remains sticky.
- Content uses the `max-w-6xl` container with `px-4 md:px-6` and `gap-6` grids.

## Reuse Across App

- Gradients, spacing, and typography match the Workflow Detail and public pages.
- Icons are from `lucide-react` (`w-4 h-4` or `w-5 h-5`).

## Suggested Next Steps

- Replace mocks with real data sources.
- Add routes: `/dashboard/purchases`, `/dashboard/workflows`, `/dashboard/settings`.
- Introduce skeletons and optimistic UI where appropriate.

## QA Checklist

- [ ] Mobile sidebar toggle works
- [ ] Keyboard focus-visible rings present
- [ ] Stats/activities render on all breakpoints
- [ ] Links navigate correctly (View All, Quick Actions)

— UsITech Frontend Team
