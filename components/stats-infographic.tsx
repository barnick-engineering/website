"use client";

import { facebookInsights } from "@/data/insights";
import { useLanguage } from "@/contexts/language-context";

export function StatsInfographic() {
  const { t } = useLanguage();
  const yearsInBusiness = new Date().getFullYear() - facebookInsights.foundedYear;

  const stats = [
    {
      value: String(facebookInsights.foundedYear),
      label: t("stats.since"),
    },
    {
      value: `${facebookInsights.trustedClients}+`,
      label: t("stats.clients"),
    },
    {
      value: facebookInsights.turnaroundDays,
      label: t("stats.turnaround"),
    },
  ];

  return (
    <section className="w-full py-10 px-6 border-y bg-muted/30">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border"
          >
            <span className="text-3xl sm:text-4xl font-bold text-foreground tabular-nums">
              {stat.value}
            </span>
            <span className="mt-2 text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">
        {t("stats.yearsNote").replace("{years}", String(yearsInBusiness))}
      </p>
    </section>
  );
}
