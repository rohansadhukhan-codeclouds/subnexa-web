import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/store/product-card";
import { categories, products } from "@/lib/catalog";

export const metadata: Metadata = {
  description: "Objects for listening, working, and carrying.",
};

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <main>
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-end md:py-24">
        <div className="rise">
          <p className="text-sm tracking-[0.18em] text-zinc-400 uppercase">
            New season
          </p>
          <h1 className="mt-4 max-w-xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            Quiet objects for a loud day.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-zinc-400">
            Headphones, lamps, and bags made to stay in the background until
            you need them.
          </p>
          <Link
            href="/category/listening"
            className="mt-8 inline-flex h-11 items-center rounded-full bg-zinc-50 px-5 text-sm font-medium text-zinc-950 transition duration-200 hover:scale-[1.02] hover:bg-white active:scale-[0.98]"
          >
            Shop listening
          </Link>
        </div>
        <Link
          href="/product/arc-one"
          className="group rise block overflow-hidden rounded-3xl bg-stone-600"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex aspect-[4/5] flex-col justify-end p-6 transition duration-500 group-hover:scale-[1.03] sm:aspect-[5/4]">
            <p className="text-sm text-white/75">Featured</p>
            <p className="mt-2 text-3xl font-medium">Arc One</p>
          </div>
        </Link>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rise rounded-2xl border border-white/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/30"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <h3 className="text-xl font-medium">{category.name}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {category.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-20">
        <h2 className="text-2xl font-semibold tracking-tight">In the shop</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
