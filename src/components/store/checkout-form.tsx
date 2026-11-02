"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { formatPrice, getProduct } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export function CheckoutForm() {
  const { items, clear, ready } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const lines = items.flatMap((item) => {
    const product = getProduct(item.slug);

    return product ? [{ product, quantity: item.quantity }] : [];
  });
  const subtotal = lines.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  );

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    window.setTimeout(() => {
      setOrderId(`SN-${Date.now().toString(36).toUpperCase()}`);
      clear();
      setPending(false);
    }, 500);
  }

  if (!ready) {
    return <p className="mt-8 text-zinc-400">Loading checkout…</p>;
  }

  if (orderId) {
    return (
      <div className="rise mt-8 rounded-2xl border border-white/10 p-6" role="status">
        <h2 className="text-2xl font-semibold">Order placed</h2>
        <p className="mt-3 text-zinc-300">
          Reference <span className="font-medium text-white">{orderId}</span>.
          This checkout does not take payment.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-zinc-50 px-5 text-sm font-medium text-zinc-950"
        >
          Back to the shop
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mt-8">
        <p className="text-lg text-zinc-400">Add something before checkout.</p>
        <Link href="/cart" className="nav-link mt-4 inline-block text-sm">
          Return to cart
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <form className="grid gap-4" onSubmit={placeOrder}>
        <TextField
          label="Full name"
          name="name"
          autoComplete="name"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          required
        />
        <TextField
          label="Address"
          name="address"
          autoComplete="street-address"
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="City"
            name="city"
            autoComplete="address-level2"
            required
          />
          <TextField
            label="Postal code"
            name="postal"
            autoComplete="postal-code"
            inputMode="numeric"
            required
          />
        </div>
        <Button type="submit" variant="contained" size="large" disabled={pending}>
          {pending ? "Placing order…" : "Place order"}
        </Button>
      </form>
      <aside className="h-fit rounded-2xl border border-white/10 p-5">
        <h2 className="text-lg font-medium">Order</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {lines.map((line) => (
            <li key={line.product.slug} className="flex justify-between gap-3">
              <span>
                {line.product.name} × {line.quantity}
              </span>
              <span className="tabular-nums">
                {formatPrice(line.product.price * line.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex justify-between border-t border-white/10 pt-4">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
      </aside>
    </div>
  );
}
