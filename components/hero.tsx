"use client";

import { ArrowDown, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorBar } from "@/components/ui/color-bar";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroFlowDesktop } from "@/components/hero-flow-desktop";
import { HeroWorkSamples } from "@/components/hero-work-samples";
import { OpenStatus } from "@/components/open-status";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";
import { cn } from "@/lib/utils";

const Hero = () => {
  const { t, language } = useLanguage();

  const [delivery, courier] = t("hero.trustLine").split(" · ");

  return (
    <section id="hero" data-track-source="hero" className="relative bg-background">
      <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:py-24">
        <div className="max-w-[75rem] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 min-w-0">
              <Eyebrow
                leading={<Sparkles aria-hidden className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />}
              >
                {t("hero.eyebrow")}
              </Eyebrow>

              {/* LCP element: text only, no motion */}
              <h1
                className={cn(
                  "mt-5 font-display text-display-xl font-semibold text-foreground [text-wrap:balance]",
                  language === "bn" ? "max-w-[18ch] tracking-normal" : "max-w-[14ch]",
                )}
              >
                <span>{t("hero.titleLead")}</span>
                <br className="hidden sm:block" />{" "}
                <span className="text-primary">{t("hero.titleAccent")}</span>
              </h1>

              <p className="mt-4 text-lead text-ink-2 max-w-[48ch]">{t("hero.subtitle")}</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="w-full sm:w-auto sm:px-7" asChild>
                  <a
                    href={facebookInsights.messengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-item="hero_messenger"
                  >
                    <MessageCircle aria-hidden />
                    {t("hero.orderMessenger")}
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto sm:px-7" asChild>
                  <a href="#estimate" data-track-item="hero_estimate">
                    {t("hero.seePrices")}
                    <ArrowDown aria-hidden />
                  </a>
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-ink-2">
                <span>{t("hero.orCall")}</span>
                <a
                  href={getPhoneUrl()}
                  data-track-item="hero_call"
                  className="font-semibold text-foreground underline underline-offset-4 decoration-primary decoration-2 min-h-11 inline-flex items-center tabular-nums"
                >
                  {facebookInsights.phone}
                </a>
                <OpenStatus />
              </div>

              {/* Mobile only: real work photos under the CTAs */}
              <div className="mt-8 lg:hidden">
                <HeroWorkSamples />
              </div>

              <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                {[t("trust.since"), delivery, courier].filter(Boolean).map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span aria-hidden className="h-1 w-1 bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:block lg:col-span-6 min-w-0">
              <HeroFlowDesktop />
            </div>
          </div>
        </div>
      </div>
      <ColorBar />
    </section>
  );
};

export default Hero;
