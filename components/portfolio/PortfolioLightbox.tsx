"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { getMessengerUrlWithText, getPhoneUrl } from "@/lib/order";
import type { PortfolioItem } from "@/lib/portfolioData";
import { numberLocale } from "@/lib/typography";
import { usePortfolioText } from "./PortfolioCard";

interface Props {
  item: PortfolioItem | null;
  items: PortfolioItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function PortfolioLightbox({
  item,
  items,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const { t, language } = useLanguage();
  const text = usePortfolioText();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  useEffect(() => {
    if (!item) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [item, onClose, onPrev, onNext]);

  if (!mounted) return null;

  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={text(item, "name")}
            className="relative bg-card border border-border overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col sm:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full sm:w-3/5 min-h-[280px] sm:min-h-[360px] sm:flex-1 shrink-0 bg-muted flex items-center justify-center">
              <Image
                src={item.src}
                alt={text(item, "alt")}
                width={1080}
                height={1350}
                className="max-h-[70vh] w-auto h-auto max-w-full object-contain p-4"
                sizes="(max-width: 640px) 100vw, 60vw"
              />
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-foreground/70 text-background flex items-center justify-center hover:bg-foreground transition-colors"
                aria-label={t("portfolio.prev")}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={onNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-foreground/70 text-background flex items-center justify-center hover:bg-foreground transition-colors"
                aria-label={t("portfolio.next")}
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-foreground/80 text-background text-sm px-3 py-1 tabular-nums">
                {(currentIndex + 1).toLocaleString(numberLocale(language))} /{" "}
                {items.length.toLocaleString(numberLocale(language))}
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 sm:w-2/5 min-w-0">
              <div>
                <h3 className="font-display text-display-m text-foreground mb-2">{text(item, "name")}</h3>
                {item.specs && (
                  <p className="text-sm text-muted-foreground">{text(item, "specs")}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <a
                  href={getMessengerUrlWithText(item.messengerText)}
                  data-track-item={item.productName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-12 inline-flex items-center justify-center bg-primary text-primary-foreground text-base font-semibold px-4 hover:bg-primary-hover transition-colors"
                >
                  {t("portfolio.orderLike")}
                </a>
                <a
                  href={getPhoneUrl()}
                  className="w-full min-h-12 inline-flex items-center justify-center border border-foreground text-foreground text-base font-semibold px-4 hover:bg-foreground hover:text-background transition-colors"
                >
                  {t("cta.call")}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 w-11 h-11 bg-foreground/70 text-background flex items-center justify-center hover:bg-foreground transition-colors"
              aria-label={t("nav.menuClose")}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
