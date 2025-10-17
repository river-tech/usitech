This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## UsITech Marketplace — Setup & Dependencies

The project uses Next.js 15 (App Router), TypeScript, TailwindCSS 4, Framer Motion and Prisma. Below is the exact list of packages used so teammates can install the same stack.

### Node & Package Manager
- Node.js ≥ 20.x
- npm ≥ 10.x (or pnpm/yarn if preferred)

### Production Dependencies
```
npm i \
  next@15.5.4 \
  react@19.1.0 react-dom@19.1.0 \
  @prisma/client@^6.17.1 prisma@^6.17.1 \
  framer-motion@12.23.22 \
  lucide-react@^0.544.0 \
  class-variance-authority@^0.7.1 \
  clsx@^2.1.1 \
  tailwind-merge@^3.3.1 \
  @radix-ui/react-label@^2.1.7 @radix-ui/react-switch@^1.2.6 \
  zod@^4.1.12
```

### Dev Dependencies
```
npm i -D \
  typescript@^5 \
  eslint@^9 eslint-config-next@15.5.4 @eslint/eslintrc@^3 \
  tailwindcss@^4 @tailwindcss/postcss@^4 \
  @types/node@^20 @types/react@^19 @types/react-dom@^19
```

### One‑liner install
```
npm ci || npm install
```

### Prisma setup
```
npx prisma init --datasource-provider postgresql
# add DATABASE_URL in .env
npx prisma generate
```

### Tailwind v4 setup
Tailwind v4 is already configured via `@tailwindcss/postcss`. No `tailwind.config.js` is required by default.

### Recommended VSCode extensions
- ESLint
- Prisma
- Tailwind CSS IntelliSense

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
