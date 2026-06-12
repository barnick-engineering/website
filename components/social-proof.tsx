"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { facebookInsights } from "@/data/insights";
import { getProductBySlug } from "@/data/products";
import { useLanguage } from "@/contexts/language-context";

export function SocialProof() {
  const { t, language } = useLanguage();

  const items = facebookInsights.topPosts
    .map((post) => {
      const product = getProductBySlug(post.productSlug);
      if (!product) return null;
      return { ...post, product };
    })
    .filter(Boolean);

  return (
    <section className="w-full py-12 xs:py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl xs:text-4xl font-bold tracking-tight text-center">
          {t("socialProof.title")}
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          {t("socialProof.subtitle")}
        </p>
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {items.map(
            (item) =>
              item && (
                <Link
                  key={item.productSlug}
                  href={`/product/${item.product.slug}`}
                  className="group flex flex-col rounded-2xl border bg-background overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.product.name[language]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between gap-2">
                    <span className="font-medium text-sm line-clamp-1">
                      {item.product.name[language]}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-primary shrink-0">
                      <Heart className="h-3.5 w-3.5 fill-primary" />
                      {item.engagement}
                    </span>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
    </section>
  );
}
