"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { useLanguage } from "@/contexts/language-context";
import { guideFlow } from "@/data/guide-flow";
import { padNumber } from "@/lib/typography";

/** Reuses the factual /guide flow steps so the homepage and guide stay consistent. */
export default function HowItWorks() {
  const { t, language } = useLanguage();
  const steps = guideFlow.steps;

  return (
    <section
      aria-labelledby="how-heading"
      data-track-section="how"
      className="bg-muted px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
    >
      <div className="max-w-[75rem] mx-auto">
        <SectionHeader
          id="how-heading"
          number={4}
          eyebrow={t("how.eyebrow")}
          title={t("howTo.title")}
        />

        <ol className="mt-10 grid grid-cols-1 lg:grid-cols-4 lg:gap-x-8">
          {steps.map(({ icon: Icon, title, description }, i) => (
            <li
              key={title.en}
              className="relative pl-12 pb-8 lg:pl-0 lg:pb-0 lg:pt-5 lg:border-t lg:border-foreground lg:pr-4"
            >
              {/* Mobile: vertical connector between step numbers */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="lg:hidden absolute left-[15px] top-11 bottom-0 w-px bg-primary/40"
                />
              )}
              <span className="absolute left-0 top-0 lg:static block font-display text-display-m font-semibold text-primary-strong tabular-nums">
                {padNumber(language, i + 1)}
              </span>
              <Icon className="lg:mt-4 h-6 w-6 text-primary" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-3 text-lg lg:text-xl font-semibold text-foreground">
                {title[language]}
              </h3>
              <p className="mt-1 text-base text-ink-2">{description[language]}</p>
            </li>
          ))}
        </ol>

        {/* OWNER-GATED: replace with the resolved advance rule + free-proof promise once owner decides (P1a). */}
        <p className="mt-8 text-base text-foreground border-l-2 border-primary pl-4 max-w-[60ch]">
          {t("howTo.step3.desc")}
        </p>
        <Link
          href="/guide"
          className="mt-4 inline-flex min-h-11 items-center gap-1 font-semibold text-primary-strong underline underline-offset-4"
        >
          {t("how.guideLink")}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
