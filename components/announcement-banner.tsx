"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ANNOUNCEMENT_KEYS = ["home.announcement1", "home.announcement2"] as const;

export const AnnouncementBanner = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % ANNOUNCEMENT_KEYS.length);
  const prev = () =>
    setIndex((i) => (i - 1 + ANNOUNCEMENT_KEYS.length) % ANNOUNCEMENT_KEYS.length);

  return (
    <div className="w-full bg-foreground text-background py-2.5 px-6 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={prev}
        className="p-1 rounded hover:bg-white/10 transition-colors"
        aria-label="Previous announcement"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <p className="text-center text-sm font-medium flex-1">
        {t(ANNOUNCEMENT_KEYS[index])}
      </p>
      <button
        type="button"
        onClick={next}
        className="p-1 rounded hover:bg-white/10 transition-colors"
        aria-label="Next announcement"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
