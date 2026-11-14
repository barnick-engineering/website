"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { setUserProperties, trackEvent } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";
import { useLanguage } from "@/contexts/language-context";

const SCROLL_MARKS = [25, 50, 75, 100] as const;
/** How long a section must sit in the middle of the screen to count as seen. */
const SECTION_DWELL_MS = 1000;

/**
 * Site-wide behavioural tracking (see docs/ANALYTICS.md):
 * - traffic-source capture → user properties
 * - preferred language → user property
 * - scroll depth per page (25/50/75/100%)
 * - section_view when a page section is actually looked at
 * - Core Web Vitals from real visitors
 * Click tracking (contact + social) lives in ContactTracker.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const { language } = useLanguage();

  // Traffic source — once per page load.
  useEffect(() => {
    try {
      const { first, session, isNewTouch } = captureAttribution();
      setUserProperties({
        first_source: first.source,
        first_medium: first.medium,
        first_campaign: first.campaign,
      });
      if (isNewTouch) trackEvent("traffic_source", {
        source: session.source,
        medium: session.medium,
        campaign: session.campaign,
        landing_page: session.landing,
      });
    } catch {
      // storage blocked — GA's own attribution still applies
    }
  }, []);

  useEffect(() => {
    setUserProperties({ preferred_language: language });
  }, [language]);

  // Scroll depth — resets on each route.
  useEffect(() => {
    const fired = new Set<number>();
    let ticking = false;

    const check = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = ((window.scrollY + 1) / scrollable) * 100;
      for (const mark of SCROLL_MARKS) {
        if (percent >= mark && !fired.has(mark)) {
          fired.add(mark);
          trackEvent("scroll_depth", { percent: mark, page_path: pathname });
        }
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Section views — a section counts once it holds the middle band of the
  // screen for SECTION_DWELL_MS. Below-fold sections are dynamically imported,
  // so a MutationObserver picks them up as they mount.
  useEffect(() => {
    const seen = new Set<string>();
    const timers = new Map<Element, number>();
    const observed = new WeakSet<Element>();

    const nameOf = (el: Element) =>
      (el as HTMLElement).dataset.trackSection || el.id || el.tagName.toLowerCase();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = nameOf(entry.target);
          if (entry.isIntersecting && !seen.has(name)) {
            const timer = window.setTimeout(() => {
              seen.add(name);
              io.unobserve(entry.target);
              trackEvent("section_view", { section: name, page_path: pathname });
            }, SECTION_DWELL_MS);
            timers.set(entry.target, timer);
          } else if (!entry.isIntersecting) {
            window.clearTimeout(timers.get(entry.target));
            timers.delete(entry.target);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    const scan = () => {
      document
        .querySelectorAll("main section[id], main > div[id], [data-track-section], footer")
        .forEach((el) => {
          if (observed.has(el)) return;
          observed.add(el);
          io.observe(el);
        });
    };

    scan();
    let pending = 0;
    const mo = new MutationObserver(() => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(pending);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  useReportWebVitals((metric) => {
    if (metric.name === "FID") return; // deprecated, replaced by INP
    trackEvent("web_vitals", {
      metric_name: metric.name,
      // CLS is a unitless score; scale it so GA (which rounds) keeps precision.
      metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_rating: metric.rating,
      metric_id: metric.id,
      page_path: window.location.pathname,
      non_interaction: true,
    });
  });

  return null;
}
