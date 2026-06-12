"use client";

import { useLanguage } from "@/contexts/language-context";

export function YouTubeShortsHeader() {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight">
        {t("reels.title")}
      </h2>
      <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
        {t("reels.subtitle")}
      </p>
    </div>
  );
}
