"use client";

import { useState } from "react";
import {
  parseLaravelStatus,
  type LaravelStatusResult,
} from "@/lib/laravel";

type StatusPanelProps = {
  initial: LaravelStatusResult;
};

export function StatusPanel({ initial }: StatusPanelProps) {
  const [result, setResult] = useState(initial);
  const [pending, setPending] = useState(false);

  async function refresh() {
    setPending(true);

    try {
      const response = await fetch("/backend-api/status", { cache: "no-store" });

      if (!response.ok) {
        setResult({
          ok: false,
          message: `Laravel responded with ${response.status}.`,
        });
        return;
      }

      const data = parseLaravelStatus(await response.json());

      if (!data) {
        setResult({
          ok: false,
          message: "Laravel returned an unexpected payload.",
        });
        return;
      }

      setResult({ ok: true, data });
    } catch {
      setResult({
        ok: false,
        message: "Laravel API is not reachable.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="w-full rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">API connection</h2>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            result.ok
              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
              : "bg-red-500/15 text-red-700 dark:text-red-300"
          }`}
        >
          {result.ok ? "Connected" : "Offline"}
        </span>
      </div>

      {result.ok ? (
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-zinc-500">App</dt>
            <dd className="mt-1 font-medium">{result.data.name}</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500">Backend</dt>
            <dd className="mt-1 font-medium">{result.data.backend}</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500">Frontend</dt>
            <dd className="mt-1 font-medium">{result.data.frontend} + React</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500">Server time</dt>
            <dd className="mt-1 font-medium">{result.data.time}</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-6 text-zinc-600 dark:text-zinc-400">{result.message}</p>
      )}

      <button
        type="button"
        onClick={refresh}
        disabled={pending}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        {pending ? "Checking…" : "Refresh status"}
      </button>
    </section>
  );
}
