export type Category = {
  slug: string;
  name: string;
  summary: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  summary: string;
  description: string;
  details: string[];
  tone: string;
};

export const categories: Category[] = [
  {
    slug: "listening",
    name: "Listening",
    summary: "Headphones and speakers for a quiet room.",
  },
  {
    slug: "desk",
    name: "Desk",
    summary: "Lamps and trays that keep a workspace calm.",
  },
  {
    slug: "carry",
    name: "Carry",
    summary: "Bags and cases made to travel light.",
  },
];

export const products: Product[] = [
  {
    slug: "arc-one",
    name: "Arc One",
    category: "listening",
    price: 18400,
    summary: "Closed headphones with a soft headband.",
    description:
      "Arc One is built for long listening sessions. The ear cups seal gently, and the headband spreads weight so it stays comfortable after the first hour.",
    details: ["Closed-back", "Detachable cable", "Fold-flat cups"],
    tone: "bg-stone-600",
  },
  {
    slug: "field-speaker",
    name: "Field Speaker",
    category: "listening",
    price: 12600,
    summary: "A small speaker for a desk or a windowsill.",
    description:
      "Field Speaker fills a room without shouting. Set it beside a laptop or carry it to the next table. One dial handles volume.",
    details: ["Rechargeable", "One-dial volume", "Fabric grille"],
    tone: "bg-zinc-600",
  },
  {
    slug: "line-lamp",
    name: "Line Lamp",
    category: "desk",
    price: 6400,
    summary: "A slim lamp with a warm, even pool of light.",
    description:
      "Line Lamp sits at the back of a desk and throws light down onto paper and keys. The arm stays where you leave it.",
    details: ["Warm LED", "Weighted base", "Touch dimmer"],
    tone: "bg-amber-800",
  },
  {
    slug: "oak-tray",
    name: "Oak Tray",
    category: "desk",
    price: 3200,
    summary: "A shallow tray for keys, cables, and a pen.",
    description:
      "Oak Tray is a single piece of wood with a low lip. It keeps the small things on a desk from drifting to the edge.",
    details: ["Solid oak", "Felt feet", "Low lip"],
    tone: "bg-yellow-900",
  },
  {
    slug: "day-tote",
    name: "Day Tote",
    category: "carry",
    price: 4800,
    summary: "A canvas tote with a padded sleeve.",
    description:
      "Day Tote holds a laptop, a notebook, and a bottle. The straps sit wide on the shoulder, and the sleeve keeps a computer from knocking around.",
    details: ["14-inch sleeve", "Canvas body", "Inner pocket"],
    tone: "bg-emerald-900",
  },
  {
    slug: "hard-case",
    name: "Hard Case",
    category: "carry",
    price: 3900,
    summary: "A compact case for headphones or a small camera.",
    description:
      "Hard Case closes with a quiet latch. The lining is soft enough for Arc One, and the shell takes a bump in a bag.",
    details: ["Hinged shell", "Soft lining", "Carry handle"],
    tone: "bg-slate-700",
  },
];

export function formatPrice(amount: number): string {
  const grouped = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `৳${grouped}`;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function productsInCategory(slug: string): Product[] {
  return products.filter((product) => product.category === slug);
}

export function categoryName(slug: string): string {
  return getCategory(slug)?.name ?? slug;
}
