"use client";

import { MessageCircle, PenTool, Package, IdCard, Megaphone } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { getMessengerUrlWithText } from "@/lib/order";
import { padNumber } from "@/lib/typography";

const SERVICE_ICONS = [PenTool, IdCard, Package, Megaphone];

export default function DesignService() {
  const { t, language } = useLanguage();

  return (
    <section
      id="design"
      aria-labelledby="design-heading"
      data-surface="ink"
      className="bg-surface-ink text-on-ink px-4 sm:px-6 lg:px-8 py-16 lg:py-28"
    >
      <div className="max-w-[75rem] mx-auto">
        <SectionHeader
          id="design-heading"
          number={5}
          tone="onInk"
          eyebrow={t("design.eyebrow")}
          title={t("design.title")}
          lead={t("design.subtitle")}
        />

        <div className="mt-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <ul className="lg:col-span-6 grid grid-cols-1 xs:grid-cols-2 gap-px bg-on-ink/15 border border-on-ink/15">
            {SERVICE_ICONS.map((Icon, i) => (
              <li key={i} className="bg-surface-ink p-5 flex items-start gap-3">
                <Icon className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.75} aria-hidden />
                <span className="text-base">{t(`design.service.${i + 1}`)}</span>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-6">
            <ol className="border-t border-on-ink/15">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="flex items-center gap-5 py-5 border-b border-on-ink/15">
                  <span className="h-11 w-11 shrink-0 flex items-center justify-center bg-primary text-primary-foreground font-display text-lg font-semibold">
                    {padNumber(language, n).replace(/^[0০]/, "")}
                  </span>
                  <span className="text-base">{t(`design.step.${n}`)}</span>
                </li>
              ))}
            </ol>

            <p className="mt-5 text-sm text-on-ink-muted">{t("design.note")}</p>

            <Button size="lg" className="mt-6 w-full sm:w-auto whitespace-normal h-auto min-h-12 py-3" asChild>
              <a
                href={getMessengerUrlWithText(t("design.messengerText"))}
                target="_blank"
                rel="noopener noreferrer"
                data-track-item="design_messenger"
              >
                <MessageCircle aria-hidden />
                {t("design.cta")}
              </a>
            </Button>
            {/* OWNER-GATED: fixed-price design packages; "Canva link accepted" line. */}
          </div>
        </div>
      </div>
    </section>
  );
}
