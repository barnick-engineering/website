"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { getMessengerUrlWithText } from "@/lib/order";
import type { PortfolioItem } from "@/lib/portfolioData";
import { padNumber } from "@/lib/typography";
import { cn } from "@/lib/utils";

const IMAGE_WIDTH = 1080;
const IMAGE_HEIGHT = 1350;

/** Translated value, falling back to the Bengali data string */
export function usePortfolioText() {
  const { t } = useLanguage();
  return (item: PortfolioItem, field: "name" | "alt" | "specs") => {
    const key = `portfolio.item.${item.id}.${field}`;
    const value = t(key);
    if (value !== key) return value;
    return field === "name" ? item.productName : field === "alt" ? item.alt : item.specs;
  };
}

interface Props {
  item: PortfolioItem;
  index: number;
  onOpen: () => void;
}

/** A numbered "plate": image button + visible caption with its own order link (no nested interactives). */
export default function PortfolioCard({ item, index, onOpen }: Props) {
  const { t, language } = useLanguage();
  const text = usePortfolioText();
  const name = text(item, "name");
  const specs = item.specs ? text(item, "specs") : "";

  return (
    <figure className="min-w-0">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${t("portfolio.enlarge")}: ${name}`}
        className="group block w-full aspect-[4/5] overflow-hidden bg-muted border border-border"
      >
        <Image
          src={item.src}
          alt={text(item, "alt")}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          sizes="(max-width: 1023px) 50vw, 25vw"
          loading="lazy"
          className="h-full w-full object-contain object-center transition-transform duration-150 ease-press group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:transform-none"
        />
      </button>
      <figcaption className="mt-3">
        <span
          className={cn(
            "block font-display font-semibold text-primary-strong tabular-nums",
            language === "bn" ? "text-sm" : "text-xs"
          )}
        >
          {t("portfolio.plate").replace("{n}", padNumber(language, index + 1))}
        </span>
        <span className="mt-0.5 block text-base font-semibold text-foreground">{name}</span>
        {specs && <span className="block text-sm text-muted-foreground">{specs}</span>}
        <a
          href={getMessengerUrlWithText(item.messengerText)}
          data-track-item={item.productName}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-foreground underline underline-offset-4 decoration-primary hover:decoration-2"
        >
          {t("portfolio.orderLike")}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </figcaption>
    </figure>
  );
}
