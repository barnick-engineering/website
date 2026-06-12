"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";
import { useLanguage } from "@/contexts/language-context";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { t, language } = useLanguage();

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col bg-background border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name[language]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        {product.popular && (
          <Badge className="absolute top-3 left-3 bg-foreground text-background border-0">
            {t("product.popular")}
          </Badge>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold line-clamp-1">
          {product.name[language]}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2 flex-1">
          {product.description[language]}
        </p>
        <p className="mt-3 text-sm font-medium text-foreground">
          {t("product.from")} ৳{product.priceFrom.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
