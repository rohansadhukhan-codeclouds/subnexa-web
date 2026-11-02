import Link from "next/link";
import { categoryName, formatPrice, type Product } from "@/lib/catalog";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rise block rounded-2xl border border-white/10 bg-zinc-900/70 p-3 outline-none transition duration-300 hover:-translate-y-1 hover:border-white/30 focus-visible:border-white"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className={`overflow-hidden rounded-xl ${product.tone}`}>
        <div className="flex aspect-[4/5] items-end p-4 transition duration-500 group-hover:scale-[1.04]">
          <span className="text-sm text-white/80">
            {categoryName(product.category)}
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-1 pb-1">
        <div>
          <h2 className="text-lg font-medium tracking-tight">{product.name}</h2>
          <p className="mt-1 text-sm text-zinc-400">{product.summary}</p>
        </div>
        <p className="shrink-0 text-sm tabular-nums">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
