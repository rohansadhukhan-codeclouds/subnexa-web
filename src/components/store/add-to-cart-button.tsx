"use client";

import Button from "@mui/material/Button";
import { useState } from "react";
import { useCart } from "@/lib/cart";

type AddToCartButtonProps = {
  slug: string;
  quantity?: number;
};

export function AddToCartButton({ slug, quantity = 1 }: AddToCartButtonProps) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <Button
      variant="contained"
      size="large"
      aria-live="polite"
      onClick={() => {
        add(slug, quantity);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
      sx={{
        transform: added ? "scale(0.98)" : "scale(1)",
        transition: "transform 160ms ease",
      }}
    >
      {added ? "Added to cart" : "Add to cart"}
    </Button>
  );
}
