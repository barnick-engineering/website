"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";

export function StickyContactBar() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t bg-background/95 backdrop-blur-sm px-4 py-3 safe-area-pb">
      <div className="flex gap-3 max-w-screen-xl mx-auto">
        <a
          href={facebookInsights.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-full bg-foreground text-background text-sm font-medium"
        >
          <MessageCircle className="h-4 w-4" />
          {t("cta.messenger")}
        </a>
        <a
          href={getPhoneUrl()}
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border border-foreground/25 text-foreground text-sm font-medium hover:bg-muted"
        >
          <Phone className="h-4 w-4" />
          {t("cta.call")}
        </a>
      </div>
    </div>
  );
}
