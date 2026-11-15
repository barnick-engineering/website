"use client";

import Link from "next/link";
import { MessageCircle, Plus } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";

const FAQ = () => {
  const { t } = useLanguage();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-background"
    >
      <div className="max-w-[75rem] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
          <SectionHeader id="faq-heading" number={6} eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
          <p className="mt-6 text-base text-ink-2">{t("faq.more")}</p>
          <div className="mt-4 flex flex-col items-start gap-2">
            <Button variant="ink" size="lg" asChild>
              <a
                href={facebookInsights.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track-item="faq_messenger"
              >
                <MessageCircle aria-hidden />
                {t("cta.messenger")}
              </a>
            </Button>
            <Link
              href="/policies"
              className="inline-flex min-h-11 items-center text-base font-semibold text-primary-strong underline underline-offset-4"
            >
              {t("faq.policiesLink")}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <details
              key={n}
              open={n === 1}
              className="group border-t border-foreground last:border-b"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base lg:text-lg font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                <span>{t(`faq.${n}.q`)}</span>
                <Plus
                  className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden
                />
              </summary>
              <p className="pb-5 text-base text-ink-2 max-w-[60ch]">{t(`faq.${n}.a`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
