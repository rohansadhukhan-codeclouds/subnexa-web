import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>Subnexa objects, made for everyday rooms.</p>
        <div className="flex gap-4">
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/category/listening" className="nav-link">
            Shop
          </Link>
          <Link href="/cart" className="nav-link">
            Cart
          </Link>
        </div>
      </div>
    </footer>
  );
}
