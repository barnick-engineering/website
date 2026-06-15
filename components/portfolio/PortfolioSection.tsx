"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";
import {
  portfolioItems,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/lib/portfolioData";
import CategoryFilter from "./CategoryFilter";
import PortfolioCard from "./PortfolioCard";
import PortfolioLightbox from "./PortfolioLightbox";

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 6;

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("সব");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "সব") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = (cat: PortfolioCategory) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_COUNT);
    setLightboxItem(null);
  };

  const handleLightboxPrev = () => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex((i) => i.id === lightboxItem.id);
    setLightboxItem(filtered[(idx - 1 + filtered.length) % filtered.length]);
  };

  const handleLightboxNext = () => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex((i) => i.id === lightboxItem.id);
    setLightboxItem(filtered[(idx + 1) % filtered.length]);
  };

  return (
    <section id="products" className="py-14 px-4 xs:px-6 max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
          কাজের নমুনা / পোর্টফোলিও
        </h2>
        <p className="text-sm text-muted-foreground">
          বিভাগ অনুযায়ী দেখুন — পছন্দ হলে সরাসরি অর্ডার করুন
        </p>
      </div>

      <div className="mb-6">
        <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-2"
        layout
      >
        <AnimatePresence mode="popLayout">
          {visible.map((item, index) => (
            <PortfolioCard
              key={item.id}
              item={item}
              priority={index < 3}
              onClick={() => setLightboxItem(item)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
            className="px-6 py-2.5 border border-border text-sm text-foreground hover:bg-muted transition-colors"
          >
            আরও দেখুন ({filtered.length - visibleCount} টি বাকি)
          </button>
        </div>
      )}

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/40 border px-6 py-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          আপনার প্রয়োজনীয় পণ্য খুঁজে পাচ্ছেন না?
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <a
            href={facebookInsights.messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-foreground text-background px-4 py-2 hover:opacity-90 transition-opacity"
          >
            মেসেঞ্জারে জিজ্ঞেস করুন
          </a>
          <a
            href={getPhoneUrl()}
            className="text-sm border border-border text-foreground px-4 py-2 hover:bg-muted transition-colors"
          >
            কল করুন
          </a>
        </div>
      </div>

      <PortfolioLightbox
        item={lightboxItem}
        items={filtered}
        onClose={() => setLightboxItem(null)}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
      />
    </section>
  );
}
