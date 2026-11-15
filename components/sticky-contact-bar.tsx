"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";
import { cn } from "@/lib/utils";

export function StickyContactBar() {
  const { t } = useLanguage();
  const [pastHero, setPastHero] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  // Shown once the hero has scrolled away
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const update = () => {
      const { bottom } = hero.getBoundingClientRect();
      setPastHero(bottom <= 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Hidden while #contact (which has the same two buttons) is on screen.
  // #contact is dynamically imported, so wait for it to mount.
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;

    const attach = (el: Element) => {
      io = new IntersectionObserver(
        ([entry]) => setContactInView(entry.isIntersecting),
        { threshold: 0.25 }
      );
      io.observe(el);
    };

    const existing = document.getElementById("contact");
    if (existing) {
      attach(existing);
    } else {
      mo = new MutationObserver(() => {
        const el = document.getElementById("contact");
        if (el) {
          mo?.disconnect();
          mo = null;
          attach(el);
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      io?.disconnect();
      mo?.disconnect();
    };
  }, []);

  const visible = pastHero && !contactInView;

  return (
    <nav
      aria-label={t("sticky.label")}
      aria-hidden={!visible || undefined}
      data-track-source="sticky_bar"
      className={cn(
        "md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-foreground bg-background/95 backdrop-blur-sm px-4 pt-3 pb-[max(.75rem,env(safe-area-inset-bottom))]",
        "transition-[transform,opacity] [transition-duration:240ms] ease-press motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="flex gap-3">
        <a
          href={facebookInsights.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track-item="sticky_messenger"
          tabIndex={visible ? undefined : -1}
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors duration-150"
        >
          <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
          {t("cta.messenger")}
        </a>
        <a
          href={getPhoneUrl()}
          data-track-item="sticky_call"
          tabIndex={visible ? undefined : -1}
          aria-label={`${t("cta.call")} ${facebookInsights.phone}`}
          className="inline-flex items-center justify-center gap-2 h-12 px-5 border border-foreground text-foreground font-semibold hover:bg-foreground hover:text-background transition-colors duration-150"
        >
          <Phone className="h-[18px] w-[18px]" aria-hidden />
          {t("cta.call")}
        </a>
        {/* OWNER-GATED: WhatsApp (wa.me) button slot — render only when owner supplies number and staffs inbox. Keep same ref logic via ContactTracker. */}
      </div>
    </nav>
  );
}
