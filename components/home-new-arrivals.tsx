"use client";

import { useLanguage } from "@/contexts/language-context";
import { categories } from "@/data/categories";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const NEW_ARRIVALS_COUNT = 4;
const shopCategories = categories.filter((c) => !c.href).slice(0, NEW_ARRIVALS_COUNT);

export const HomeNewArrivals = () => {
  const { t, language } = useLanguage();

  return (
    <div className="w-full py-12 xs:py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight">
            {t("home.newArrivalsTitle")}
          </h2>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline shrink-0"
          >
            {t("home.seeAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shopCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href ?? `/category/${category.slug}`}
              className="group relative aspect-[4/3] sm:aspect-[3/2] rounded-xl overflow-hidden border"
            >
              <Image
                src={category.image}
                alt={category.name[language]}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-lg font-semibold text-white drop-shadow-md">
                  New in {category.name[language]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
