"use client";

import { MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ColorBar } from "@/components/ui/color-bar";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";
import { padNumber, sectionLabelClass } from "@/lib/typography";
import { cn } from "@/lib/utils";

export type Localized = { bn: string; en: string };

export type ContentSection = {
  id: string;
  title: Localized;
  intro?: Localized;
  bullets?: Localized[];
  /** Two-column "term → meaning" rows, e.g. paper weights */
  table?: { term: Localized; meaning: Localized }[];
  note?: Localized;
};

export type FlowStep = {
  icon: LucideIcon;
  title: Localized;
  description: Localized;
};

type ContentPageProps = {
  /** Optional static process strip shown under the header */
  flow?: { label: Localized; steps: FlowStep[] };
  eyebrow: Localized;
  title: Localized;
  subtitle: Localized;
  sections: ContentSection[];
  updated?: Localized;
  ctaText: Localized;
  ctaSource: string;
};

export function ContentPage({
  eyebrow,
  title,
  subtitle,
  sections,
  updated,
  ctaText,
  ctaSource,
  flow,
}: ContentPageProps) {
  const { t, language } = useLanguage();
  const l = (v: Localized) => v[language];

  return (
    <>
      <Navbar />
      <main id="main" className="pt-16 lg:pt-[72px]">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-[75rem] mx-auto">
            <header className="pt-12 lg:pt-20 max-w-[68ch]">
              <Eyebrow>{l(eyebrow)}</Eyebrow>
              <h1
                className={cn(
                  "mt-4 font-display text-display-l lg:text-[3rem] font-semibold",
                  language === "bn" && "tracking-normal",
                )}
              >
                {l(title)}
              </h1>
              <p className="mt-4 text-lead text-ink-2">{l(subtitle)}</p>
              {updated && <p className="mt-3 text-sm text-muted-foreground">{l(updated)}</p>}
              <ColorBar className="mt-8" />
            </header>

            {/* Mobile: horizontal chip row */}
            <nav
              aria-label={t("content.onThisPage")}
              className="lg:hidden mt-8 -mx-4 sm:-mx-6 px-4 sm:px-6 flex gap-2 overflow-x-auto scrollbar-hide"
            >
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="min-h-11 px-4 inline-flex items-center border border-input text-sm whitespace-nowrap hover:bg-foreground hover:text-background transition-colors duration-150"
                >
                  {l(s.title)}
                </a>
              ))}
            </nav>

            <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-12">
              {/* Desktop: sticky numbered TOC */}
              <nav
                aria-label={t("content.onThisPage")}
                className="hidden lg:block lg:col-span-3 lg:sticky lg:top-28 self-start"
              >
                <p className={cn(sectionLabelClass(language), "mb-3")}>{t("content.onThisPage")}</p>
                <ol className="border-t border-foreground">
                  {sections.map((s, i) => (
                    <li key={s.id} className="border-b border-border">
                      <a
                        href={`#${s.id}`}
                        className="flex min-h-11 items-baseline gap-3 py-2 text-base hover:text-primary-strong"
                      >
                        <span className="font-display text-sm font-semibold text-primary-strong tabular-nums">
                          {padNumber(language, i + 1)}
                        </span>
                        {l(s.title)}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="lg:col-span-8 min-w-0">
                {flow && (
                  <div className="mb-12">
                    <p className={cn(sectionLabelClass(language), "mb-3")}>{l(flow.label)}</p>
                    <ol className="grid grid-cols-1 sm:grid-cols-4 gap-px bg-border border border-border">
                      {flow.steps.map(({ icon: Icon, title, description }, i) => (
                        <li
                          key={title.en}
                          className="bg-card p-4 sm:p-5 border-t-2 border-foreground"
                        >
                          <div className="flex items-center gap-3 sm:flex-col sm:items-start">
                            <span className="font-display text-display-m font-semibold text-primary-strong tabular-nums">
                              {padNumber(language, i + 1)}
                            </span>
                            <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} aria-hidden />
                          </div>
                          <p className="mt-3 font-semibold">{l(title)}</p>
                          <p className="mt-1 text-sm text-ink-2">{l(description)}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="space-y-12">
                  {sections.map((s, i) => (
                    <section key={s.id} id={s.id} className="border-t border-foreground pt-8">
                      <h2
                        className={cn(
                          "flex items-baseline gap-3 font-display text-display-m font-semibold",
                          language === "bn" && "tracking-normal",
                        )}
                      >
                        <span className="text-primary-strong tabular-nums">
                          {padNumber(language, i + 1)}
                        </span>
                        {l(s.title)}
                      </h2>
                      {s.intro && (
                        <p className="mt-3 text-base text-ink-2 max-w-[68ch]">{l(s.intro)}</p>
                      )}
                      {s.bullets && (
                        <ul className="mt-4 space-y-3 max-w-[68ch]">
                          {s.bullets.map((b, j) => (
                            <li key={j} className="flex gap-3 text-base">
                              <span
                                aria-hidden
                                className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-primary"
                              />
                              <span>{l(b)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {s.table && (
                        <dl className="mt-4 divide-y divide-border border border-border bg-card">
                          {s.table.map((row, j) => (
                            <div
                              key={j}
                              className="grid sm:grid-cols-[minmax(0,12rem)_1fr] gap-1 sm:gap-4 px-4 py-3"
                            >
                              <dt className="font-semibold">{l(row.term)}</dt>
                              <dd className="text-ink-2">{l(row.meaning)}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      {s.note && (
                        <p className="mt-4 border-l-2 border-primary bg-accent px-4 py-3 text-base max-w-[68ch]">
                          {l(s.note)}
                        </p>
                      )}
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 mt-16 mb-16" data-track-source={ctaSource}>
          <div className="max-w-[75rem] mx-auto bg-primary text-foreground px-6 py-10 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <p
              className={cn(
                "font-display text-display-m font-semibold max-w-[32ch]",
                language === "bn" && "tracking-normal",
              )}
            >
              {l(ctaText)}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button variant="ink" size="lg" asChild>
                <a
                  href={facebookInsights.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-item={`${ctaSource}_messenger`}
                >
                  <MessageCircle aria-hidden />
                  {t("content.chat")}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={getPhoneUrl()} data-track-item={`${ctaSource}_call`}>
                  <Phone aria-hidden />
                  {t("cta.call")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
