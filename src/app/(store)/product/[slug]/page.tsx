import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import {
  categoryName,
  formatPrice,
  getProduct,
  products,
} from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  return {
    title: product?.name ?? "Product",
    description: product?.summary,
  };
}

function ProductFallback() {
  return <p className="px-5 py-14 text-zinc-400">Loading product…</p>;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductFallback />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center">
      <div className={`rise overflow-hidden rounded-3xl ${product.tone}`}>
        <div className="flex aspect-square items-end p-8">
          <p className="text-sm text-white/80">
            {categoryName(product.category)}
          </p>
        </div>
      </div>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <Link
          href={`/category/${product.category}`}
          className="nav-link text-sm text-zinc-400"
        >
          {categoryName(product.category)}
        </Link>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">
          {product.name}
        </h1>
        <p className="mt-4 text-2xl tabular-nums">{formatPrice(product.price)}</p>
        <p className="mt-5 max-w-lg text-lg leading-8 text-zinc-300">
          {product.description}
        </p>
        <ul className="mt-6 space-y-2 text-sm text-zinc-400">
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <div className="mt-8">
          <AddToCartButton slug={product.slug} />
        </div>
      </div>
    </main>
  );
}
