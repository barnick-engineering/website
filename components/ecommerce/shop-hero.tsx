"use client";

import { useLanguage } from "@/contexts/language-context";
import { Badge } from "@/components/ui/badge";

export const ShopHero = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center py-20 px-6">
      <div className="text-center max-w-2xl">
        <Badge className="bg-primary rounded-full py-1 border-none mb-6">
          {t("shop.title")}
        </Badge>
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          {t("shop.title")}
        </h1>
        <p className="mt-6 max-w-[60ch] xs:text-lg text-muted-foreground">
          {t("shop.subtitle")}
        </p>
      </div>
    </div>
  );
};
