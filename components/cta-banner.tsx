"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";

export default function CTABanner() {
  const { t } = useLanguage();

  return (
    <div className="px-6" id="contact">
      <div className="my-16 w-full bg-foreground text-background max-w-screen-lg mx-auto rounded-2xl py-10 md:py-14 px-6 md:px-12">
        <h3 className="text-3xl md:text-4xl font-bold">{t("contact.title")}</h3>
        <p className="mt-3 text-base md:text-lg text-background/80">
          {t("contact.subtitle")}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            className="bg-background text-foreground hover:bg-background/90"
            asChild
          >
            <a
              href={facebookInsights.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="!h-5 !w-5" />
              {t("cta.messenger")}
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-background bg-transparent text-background hover:bg-background/15 hover:text-background"
            asChild
          >
            <a href={getPhoneUrl()}>
              <Phone className="!h-5 !w-5" />
              {t("cta.call")}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
