"use client";

import { useLanguage } from "@/contexts/language-context";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/ecommerce/category-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const DealsContent = () => {
  const { t } = useLanguage();
  const shopCategories = categories.filter((c) => !c.href);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight">
          {t("deals.title")}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {t("deals.subtitle")}
        </p>
        <Button asChild className="mt-6" size="lg">
          <Link href="/#contact">{t("deals.contactForDeals")}</Link>
        </Button>
      </div>
      <h2 className="text-xl font-semibold mb-6">{t("deals.browseCategories")}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shopCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
