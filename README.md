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

Set `LARAVEL_API_URL` to the **API origin only** (no `/api` or `/api/status`):

| Environment | Value |
| --- | --- |
| Local API | `http://127.0.0.1:8000` |
| Production (Render) | `https://subnexa-api.onrender.com` |

`.env.local` (local):

```
LARAVEL_API_URL=http://127.0.0.1:8000
```

`.env.production` is already set to the Render origin. On **Vercel**, also add the same env var for Production:

```
LARAVEL_API_URL=https://subnexa-api.onrender.com
```

Then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How API calls work

| Caller | Request | Becomes |
| --- | --- | --- |
| Server (`getLaravelStatus`) | `LARAVEL_API_URL` + `/api/status` | `https://subnexa-api.onrender.com/api/status` |
| Browser | `/backend-api/status` | rewrite → `https://subnexa-api.onrender.com/api/status` |
| Browser admin login | `/backend-api/admin/login` | rewrite → `https://subnexa-api.onrender.com/api/admin/login` |

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Related repo

- API: [subnexa-api](https://github.com/rohansadhukhan-codeclouds/subnexa-api)
