/**
 * API origin only, e.g. https://subnexa-api.onrender.com
 * — never /api or /api/status.
 *
 * Browser (client components) must use NEXT_PUBLIC_LARAVEL_API_URL.
 * Server / next.config can use LARAVEL_API_URL as a fallback.
 */
export function normalizeLaravelApiOrigin(value: string | undefined): string {
  let origin = (value ?? "http://127.0.0.1:8000").trim();

  origin = origin.replace(/\/+$/, "");
  // If someone pasted a full endpoint, drop /api and anything after it
  origin = origin.replace(/\/api(?:\/.*)?$/i, "");

  return origin.replace(/\/+$/, "") || "http://127.0.0.1:8000";
}

export function laravelApiOrigin(): string {
  return normalizeLaravelApiOrigin(
    process.env.NEXT_PUBLIC_LARAVEL_API_URL ?? process.env.LARAVEL_API_URL,
  );
}

/**
 * Build an absolute Laravel URL.
 * Examples:
 *   laravelApiUrl("status")      → https://host/api/status
 *   laravelApiUrl("/api/status") → https://host/api/status
 *   laravelApiUrl("/status")     → https://host/api/status
 *   laravelApiUrl("admin/login") → https://host/api/admin/login
 */
export function laravelApiUrl(path: string): string {
  let suffix = path.trim();
  if (!suffix.startsWith("/")) {
    suffix = `/${suffix}`;
  }
  if (!suffix.startsWith("/api/") && suffix !== "/api") {
    suffix = `/api${suffix}`;
  }

  return `${laravelApiOrigin()}${suffix}`;
}
