"use client";

import { useState, type FormEvent } from "react";

type Notice = {
  tone: "error" | "success";
  message: string;
};

export function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setPending(true);
    setNotice(null);

    try {
      const response = await fetch("/backend-api/admin/login", {
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

      const name =
        body &&
        typeof body === "object" &&
        "name" in body &&
        typeof body.name === "string"
          ? body.name
          : "admin";

      setNotice({ tone: "success", message: `Signed in as ${name}.` });
    } catch {
      setNotice({
        tone: "error",
        message: "Laravel API is not reachable.",
      });
    } finally {
      setPending(false);
    }
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
