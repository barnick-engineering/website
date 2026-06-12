"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/ecommerce/product-card";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

type ShopPageContentProps = {
  activeCategory?: string;
};

export function ShopPageContent({ activeCategory }: ShopPageContentProps) {
  const { t, language } = useLanguage();

  const filtered = activeCategory
    ? products.filter((p) => p.categorySlug === activeCategory)
    : products;

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
        {t("shop.title")}
      </h1>
      <p className="mt-2 text-muted-foreground">{t("shop.subtitle")}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
            !activeCategory
              ? "bg-foreground text-background border-foreground"
              : "hover:bg-muted"
          )}
        >
          {t("shop.all")}
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
              activeCategory === cat.slug
                ? "bg-foreground text-background border-foreground"
                : "hover:bg-muted"
            )}
          >
            {cat.name[language]}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          {t("shop.empty")}
        </p>
      )}
    </div>
  );
}
