"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Category } from "@/data/categories";
import { useLanguage } from "@/contexts/language-context";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const { t, language } = useLanguage();

  return (
    <div className="group flex flex-col bg-background border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={category.image}
          alt={category.name[language]}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2">{category.name[language]}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-1">
          {category.description[language]}
        </p>
        <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link href={category.href ?? `/category/${category.slug}`}>
            {t("shop.explore")} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
