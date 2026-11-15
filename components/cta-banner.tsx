"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Eyebrow } from "./ui/eyebrow";
import { RegMark } from "./ui/reg-mark";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";
import { cn } from "@/lib/utils";

/** Orange band: everything is ink on orange (4.71:1); focus ring stays ink. */
export default function CTABanner() {
  const { t, language } = useLanguage();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-primary text-foreground px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
    >
      <div className="max-w-[75rem] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="onOrange" leading={<RegMark className="text-foreground" />}>
              {t("contact.eyebrow")}
            </Eyebrow>
            <h2
              id="contact-heading"
              className={cn(
                "mt-4 font-display text-display-xl lg:text-[3.25rem] font-semibold",
                language === "bn" && "tracking-normal"
              )}
            >
              {t("contact.headline")}
            </h2>
            <p className="mt-4 text-lead max-w-[48ch]">{t("contact.subtitle")}</p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3">
            <Button variant="ink" size="lg" className="w-full" asChild>
              <a
                href={facebookInsights.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track-item="contact_messenger"
              >
                <MessageCircle aria-hidden />
                {t("cta.messenger")}
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-full" asChild>
              <a href={getPhoneUrl()} data-track-item="contact_call">
                <Phone aria-hidden />
                {t("cta.call")} · <span className="tabular-nums">{facebookInsights.phone}</span>
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-foreground/40 grid gap-6 text-base">
          <div>
            <p className="font-semibold">{t("footer.address")}</p>
            <address className="not-italic">{t("footer.addressValue")}</address>
          </div>
        </div>
        {/* OWNER-GATED: WhatsApp, email, bKash/Nagad merchant number or QR, business hours, map. */}
      </div>
    </section>
  );
}
