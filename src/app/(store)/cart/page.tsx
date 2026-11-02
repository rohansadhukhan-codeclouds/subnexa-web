"use client";

import Button from "@mui/material/Button";
import Link from "next/link";
import { QuantityStepper } from "@/components/store/quantity-stepper";
import { formatPrice, getProduct } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, remove, setQuantity, ready } = useCart();
  const lines = items.flatMap((item) => {
    const product = getProduct(item.slug);

    return product ? [{ product, quantity: item.quantity }] : [];
  });
  const subtotal = lines.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  );

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14">
      <h1 className="text-5xl font-semibold tracking-tight">Cart</h1>
      {!ready ? (
        <p className="mt-8 text-zinc-400">Loading your cart…</p>
      ) : lines.length === 0 ? (
        <div className="rise mt-8">
          <p className="text-lg text-zinc-400">Your cart is empty.</p>
          <Link
            href="/category/listening"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-zinc-50 px-5 text-sm font-medium text-zinc-950 transition hover:bg-white active:scale-[0.98]"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <ul className="divide-y divide-white/10">
            {lines.map((line) => (
              <li
                key={line.product.slug}
                className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <Link
                    href={`/product/${line.product.slug}`}
                    className="text-lg font-medium hover:underline"
                  >
                    {line.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-zinc-400">
                    {formatPrice(line.product.price)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <QuantityStepper
                    value={line.quantity}
                    label={line.product.name}
                    onChange={(quantity) =>
                      setQuantity(line.product.slug, quantity)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => remove(line.product.slug)}
                    className="text-sm text-zinc-400 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between">
            <p className="text-lg">Subtotal</p>
            <p className="text-lg tabular-nums">{formatPrice(subtotal)}</p>
          </div>
          <Button
            component={Link}
            href="/checkout"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Checkout
          </Button>
        </div>
      )}
    </main>
  );
}
