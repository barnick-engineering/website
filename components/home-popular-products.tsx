"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPopularProducts } from "@/data/products";
import { ProductCard } from "@/components/ecommerce/product-card";
import { useLanguage } from "@/contexts/language-context";

export function HomePopularProducts() {
  const { t } = useLanguage();
  const popular = getPopularProducts();

  return (
    <section id="popular" className="w-full py-12 xs:py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl xs:text-4xl font-bold tracking-tight">
              {t("shop.popularTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("shop.popularSubtitle")}</p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline shrink-0"
          >
            {t("shop.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
