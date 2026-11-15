"use client";

import { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";
import { portfolioItems, type PortfolioItem } from "@/lib/portfolioData";
import { trackEvent } from "@/lib/analytics";
import { numberLocale } from "@/lib/typography";
import PortfolioCard from "./PortfolioCard";
import PortfolioLightbox from "./PortfolioLightbox";

// 7 plates + the ask tile fill a 4×2 desktop grid; load-more stays for future photos.
const INITIAL_COUNT = 8;
const LOAD_MORE_COUNT = 8;

export default function PortfolioSection() {
  const { t, language } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const items = portfolioItems;
  const visible = items.slice(0, visibleCount);
  const remaining = Math.max(items.length - visibleCount, 0);
  const hasMore = remaining > 0;

  const handleLightboxPrev = () => {
    if (!lightboxItem) return;
    const idx = items.findIndex((i) => i.id === lightboxItem.id);
    setLightboxItem(items[(idx - 1 + items.length) % items.length]);
  };

  const handleLightboxNext = () => {
    if (!lightboxItem) return;
    const idx = items.findIndex((i) => i.id === lightboxItem.id);
    setLightboxItem(items[(idx + 1) % items.length]);
  };

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
    >
      <div className="max-w-[75rem] mx-auto w-full">
        <SectionHeader
          id="products-heading"
          number={3}
          eyebrow={t("portfolio.eyebrow")}
          title={t("portfolio.title")}
          lead={t("portfolio.subtitle")}
        />

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 lg:gap-x-6 lg:gap-y-12">
          {visible.map((item, index) => (
            <PortfolioCard
              key={item.id}
              item={item}
              index={index}
              onOpen={() => {
                trackEvent("portfolio_open", {
                  item_id: item.id,
                  item_name: item.productName,
                  category: item.category,
                });
                setLightboxItem(item);
              }}
            />
          ))}

          {/* Ask tile — rendered outside the items slice; full width + auto height on mobile */}
          <div
            data-track-source="portfolio_ask"
            className="col-span-2 lg:col-span-1 crop-marks bg-card p-5 lg:p-6 flex flex-col justify-end lg:aspect-[4/5]"
          >
            <h3 className="font-display text-display-m text-foreground">{t("portfolio.askTitle")}</h3>
            <p className="mt-2 text-sm text-ink-2">{t("portfolio.askBody")}</p>
            <div className="mt-4 flex flex-col sm:flex-row lg:flex-col gap-2">
              <Button className="w-full whitespace-normal h-auto min-h-11 py-2" asChild>
                <a
                  href={facebookInsights.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-item="portfolio_ask"
                >
                  <MessageCircle aria-hidden />
                  {t("portfolio.ask")}
                </a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href={getPhoneUrl()}>
                  <Phone aria-hidden />
                  {t("cta.call")}
                </a>
              </Button>
            </div>
          </div>
        </div>
        {/* OWNER-GATED: packaging gallery / more job photos — add to portfolioItems only with real photos. */}

        {hasMore && (
          <div className="mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                trackEvent("portfolio_load_more", {
                  category: "সব",
                  shown: visibleCount + LOAD_MORE_COUNT,
                });
                setVisibleCount((c) => c + LOAD_MORE_COUNT);
              }}
            >
              {t("portfolio.loadMore").replace(
                "{n}",
                remaining.toLocaleString(numberLocale(language))
              )}
            </Button>
          </div>
        )}
      </div>

      <PortfolioLightbox
        item={lightboxItem}
        items={items}
        onClose={() => setLightboxItem(null)}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
      />
    </section>
  );
}
