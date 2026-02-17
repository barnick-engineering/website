"use client";

import { useState } from "react";
import { Breadcrumb } from "./breadcrumb";
import { ProductCard } from "./product-card";
import { getProductsByCategory } from "@/data/products";
import { categories } from "@/data/categories";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export const CategoryPageContent = ({ categorySlug }: { categorySlug: string }) => {
  const { t, language } = useLanguage();
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const category = categories.find((cat) => cat.slug === categorySlug);
  const products = getProductsByCategory(categorySlug);

  if (!category) {
    return <div>{t("category.noProducts")}</div>;
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "priceLow":
        return a.basePrice - b.basePrice;
      case "priceHigh":
        return b.basePrice - a.basePrice;
      case "newest":
        return 0; // Mock: all products are same age
      default:
        return 0; // Popular (default)
    }
  });

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.shop"), href: "/shop" },
    { label: category.name[language] },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-6 xl:px-0 py-8 xs:py-12">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-8">
        <h1 className="text-3xl xs:text-4xl font-bold mb-4">
          {category.name[language]}
        </h1>
        <p className="text-muted-foreground">{category.description[language]}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden"
        >
          <Filter className="h-4 w-4 mr-2" />
          {t("category.filters")}
        </Button>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">{t("category.sortBy")}:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 rounded-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="popular">{t("category.sort.popular")}</option>
            <option value="priceLow">{t("category.sort.priceLow")}</option>
            <option value="priceHigh">{t("category.sort.priceHigh")}</option>
            <option value="newest">{t("category.sort.newest")}</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 border rounded-xl bg-background sm:hidden">
          <p className="text-sm text-muted-foreground">
            {t("category.filters")} - {t("common.loading")}
          </p>
        </div>
      )}

      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("category.noProducts")}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
