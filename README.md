# Subnexa Web

AI-powered medicine purchasing storefront for Subnexa.

Customers can browse medicines, add them to a cart, and check out. The admin UI at `/admin` signs in against the Laravel API. This repo is the Next.js frontend. The API is [subnexa-api](https://github.com/rohansadhukhan-codeclouds/subnexa-api).

## Stack

- Next.js 16 (App Router) and React 19
- Tailwind CSS 4 and MUI 9
- TypeScript

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Store home |
| `/category/[slug]` | Medicine category |
| `/product/[slug]` | Product detail |
| `/about` | About Subnexa |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/admin` | Admin login |

## Setup

```bash
npm install
cp .env.example .env.local
```

Set both env vars to the **API origin only** (no `/api` or `/api/status`).  
`NEXT_PUBLIC_LARAVEL_API_URL` is required for browser calls (admin login, etc.).

| Environment | Value |
| --- | --- |
| Local API | `http://127.0.0.1:8000` |
| Production (Render) | `https://subnexa-api.onrender.com` |

`.env.local` (local):

```
NEXT_PUBLIC_LARAVEL_API_URL=http://127.0.0.1:8000
LARAVEL_API_URL=http://127.0.0.1:8000
```

`.env.production` is already set to the Render origin. On **Vercel**, add both for Production:

```
NEXT_PUBLIC_LARAVEL_API_URL=https://subnexa-api.onrender.com
LARAVEL_API_URL=https://subnexa-api.onrender.com
```

Then restart `npm run dev` (env changes need a restart).

Open [http://localhost:3000](http://localhost:3000).

## How API calls work

| Caller | Request |
| --- | --- |
| Browser / server | `laravelApiUrl("admin/login")` → `https://subnexa-api.onrender.com/api/admin/login` |
| Browser / server | `laravelApiUrl("status")` → `https://subnexa-api.onrender.com/api/status` |

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Related repo

- API: [subnexa-api](https://github.com/rohansadhukhan-codeclouds/subnexa-api)
