"use client";

import LogoCloud from "@/components/logo-cloud";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { toBengaliDigits } from "@/lib/formatBn";

// Computed once at module load (same value on server and client within a year),
// rendered with suppressHydrationWarning in case the build and visit straddle New Year.
const YEARS_IN_BUSINESS = new Date().getFullYear() - facebookInsights.foundedYear;

export function TrustStrip() {
  const { t, language } = useLanguage();
  const n = (v: number | string) => (language === "bn" ? toBengaliDigits(v) : String(v));

  const facts = [
    { value: n(facebookInsights.foundedYear), label: t("trust.sinceLabel") },
    { value: `${n(YEARS_IN_BUSINESS)}+`, label: t("trust.yearsLabel"), years: true },
    { value: n(facebookInsights.turnaroundDays), label: t("stats.turnaround") },
  ];

  return (
    <section
      data-track-section="stats"
      aria-labelledby="trust-heading"
      className="bg-muted px-4 sm:px-6 lg:px-8 py-10 lg:py-14"
    >
      <div className="max-w-[75rem] mx-auto">
        <h2 id="trust-heading" className="sr-only">
          {t("trust.heading")}
        </h2>

        {/* OWNER-GATED: clients count / followers / reach / rating from data/insights.ts — unverified, do not render. */}
        <dl className="grid grid-cols-3 gap-px bg-border border border-border">
          {facts.map((f) => (
            <div key={f.label} className="bg-muted p-3 sm:p-4 lg:p-8 min-h-[112px] flex flex-col justify-between">
              <dt className="order-2 mt-2 text-sm text-muted-foreground">{f.label}</dt>
              <dd
                className="order-1 font-display text-2xl sm:text-display-l tabular-nums text-foreground"
                suppressHydrationWarning={f.years}
              >
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        <LogoCloud />
      </div>
    </section>
  );
}
