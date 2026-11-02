import type { Metadata } from "next";
import { CheckoutForm } from "@/components/store/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Delivery details for your Subnexa order.",
};

export default function CheckoutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14">
      <h1 className="text-5xl font-semibold tracking-tight">Checkout</h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-400">
        Tell us where to send the order. Payment is not collected on this page.
      </p>
      <CheckoutForm />
    </main>
  );
}
