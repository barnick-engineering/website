"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { getMessengerUrlWithText, getPhoneUrl } from "@/lib/order";
import type { PortfolioItem } from "@/lib/portfolioData";

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
            className="relative bg-background border overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col sm:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full sm:w-3/5 min-h-[280px] sm:min-h-[360px] sm:flex-1 shrink-0 bg-muted flex items-center justify-center">
              <Image
                src={item.src}
                alt={item.alt}
                width={1080}
                height={1350}
                className="max-h-[70vh] w-auto h-auto max-w-full object-contain p-4"
                sizes="(max-width: 640px) 100vw, 60vw"
              />
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors text-xl"
                aria-label="আগের ছবি"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={onNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors text-xl"
                aria-label="পরের ছবি"
              >
                ›
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2.5 py-1">
                {currentIndex + 1} / {items.length}
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 sm:w-2/5 min-w-0">
              <div>
                <span className="inline-block text-xs font-medium bg-muted text-muted-foreground px-3 py-1 mb-3">
                  {item.category}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.productName}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.specs}</p>
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <a
                  href={getMessengerUrlWithText(item.messengerText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-foreground text-background text-sm font-medium py-3 hover:opacity-90 transition-opacity"
                >
                  মেসেঞ্জারে অর্ডার করুন
                </a>
                <a
                  href={getPhoneUrl()}
                  className="w-full text-center border border-border text-foreground text-sm font-medium py-3 hover:bg-muted transition-colors"
                >
                  কল করুন
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors text-lg"
              aria-label="বন্ধ করুন"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
