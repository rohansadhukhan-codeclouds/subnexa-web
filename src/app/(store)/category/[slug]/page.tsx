import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductCard } from "@/components/store/product-card";
import {
  categories,
  getCategory,
  productsInCategory,
} from "@/lib/catalog";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  return {
    title: category?.name ?? "Category",
    description: category?.summary,
  };
}

function CategoryFallback() {
  return <p className="px-5 py-14 text-zinc-400">Loading category…</p>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryFallback />}>
      <CategoryDetails params={params} />
    </Suspense>
  );
}

async function CategoryDetails({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const items = productsInCategory(category.slug);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14">
      <p className="text-sm tracking-[0.18em] text-zinc-400 uppercase">
        Category
      </p>
      <h1 className="rise mt-3 text-5xl font-semibold tracking-tight">
        {category.name}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-400">{category.summary}</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </main>
  );
}
