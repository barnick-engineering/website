"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LogoCloud from "@/components/logo-cloud";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center py-16 sm:py-20 px-6 bg-background">
      <div className="flex items-center justify-center w-full">
        <div className="text-center max-w-3xl">
          <Badge className="bg-foreground text-background rounded-full py-1 border-none">
            {t("hero.badge")}
          </Badge>
          <h1 className="mt-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.15] tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-[50ch] mx-auto text-muted-foreground xs:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a
                href={facebookInsights.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="!h-5 !w-5" />
                {t("hero.orderMessenger")}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-foreground/30 text-foreground" asChild>
              <a href={getPhoneUrl()}>
                <Phone className="!h-5 !w-5" />
                {t("cta.call")}
              </a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {t("hero.trustLine")}
          </p>
        </div>
      </div>
      <LogoCloud className="mt-16 max-w-3xl mx-auto" showTitle />
    </div>
  );
};

export default Hero;
