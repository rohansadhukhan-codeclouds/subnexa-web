"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  ready: boolean;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "subnexa-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (item): item is CartItem =>
                !!item &&
                typeof item === "object" &&
                "slug" in item &&
                "quantity" in item &&
                typeof item.slug === "string" &&
                typeof item.quantity === "number" &&
                item.quantity > 0,
            ),
          );
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      ready,
      add: (slug, quantity = 1) => {
        setItems((current) => {
          const existing = current.find((item) => item.slug === slug);

          if (!existing) {
            return [...current, { slug, quantity }];
          }

          return current.map((item) =>
            item.slug === slug
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        });
      },
      setQuantity: (slug, quantity) => {
        setItems((current) =>
          quantity < 1
            ? current.filter((item) => item.slug !== slug)
            : current.map((item) =>
                item.slug === slug ? { ...item, quantity } : item,
              ),
        );
      },
      remove: (slug) => {
        setItems((current) => current.filter((item) => item.slug !== slug));
      },
      clear: () => setItems([]),
    };
  }, [items, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart must be used within CartProvider");
  }

  return value;
}
