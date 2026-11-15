"use client";

import { ArrowRight, IdCard, Package, PartyPopper, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import {
  STICKER_2X2_FIXED_TIER_PRICES,
  VISITING_FIXED_TIER_PRICES,
} from "@/lib/calculateEstimate";
import { trackEvent } from "@/lib/analytics";
import { requestEstimateProduct, type EstimateProductId } from "@/lib/estimateEvents";
import { numberLocale } from "@/lib/typography";
import { cn } from "@/lib/utils";

type Need = "seller" | "business" | "events";

type Action = {
  labelKey: string;
  href: "#estimate" | "#products" | "#design";
  trackItem: string;
  product?: EstimateProductId;
};

type NeedCard = {
  need: Need;
  icon: LucideIcon;
  index: { bn: string; en: string };
  anchor?: { key: string; qty: number; price: number };
  primary: Action;
  secondary: Action;
};

const CARDS: NeedCard[] = [
  {
    need: "seller",
    icon: Package,
    index: { bn: "ক", en: "A" },
    anchor: {
      key: "need.seller.anchor",
      qty: 1000,
      price: STICKER_2X2_FIXED_TIER_PRICES[1000],
    },
    primary: {
      labelKey: "need.seller.cta",
      href: "#estimate",
      trackItem: "need_seller_estimate",
      product: "round-sticker",
    },
    secondary: { labelKey: "need.samples", href: "#products", trackItem: "need_seller_samples" },
  },
  {
    need: "business",
    icon: IdCard,
    index: { bn: "খ", en: "B" },
    anchor: {
      key: "need.business.anchor",
      qty: 500,
      price: VISITING_FIXED_TIER_PRICES[500],
    },
    primary: {
      labelKey: "need.business.cta",
      href: "#estimate",
      trackItem: "need_business_estimate",
      product: "visiting-card",
    },
    secondary: {
      labelKey: "need.business.cta2",
      href: "#estimate",
      trackItem: "need_business_memo",
      product: "cash-memo",
    },
  },
  {
    need: "events",
    icon: PartyPopper,
    index: { bn: "গ", en: "C" },
    // No event pricing exists — show a note instead of an anchor price.
    primary: { labelKey: "need.events.cta", href: "#design", trackItem: "need_events_design" },
    secondary: { labelKey: "need.samples", href: "#products", trackItem: "need_events_samples" },
  },
];

export default function ShopByNeed() {
  const { t, language } = useLanguage();
  const locale = numberLocale(language);

  const onAction = (need: Need, action: Action) => () => {
    trackEvent("need_select", {
      need,
      target: action.href.slice(1),
      product: action.product,
    });
    // Preselect the estimator product; default hash navigation continues.
    if (action.product) requestEstimateProduct(action.product);
  };

  const trackProps = (card: NeedCard, action: Action) => ({
    "data-track-source": "shop_by_need",
    "data-track-item": action.trackItem,
    // Value only where the anchor price belongs to the product this action opens
    ...(card.anchor && action === card.primary && action.product && {
      "data-track-value": card.anchor.price,
    }),
  });

  return (
    <section
      aria-labelledby="need-heading"
      data-track-section="need"
      className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
    >
      <div className="max-w-[75rem] mx-auto">
        <SectionHeader
          id="need-heading"
          number={1}
          eyebrow={t("need.eyebrow")}
          title={t("need.title")}
        />

        <ul className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <li key={card.need} className="h-full">
                <article
                  className={cn(
                    "group relative h-full bg-card border border-border p-6 lg:p-8 flex flex-col",
                    "transition duration-150 ease-press hover:-translate-y-0.5 hover:shadow-paper",
                    "motion-reduce:transition-none motion-reduce:transform-none"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} aria-hidden />
                    <span aria-hidden className="font-display text-lg font-semibold text-primary-strong">
                      {card.index[language]}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      "mt-5 font-display text-display-m text-foreground",
                      language === "bn" && "tracking-normal"
                    )}
                  >
                    {t(`need.${card.need}.title`)}
                  </h3>
                  <p className="mt-3 text-base text-ink-2">{t(`need.${card.need}.desc`)}</p>

                  <div className="mt-6 border-t border-border pt-4">
                    {card.anchor ? (
                      <>
                        <p className="text-sm font-semibold text-muted-foreground">{t("product.from")}</p>
                        <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-foreground">
                          {t(card.anchor.key)
                            .replace("{qty}", card.anchor.qty.toLocaleString(locale))
                            .replace("{price}", card.anchor.price.toLocaleString(locale))}
                        </p>
                      </>
                    ) : (
                      <p className="text-base text-ink-2">{t("need.events.note")}</p>
                    )}
                  </div>

                  <div className="mt-auto pt-6 flex flex-col gap-2">
                    <Button size="lg" className="w-full justify-between whitespace-normal text-left min-h-12 h-auto py-3" asChild>
                      <a
                        href={card.primary.href}
                        onClick={onAction(card.need, card.primary)}
                        {...trackProps(card, card.primary)}
                      >
                        {t(card.primary.labelKey)}
                        <ArrowRight aria-hidden />
                      </a>
                    </Button>
                    <Button variant="link" className="min-h-11 h-auto px-0 justify-start whitespace-normal text-left" asChild>
                      <a
                        href={card.secondary.href}
                        onClick={onAction(card.need, card.secondary)}
                        {...trackProps(card, card.secondary)}
                      >
                        {t(card.secondary.labelKey)}
                      </a>
                    </Button>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        {/* OWNER-GATED: kit tiers / packaging price anchors — needs owner costing (P1b). */}
      </div>
    </section>
  );
}
