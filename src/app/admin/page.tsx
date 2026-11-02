import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata: Metadata = {
  title: "Admin sign in",
  description: "Sign in to the Subnexa admin",
};

export default function AdminPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <main className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950 sm:p-8">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
          Subnexa
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Admin sign in</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Use your admin email and password to continue.
        </p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </main>
    </div>
  );
}
