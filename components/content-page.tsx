"use client";

import Link from "next/link";
import { MessageCircle, type LucideIcon } from "lucide-react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { headingClass, sectionLabelClass } from "@/lib/typography";
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
  const { language } = useLanguage();
  const l = (v: Localized) => v[language];

  return (
    <>
      <Navbar />
      <main className="pt-28 sm:pt-32 pb-20 md:pb-0">
        <header className="px-4 xs:px-6 max-w-screen-md mx-auto">
          <p className="text-sm font-medium text-primary">{l(eyebrow)}</p>
          <h1
            className={cn(
              "mt-2 text-3xl sm:text-4xl font-bold !leading-tight",
              headingClass(language)
            )}
          >
            {l(title)}
          </h1>
          <p className="mt-4 text-muted-foreground sm:text-lg">{l(subtitle)}</p>
          {updated && <p className="mt-3 text-xs text-muted-foreground">{l(updated)}</p>}

          <nav
            aria-label={language === "bn" ? "এই পাতায়" : "On this page"}
            className="mt-8 flex flex-wrap gap-2"
          >
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="text-sm border border-foreground/20 px-3 py-1.5 hover:bg-foreground hover:text-background transition-colors"
              >
                {l(s.title)}
              </Link>
            ))}
          </nav>
        </header>

        {flow && (
          <div className="mt-10 px-4 xs:px-6 max-w-screen-md mx-auto">
            <p className={cn(sectionLabelClass(language), "mb-3")}>{l(flow.label)}</p>
            <ol className="grid grid-cols-1 sm:grid-cols-4 border bg-background divide-y sm:divide-y-0 sm:divide-x divide-border">
              {flow.steps.map(({ icon: Icon, title, description }, i) => (
                <li
                  key={title.en}
                  className="relative flex items-start gap-4 px-4 py-3.5 sm:block sm:p-5"
                >
                  <div className="flex shrink-0 flex-col items-center gap-1.5 sm:items-start sm:gap-3">
                    <p className={sectionLabelClass(language)}>
                      {language === "bn"
                        ? `০${["১", "২", "৩", "৪", "৫", "৬"][i]}`
                        : String(i + 1).padStart(2, "0")}
                    </p>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="min-w-0 sm:mt-3">
                    <p className="font-semibold leading-snug">{l(title)}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {l(description)}
                    </p>
                  </div>
                  {i < flow.steps.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden sm:flex absolute top-1/2 -right-[9px] -translate-y-1/2 z-10 h-4 w-4 rotate-45 border-t border-r border-border bg-background"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-10 px-4 xs:px-6 max-w-screen-md mx-auto space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-[7.5rem] border-t pt-8">
              <h2 className={cn("text-xl sm:text-2xl font-bold", headingClass(language))}>
                {l(s.title)}
              </h2>
              {s.intro && <p className="mt-3 text-muted-foreground">{l(s.intro)}</p>}
              {s.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-primary" />
                      <span>{l(b)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.table && (
                <dl className="mt-4 divide-y border">
                  {s.table.map((row, i) => (
                    <div key={i} className="grid sm:grid-cols-[minmax(0,12rem)_1fr] gap-1 sm:gap-4 px-4 py-3">
                      <dt className="font-semibold">{l(row.term)}</dt>
                      <dd className="text-muted-foreground">{l(row.meaning)}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {s.note && (
                <p className="mt-4 border-l-2 border-primary bg-primary/10 px-4 py-3 text-sm">
                  {l(s.note)}
                </p>
              )}
            </section>
          ))}
        </div>

        <div className="px-4 xs:px-6" data-track-source={ctaSource}>
          <div className="mt-16 max-w-screen-md mx-auto bg-foreground text-background px-6 py-8 sm:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-lg font-semibold">{l(ctaText)}</p>
            <Button className="shrink-0" asChild>
              <a href={facebookInsights.messengerUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="!h-4 !w-4" />
                {language === "bn" ? "মেসেঞ্জারে কথা বলুন" : "Chat on Messenger"}
              </a>
            </Button>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
