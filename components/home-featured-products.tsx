"use client";

import { useLanguage } from "@/contexts/language-context";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ecommerce/product-card";

const FEATURED_COUNT = 6;

export const HomeFeaturedProducts = () => {
  const { t } = useLanguage();
  const featured = products.slice(0, FEATURED_COUNT);

  return (
    <div id="featured" className="w-full py-12 xs:py-16 px-6 bg-muted/20">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center mb-10">
          {t("home.featuredProducts")}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
