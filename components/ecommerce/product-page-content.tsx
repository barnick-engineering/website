"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ecommerce/product-card";
import { useLanguage } from "@/contexts/language-context";
import { getMessengerOrderUrl, getPhoneUrl } from "@/lib/order";

type ProductPageContentProps = {
  product: Product;
};

export function ProductPageContent({ product }: ProductPageContentProps) {
  const { t, language } = useLanguage();
  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-screen-lg mx-auto px-6 py-8">
      <Link
        href="/shop"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("shop.backToShop")}
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square rounded-2xl overflow-hidden border bg-muted">
          <Image
            src={product.image}
            alt={product.name[language]}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col">
          {product.popular && (
            <Badge className="w-fit mb-3 bg-foreground text-background border-0">
              {t("product.popular")}
            </Badge>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {product.name[language]}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {product.description[language]}
          </p>
          <p className="mt-6 text-2xl font-bold text-foreground">
            {t("product.from")} ৳{product.priceFrom.toLocaleString()}
          </p>
          {product.turnaround && (
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {t("product.turnaround")}: {product.turnaround}
            </p>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1" asChild>
              <a
                href={getMessengerOrderUrl(product.name[language])}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="!h-5 !w-5" />
                {t("product.orderMessenger")}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={getPhoneUrl()}>
                <Phone className="!h-5 !w-5" />
                {t("cta.call")}
              </a>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            {t("product.advanceNote")}
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t("product.related")}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
