import type { NextConfig } from "next";
import { normalizeLaravelApiOrigin } from "./src/lib/laravel-url";

// Origin only — never include /api or /api/status here.
const laravelApiUrl = normalizeLaravelApiOrigin(process.env.LARAVEL_API_URL);

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    return [
      {
        // Browser: /backend-api/status → https://subnexa-api.onrender.com/api/status
        source: "/backend-api/:path*",
        destination: `${laravelApiUrl}/api/:path*`,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
