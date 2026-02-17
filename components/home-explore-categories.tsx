"use client";

import { useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import { categories } from "@/data/categories";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const HomeExploreCategories = () => {
  const { t, language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 180;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full py-12 xs:py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center mb-10">
          {t("home.exploreCategories")}
        </h2>
        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/90 dark:bg-background/80 border shadow-md flex items-center justify-center hover:bg-background transition-colors -translate-x-1"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/90 dark:bg-background/80 border shadow-md flex items-center justify-center hover:bg-background transition-colors translate-x-1"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href ?? `/category/${category.slug}`}
                className="flex-shrink-0 w-[140px] sm:w-[160px] flex flex-col items-center gap-3 group"
              >
                <div className="relative w-full aspect-square rounded-full overflow-hidden border-2 border-muted group-hover:border-primary/50 transition-colors">
                  <Image
                    src={category.image}
                    alt={category.name[language]}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="160px"
                  />
                </div>
                <span className="text-sm font-medium text-center line-clamp-2">
                  {category.name[language]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
