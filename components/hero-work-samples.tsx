"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { trackEvent } from "@/lib/analytics";
import { portfolioItems } from "@/lib/portfolioData";

// A spread of what the press makes: bag, visiting card, stickers, invitation.
const SAMPLE_IDS = ["1", "6", "7", "2"];
const samples = SAMPLE_IDS.map((id) => portfolioItems.find((p) => p.id === id)).filter(
  (p): p is (typeof portfolioItems)[number] => Boolean(p)
);

/**
 * Mobile hero: a swipeable strip of real job photos under the CTAs.
 * Images are small and lazy so the H1 stays the LCP element.
 */
export function HeroWorkSamples() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-semibold text-foreground">{t("hero.recentWork")}</p>
        <a
          href="#products"
          data-track-item="hero_all_work"
          onClick={() => trackEvent("hero_sample_click", { item_id: "all" })}
          className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary-strong underline underline-offset-4 decoration-1 hover:decoration-2"
        >
          {t("hero.allWork")}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </a>
      </div>

      <ul className="mt-2 -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {samples.map((item) => (
          <li key={item.id} className="w-36 shrink-0 snap-start">
            <a
              href="#products"
              data-track-item={`hero_sample_${item.id}`}
              onClick={() =>
                trackEvent("hero_sample_click", { item_id: item.id, item_name: item.productName })
              }
              className="block border border-border bg-card p-1.5 shadow-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="block overflow-hidden bg-muted">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1080}
                  height={1350}
                  sizes="144px"
                  className="aspect-[4/5] h-auto w-full object-cover"
                />
              </span>
              <span className="block px-1 pb-0.5 pt-1.5 text-sm font-medium text-ink-2 line-clamp-1">
                {item.productName}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
