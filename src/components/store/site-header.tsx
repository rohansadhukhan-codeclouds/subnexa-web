"use client";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

const links = [
  ...categories.map((category) => ({
    href: `/category/${category.slug}`,
    label: category.name,
  })),
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.18em] uppercase"
        >
          Subnexa
        </Link>
        <nav aria-label="Store" className="hidden items-center gap-5 sm:flex">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link text-sm ${active ? "text-white" : "text-zinc-400"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <IconButton
          component={Link}
          href="/cart"
          aria-label={count === 0 ? "Cart, empty" : `Cart, ${count} items`}
          color="inherit"
        >
          <Badge
            badgeContent={count}
            color="primary"
            invisible={count === 0}
            slotProps={{ badge: { className: "pop" } }}
          >
            <ShoppingBagOutlinedIcon />
          </Badge>
        </IconButton>
      </div>
      <nav aria-label="Store sections" className="flex gap-4 overflow-x-auto px-5 pb-3 sm:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-link shrink-0 text-sm text-zinc-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
