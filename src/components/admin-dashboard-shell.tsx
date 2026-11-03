"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { adminAuthHeaders, useAdminAuth } from "@/stores/admin-auth";

export function AdminDashboardShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAdminAuth((state) => state.token);
  const user = useAdminAuth((state) => state.user);
  const clearSession = useAdminAuth((state) => state.clearSession);
  const [hydrated, setHydrated] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !token) {
      router.replace("/admin");
    }
  }, [hydrated, token, router]);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      await fetch("/backend-api/admin/logout", {
        method: "POST",
        headers: adminAuthHeaders(token),
      });
    } catch {
      // Client still clears the local JWT session.
    } finally {
      clearSession();
      router.replace("/admin");
      setSigningOut(false);
    }
  }

  if (!hydrated || !token) {
    return (
      <div className="flex min-h-[50vh] flex-1 items-center justify-center px-6 py-16 text-sm text-zinc-600 dark:text-zinc-400">
        Checking admin session…
      </div>
    );
  }

  const homeActive = pathname === "/admin/dashboard";

  return (
    <div className="flex min-h-[calc(100vh-0px)] flex-1 bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <aside className="flex w-56 shrink-0 flex-col border-r border-black/10 bg-white px-4 py-6 dark:border-white/10 dark:bg-zinc-900">
        <p className="px-2 text-xs font-medium tracking-[0.18em] text-zinc-500 uppercase">
          Admin
        </p>
        <nav className="mt-6 flex flex-1 flex-col gap-1">
          <Link
            href="/admin/dashboard"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              homeActive
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            Home
          </Link>
        </nav>
        <div className="mt-auto space-y-3 border-t border-black/10 pt-4 dark:border-white/10">
          {user ? (
            <p className="px-2 text-xs text-zinc-500">
              {user.name}
              <span className="mt-0.5 block truncate">{user.email}</span>
            </p>
          ) : null}
          <button
            type="button"
            disabled={signingOut}
            onClick={handleSignOut}
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-60 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
