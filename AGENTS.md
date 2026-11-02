<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Subnexa Web

Subnexa is an AI-powered medicine purchasing website. This repository is the customer storefront and admin login UI. The Laravel API lives in [subnexa-api](https://github.com/rohansadhukhan-codeclouds/subnexa-api).

## Product

Customers browse medicines, add them to a cart, and check out. The product direction is pharmacy retail with AI help for finding and buying medicines — search, recommendations, and guided purchase — not a generic lifestyle shop.

Keep copy, catalog data, and new features in that domain: medicines, dosage forms, categories such as fever or diabetes care, prescription-aware checkout later. Do not add unrelated product types.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4 and MUI 9
- Laravel API via `LARAVEL_API_URL` (default `http://127.0.0.1:8000`)
- Rewrites: `/backend-api/:path*` → Laravel `/api/:path*`

## Layout

- `src/app/(store)/` — home, category, product, about, cart, checkout
- `src/app/admin/` — admin login
- `src/lib/catalog.ts` — current storefront catalog (replace with medicine data / API)
- `src/lib/cart.tsx` — localStorage cart
- `src/lib/laravel.ts` — Laravel status client
- `.env.example` — `LARAVEL_API_URL` only; never commit `.env.local`

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

API server: `php artisan serve --host=127.0.0.1 --port=8000` in the API repo.

## Conventions

- Prefer App Router server components; mark client components only when needed (cart, MUI interactivity).
- Wrap `params` / `searchParams` in `Suspense` when Next.js requires it.
- Format prices as BDT with a static `৳` prefix to avoid hydration mismatches.
- Talk to Laravel through `/backend-api` in the browser, or `LARAVEL_API_URL` on the server.
- Keep admin and storefront API usage separate (`/api/admin`, `/api/storefront`).
- Do not commit secrets, `.env*`, `.next/`, or `node_modules`.
