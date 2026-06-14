"use client";

import { MessageCircle, Phone, Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LogoCloud from "@/components/logo-cloud";
import { HeroProductionFlow } from "@/components/hero-production-flow";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";
import { headingClass } from "@/lib/typography";
import { cn } from "@/lib/utils";

const Hero = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <section id="hero" className="overflow-x-hidden">
        <div className="py-8 sm:py-14 lg:py-16 px-4 xs:px-6 bg-background">
          <div className="max-w-screen-xl mx-auto w-full grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start lg:items-center min-w-0">
          <div className="text-left order-1 min-w-0">
            <Badge className="inline-flex items-center gap-1.5 bg-foreground text-background rounded-full py-1 px-3 border-none">
              {t("hero.badge")}
              <span className="text-sm leading-none" aria-hidden>🚀</span>
            </Badge>
            <h1
              className={cn(
                "mt-4 sm:mt-6 text-2xl xs:text-3xl sm:text-4xl lg:text-[3.25rem] font-bold !leading-[1.25] sm:!leading-[1.15]",
                headingClass(language),
                language === "bn" ? "break-normal" : "break-words"
              )}
            >
              {t("hero.title")}
            </h1>
            <p className="mt-4 sm:mt-5 max-w-[50ch] text-muted-foreground xs:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 min-w-0 max-w-full">
              <Button
                size="default"
                className="w-full sm:flex-1 sm:min-w-0 h-10 px-4 text-xs sm:text-sm sm:h-11 sm:px-5 md:h-12 md:text-base md:px-6"
                asChild
              >
                <a
                  href={facebookInsights.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="!h-4 !w-4 sm:!h-[1.125rem] sm:!w-[1.125rem] shrink-0" />
                  {t("hero.orderMessenger")}
                </a>
              </Button>
              <Button
                size="default"
                variant="outline"
                className="w-full sm:flex-1 sm:min-w-0 h-10 px-4 text-xs sm:text-sm sm:h-11 sm:px-5 md:h-12 md:text-base md:px-6 border-foreground/30 text-foreground"
                asChild
              >
                <a href={getPhoneUrl()}>
                  <Phone className="!h-4 !w-4 sm:!h-[1.125rem] sm:!w-[1.125rem] shrink-0" />
                  {t("cta.call")}
                </a>
              </Button>
              <Button
                size="default"
                variant="outline"
                className="w-full sm:flex-1 sm:min-w-0 h-10 px-4 text-xs sm:text-sm sm:h-11 sm:px-5 md:h-12 md:text-base md:px-6 border-foreground/30 text-foreground"
                asChild
              >
                <a href="#estimate">
                  <Calculator className="!h-4 !w-4 sm:!h-[1.125rem] sm:!w-[1.125rem] shrink-0" />
                  {t("nav.estimate")}
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{t("hero.trustLine")}</p>
          </div>

          <div className="order-2 w-full min-w-0">
            <HeroProductionFlow />
          </div>
          </div>
        </div>
      </section>

      <LogoCloud showTitle />
    </>
  );
};

export default Hero;
