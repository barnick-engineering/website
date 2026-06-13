"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";
import { cn } from "@/lib/utils";

export function StickyContactBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const update = () => {
      const { bottom } = hero.getBoundingClientRect();
      setVisible(bottom <= 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 md:hidden border-t bg-background/95 backdrop-blur-sm px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      )}
      aria-hidden={!visible}
    >
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
