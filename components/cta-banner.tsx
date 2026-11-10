"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";
import { headingClass } from "@/lib/typography";
import { cn } from "@/lib/utils";

export default function CTABanner() {
  const { t, language } = useLanguage();

  return (
    <section className="scroll-mt-[7.5rem] px-4 xs:px-6" id="contact">
      <div className="mt-16 mb-4 max-w-screen-lg mx-auto border-t border-foreground/80 pt-10 md:pt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="max-w-xl">
          <h2
            className={cn(
              "font-display text-3xl md:text-5xl font-semibold !leading-tight",
              headingClass(language)
            )}
          >
            {t("contact.title")}
          </h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Button size="lg" asChild>
            <a
              href={facebookInsights.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="!h-5 !w-5" />
              {t("cta.messenger")}
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={getPhoneUrl()}>
              <Phone className="!h-5 !w-5" />
              {t("cta.call")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
