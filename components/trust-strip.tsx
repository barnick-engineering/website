"use client";

import { useLanguage } from "@/contexts/language-context";
import { Truck, Headphones, Star } from "lucide-react";

export const TrustStrip = () => {
  const { t } = useLanguage();

  const items = [
    {
      icon: Truck,
      title: t("home.trustFreeShipping"),
      subtitle: t("home.trustFreeShippingSub"),
    },
    {
      icon: Headphones,
      title: t("home.trustHelp"),
      subtitle: t("home.trustHelpSub"),
    },
    {
      icon: Star,
      title: t("home.trustReviews"),
      subtitle: t("home.trustReviewsSub"),
    },
  ];

  return (
    <div className="w-full border-y bg-muted/30">
      <div className="max-w-screen-xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {items.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {title}
              </span>
              <span className="text-xs text-muted-foreground">{subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
