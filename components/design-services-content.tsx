"use client";

import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

export const DesignServicesContent = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight">
          {t("designServices.title")}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          {t("designServices.subtitle")}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <a href="tel:+8801712347097">
              <Phone className="h-5 w-5" /> {t("designServices.phone")}: +8801712347097
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <a
              href="https://m.me/heybarnick"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" /> {t("designServices.messenger")}
            </a>
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          {t("designServices.footerNote")}
        </p>
      </div>
    </div>
  );
};
