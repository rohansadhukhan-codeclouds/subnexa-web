import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "The studio behind Subnexa objects.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16">
      <p className="rise text-sm tracking-[0.18em] text-zinc-400 uppercase">
        About us
      </p>
      <h1 className="rise mt-4 text-5xl font-semibold tracking-tight">
        A small studio for everyday objects.
      </h1>
      <div className="rise mt-8 space-y-5 text-lg leading-8 text-zinc-300" style={{ animationDelay: "80ms" }}>
        <p>
          Subnexa designs a short list of things you keep nearby: something to
          listen with, something to light a desk, something to carry the day.
        </p>
        <p>
          We work in Dhaka and ship across Bangladesh. Each piece is meant to
          be repaired, not replaced, and to look the same after a year of use.
        </p>
        <p>
          The shop is the whole catalog. If it is on the site, it is in stock.
        </p>
      </div>
      <Link
        href="/category/desk"
        className="mt-10 inline-flex h-11 items-center rounded-full border border-white/20 px-5 text-sm transition duration-200 hover:border-white hover:bg-white/5 active:scale-[0.98]"
      >
        See the desk collection
      </Link>
    </main>
  );
}
