"use client";

import { facebookInsights } from "@/data/insights";
import { useLanguage } from "@/contexts/language-context";

export function CategoryChart() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-12 xs:py-16 px-6 bg-muted/30">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl xs:text-4xl font-bold tracking-tight text-center">
          {t("chart.title")}
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          {t("chart.subtitle")}
        </p>
        <div className="mt-10 space-y-4">
          {facebookInsights.categoryPopularity.map((item, i) => (
            <div key={item.slug}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{t(item.labelKey)}</span>
                <span className="text-muted-foreground tabular-nums">
                  {item.percent}%
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{
                    width: `${item.percent}%`,
                    opacity: 1 - i * 0.08,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
