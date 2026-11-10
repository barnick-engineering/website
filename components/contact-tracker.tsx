"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { getSessionRefCode, withMessengerRef } from "@/lib/order";

type ContactMethod = "messenger" | "phone" | "whatsapp";

function contactMethod(href: string): ContactMethod | null {
  if (href.startsWith("tel:")) return "phone";
  if (/^https?:\/\/(m\.me|(www\.)?messenger\.com)\//.test(href)) return "messenger";
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp";
  return null;
}

/**
 * Where on the site the click came from:
 * explicit `data-track-source` → nearest section id → footer/nav → page.
 */
function clickSource(anchor: HTMLAnchorElement): string {
  const explicit = anchor.closest<HTMLElement>("[data-track-source]");
  if (explicit?.dataset.trackSource) return explicit.dataset.trackSource;

  let el: HTMLElement | null = anchor.parentElement;
  while (el) {
    if (el.id && !el.id.startsWith("radix")) return el.id;
    if (el.tagName === "FOOTER") return "footer";
    el = el.parentElement;
  }
  const path = window.location.pathname.replace(/^\/|\/$/g, "");
  return path || "home";
}

/**
 * One capture-phase listener for every Messenger / phone / WhatsApp link:
 * - fires a GA4 `contact_click` event (method, source, ref_code)
 * - rewrites Messenger links to carry the session's order reference code
 *
 * Runs before the browser follows the link, so the rewritten href is the one opened.
 */
export function ContactTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      // If we rewrote this link earlier and React hasn't changed it since, use the
      // pre-rewrite href; otherwise (first click, or the estimator re-rendered a
      // new message) the current href is the original.
      const currentHref = anchor.getAttribute("href") ?? "";
      const originalHref =
        anchor.dataset.rewrittenHref === currentHref && anchor.dataset.origHref
          ? anchor.dataset.origHref
          : currentHref;
      const method = contactMethod(originalHref);
      if (!method) return;

      const source = clickSource(anchor);
      const refCode = getSessionRefCode();
      const language = document.documentElement.lang === "en" ? "en" : "bn";

      if (method === "messenger") {
        const rewritten = withMessengerRef(originalHref, { refCode, source, language });
        anchor.dataset.origHref = originalHref;
        anchor.dataset.rewrittenHref = rewritten;
        anchor.setAttribute("href", rewritten);
      }

      trackEvent("contact_click", {
        method,
        source,
        ref_code: refCode,
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
