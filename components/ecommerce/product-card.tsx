"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useLanguage } from "@/contexts/language-context";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { t, language } = useLanguage();

  return (
    <div className="group flex flex-col bg-background border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/product/${product.slug}`} className="relative w-full h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name[language]}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
            {product.name[language]}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-2">
          {product.description[language]}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">
            {t("product.startingFrom")} ৳{product.basePrice}
          </span>
          <Button asChild>
            <Link href={`/product/${product.slug}`}>
              {t("product.customize")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
