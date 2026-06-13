"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LogoCloud from "@/components/logo-cloud";
import { HeroProductionFlow } from "@/components/hero-production-flow";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <>
      <div className="py-10 sm:py-14 lg:py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <div className="text-left order-1">
            <Badge className="inline-flex items-center gap-1.5 bg-foreground text-background rounded-full py-1 px-3 border-none">
              {t("hero.badge")}
              <span className="text-sm leading-none" aria-hidden>🚀</span>
            </Badge>
            <h1 className="mt-4 sm:mt-6 text-3xl xs:text-4xl sm:text-5xl lg:text-[3.25rem] font-bold !leading-[1.15] tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-4 sm:mt-5 max-w-[50ch] text-muted-foreground xs:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
              <Button size="lg" className="w-full xs:w-auto" asChild>
                <a
                  href={facebookInsights.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="!h-5 !w-5" />
                  {t("hero.orderMessenger")}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full xs:w-auto border-foreground/30 text-foreground"
                asChild
              >
                <a href={getPhoneUrl()}>
                  <Phone className="!h-5 !w-5" />
                  {t("cta.call")}
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{t("hero.trustLine")}</p>
          </div>

          <div className="order-2 w-full">
            <HeroProductionFlow />
          </div>
        </div>
      </div>

      <LogoCloud showTitle />
    </>
  );
};

export default Hero;
