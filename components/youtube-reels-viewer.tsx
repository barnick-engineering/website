"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import type { YouTubeShort } from "@/lib/youtube";

type YouTubeReelsViewerProps = {
  shorts: YouTubeShort[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
};

function ReelSlide({
  short,
  isActive,
}: {
  short: YouTubeShort;
  isActive: boolean;
}) {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="relative w-full max-w-[min(100%,420px)] aspect-[9/16] mx-auto">
        {isActive ? (
          <iframe
            src={`https://www.youtube.com/embed/${short.videoId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
            title={short.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full rounded-xl border-0 bg-black"
          />
        ) : (
          <div
            className="absolute inset-0 rounded-xl bg-black bg-cover bg-center"
            style={{ backgroundImage: `url(${short.thumbnailUrl})` }}
          />
        )}
      </div>
      <div className="absolute bottom-6 left-4 right-4 max-w-[min(100%,420px)] mx-auto pointer-events-none">
        <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-md">
          {short.title}
        </p>
      </div>
    </div>
  );
}

export function YouTubeReelsViewer({
  shorts,
  initialIndex = 0,
  isOpen,
  onClose,
}: YouTubeReelsViewerProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, shorts.length - 1));
    slideRefs.current[clamped]?.scrollIntoView({ behavior: "smooth" });
    setActiveIndex(clamped);
  }, [shorts.length]);

  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(initialIndex);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      slideRefs.current[initialIndex]?.scrollIntoView({ behavior: "auto" });
    });
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(index)) setActiveIndex(index);
          }
        }
      },
      { root: container, threshold: [0.6] }
    );

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isOpen, shorts.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") scrollToIndex(activeIndex + 1);
      if (e.key === "ArrowUp") scrollToIndex(activeIndex - 1);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, onClose, scrollToIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={t("reels.title")}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
        aria-label={t("reels.close")}
      >
        <X className="h-6 w-6" />
      </button>

      <p className="absolute top-5 left-4 z-20 text-white/80 text-xs font-medium">
        {t("reels.swipeHint")}
      </p>

      {activeIndex > 0 && (
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          className="absolute top-1/2 left-4 z-20 hidden md:flex h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white items-center justify-center transition-colors"
          aria-label="Previous reel"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {activeIndex < shorts.length - 1 && (
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          className="absolute top-1/2 right-4 z-20 hidden md:flex h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white items-center justify-center transition-colors"
          aria-label="Next reel"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      )}

      <div
        ref={containerRef}
        className="h-[100dvh] overflow-y-scroll snap-y snap-mandatory overscroll-y-contain scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {shorts.map((short, index) => (
          <div
            key={short.videoId}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            data-index={index}
            className="h-[100dvh] snap-start snap-always shrink-0"
          >
            <ReelSlide short={short} isActive={index === activeIndex} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white/60 text-xs tabular-nums">
        {activeIndex + 1} / {shorts.length}
      </div>
    </div>
  );
}
