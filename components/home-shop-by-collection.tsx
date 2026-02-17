"use client";

import { useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const collections = [
  { key: "home.collectionTopProducts", href: "/shop", image: "/testimonials/6.webp" },
  { key: "home.collectionGifts", href: "/category/promotional-products", image: "/testimonials/2.webp" },
  { key: "home.collectionBusiness", href: "/category/business-essentials", image: "/testimonials/3.webp" },
  { key: "home.collectionEvent", href: "/category/event-personal", image: "/testimonials/4.webp" },
  { key: "home.collectionDesign", href: "/design-services", image: "/testimonials/1.webp" },
] as const;

export const HomeShopByCollection = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full py-12 xs:py-16 px-6 bg-muted/20">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight">
            {t("home.shopByCollection")}
          </h2>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline shrink-0"
          >
            {t("home.seeAllCollections")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/90 border shadow-md flex items-center justify-center hover:bg-background transition-colors -translate-x-1"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/90 border shadow-md flex items-center justify-center hover:bg-background transition-colors translate-x-1"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {collections.map(({ key, href, image }) => (
              <Link
                key={key}
                href={href}
                className="flex-shrink-0 w-[240px] sm:w-[280px] group"
              >
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border bg-muted">
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="280px"
                  />
                </div>
                <span className="mt-2 block text-sm font-medium">
                  {t(key)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
