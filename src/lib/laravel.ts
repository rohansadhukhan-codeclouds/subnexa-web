export type LaravelStatus = {
  name: string;
  backend: string;
  frontend: string;
  status: string;
  time: string;
};

export type LaravelStatusResult =
  | { ok: true; data: LaravelStatus }
  | { ok: false; message: string };

export function laravelApiBaseUrl(): string {
  return process.env.LARAVEL_API_URL ?? "http://127.0.0.1:8000";
}

export function parseLaravelStatus(value: unknown): LaravelStatus | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;

  if (
    typeof record.name !== "string" ||
    typeof record.backend !== "string" ||
    typeof record.frontend !== "string" ||
    typeof record.status !== "string" ||
    typeof record.time !== "string"
  ) {
    return null;
  }

  return {
    name: record.name,
    backend: record.backend,
    frontend: record.frontend,
    status: record.status,
    time: record.time,
  };
}

export async function getLaravelStatus(): Promise<LaravelStatusResult> {
  try {
    const response = await fetch(`${laravelApiBaseUrl()}/api/status`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        ok: false,
        message: `Laravel responded with ${response.status}.`,
      };
    }

    const data = parseLaravelStatus(await response.json());

    if (!data) {
      return { ok: false, message: "Laravel returned an unexpected payload." };
    }

    return { ok: true, data };
  } catch {
    return {
      ok: false,
      message: "Laravel API is not reachable. Start it with npm run dev from the project root.",
    };
  }
}
