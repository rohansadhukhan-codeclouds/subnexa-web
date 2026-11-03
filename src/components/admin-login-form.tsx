"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { laravelApiUrl } from "@/lib/laravel-url";
import { useAdminAuth, type AdminUser } from "@/stores/admin-auth";

type Notice = {
  tone: "error" | "success";
  message: string;
};

type LoginResponse = {
  token?: string;
  token_type?: string;
  user?: AdminUser;
};

export function AdminLoginForm() {
  const router = useRouter();
  const token = useAdminAuth((state) => state.token);
  const setSession = useAdminAuth((state) => state.setSession);
  const [hydrated, setHydrated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && token) {
      router.replace("/admin/dashboard");
    }
  }, [hydrated, token, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setPending(true);
    setNotice(null);

    try {
      const response = await fetch(laravelApiUrl("admin/login"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const body: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        setNotice({
          tone: "error",
          message: loginErrorMessage(body),
        });
        return;
      }

      const parsed = parseLoginResponse(body);

      if (!parsed) {
        setNotice({
          tone: "error",
          message: "Login succeeded but the API did not return a bearer token.",
        });
        return;
      }

      setSession(parsed.token, parsed.user);
      setNotice({
        tone: "success",
        message: `Signed in as ${parsed.user.name}.`,
      });
      router.replace("/admin/dashboard");
    } catch {
      setNotice({
        tone: "error",
        message: "Laravel API is not reachable.",
      });
    } finally {
      setPending(false);
    }
  }

  if (hydrated && token) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Already signed in. Redirecting to the dashboard…
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="admin-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          spellCheck={false}
          enterKeyHint="next"
          required
          className="h-11 rounded-xl border border-black/10 bg-white px-3 text-base outline-none focus:border-zinc-950 dark:border-white/15 dark:bg-zinc-900 dark:focus:border-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="admin-password" className="text-sm font-medium">
            Password
          </label>
          <button
            type="button"
            className="text-sm text-zinc-500 underline-offset-4 hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <input
          id="admin-password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          enterKeyHint="done"
          required
          className="h-11 rounded-xl border border-black/10 bg-white px-3 text-base outline-none focus:border-zinc-950 dark:border-white/15 dark:bg-zinc-900 dark:focus:border-white"
        />
        <button
          type="button"
          aria-controls="admin-password"
          aria-pressed={showPassword}
          onClick={() => setShowPassword((visible) => !visible)}
          className="self-start text-sm text-zinc-500 underline-offset-4 hover:underline"
        >
          {showPassword ? "Hide password" : "Show password"}
        </button>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>

      {notice ? (
        <p
          role={notice.tone === "error" ? "alert" : "status"}
          className={`text-sm ${
            notice.tone === "error"
              ? "text-red-700 dark:text-red-300"
              : "text-emerald-700 dark:text-emerald-300"
          }`}
        >
          {notice.message}
        </p>
      ) : null}
    </form>
  );
}

function parseLoginResponse(
  body: unknown,
): { token: string; user: AdminUser } | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const data = body as LoginResponse;

  if (typeof data.token !== "string" || data.token.length === 0) {
    return null;
  }

  if (
    !data.user ||
    typeof data.user.name !== "string" ||
    typeof data.user.email !== "string"
  ) {
    return null;
  }

  return {
    token: data.token,
    user: {
      name: data.user.name,
      email: data.user.email,
    },
  };
}

function loginErrorMessage(body: unknown): string {
  if (!body || typeof body !== "object" || !("errors" in body)) {
    return "These credentials do not match an admin account.";
  }

  const errors = body.errors;

  if (!errors || typeof errors !== "object" || !("email" in errors)) {
    return "These credentials do not match an admin account.";
  }

  const emailErrors = errors.email;

  if (Array.isArray(emailErrors) && typeof emailErrors[0] === "string") {
    return emailErrors[0];
  }

  return "These credentials do not match an admin account.";
}
