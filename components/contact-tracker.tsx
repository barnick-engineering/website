"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { getFirstTouch, getSessionTouch, touchLabel } from "@/lib/attribution";
import { getSessionRefCode, withMessengerRef } from "@/lib/order";

type ContactMethod = "messenger" | "phone" | "whatsapp";
type SocialNetwork = "facebook" | "instagram" | "linkedin" | "youtube" | "tiktok" | "x";

function contactMethod(href: string): ContactMethod | null {
  if (href.startsWith("tel:")) return "phone";
  if (/^https?:\/\/(m\.me|(www\.)?messenger\.com)\//.test(href)) return "messenger";
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp";
  return null;
}

function socialNetwork(href: string): SocialNetwork | null {
  let host: string;
  try {
    host = new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
  if (/(^|\.)facebook\.com$/.test(host)) return "facebook";
  if (/(^|\.)instagram\.com$/.test(host)) return "instagram";
  if (/(^|\.)linkedin\.com$/.test(host)) return "linkedin";
  if (/(^|\.)youtube\.com$/.test(host)) return "youtube";
  if (/(^|\.)tiktok\.com$/.test(host)) return "tiktok";
  if (/(^|\.)(x|twitter)\.com$/.test(host)) return "x";
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
 * One capture-phase listener for every Messenger / phone / WhatsApp / social link:
 * - contact links fire `contact_click` + `generate_lead` (method, source, ref_code,
 *   traffic source, and item/value when the link carries data-track-item/-value)
 * - Messenger links are rewritten to carry the session's reference code and
 *   traffic source, so staff can see both in the chat
 * - social profile links fire `social_click`
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
      if (!method) {
        const network = socialNetwork(originalHref);
        if (network) {
          trackEvent("social_click", {
            network,
            source: clickSource(anchor),
            page_path: window.location.pathname,
          });
        }
        return;
      }

      const source = clickSource(anchor);
      const refCode = getSessionRefCode();
      const language = document.documentElement.lang === "en" ? "en" : "bn";
      const sessionTouch = getSessionTouch();
      const trafficLabel = touchLabel(sessionTouch);

      if (method === "messenger") {
        const rewritten = withMessengerRef(originalHref, {
          refCode,
          source,
          language,
          trafficSource: trafficLabel,
        });
        anchor.dataset.origHref = originalHref;
        anchor.dataset.rewrittenHref = rewritten;
        anchor.setAttribute("href", rewritten);
      }

      // Optional context from the link itself (estimator, portfolio cards…).
      const tagged = anchor.closest<HTMLElement>("[data-track-item], [data-track-value]");
      const item = tagged?.dataset.trackItem;
      const value = Number(tagged?.dataset.trackValue);
      const hasValue = Number.isFinite(value) && value > 0;

      const params = {
        method,
        source,
        item,
        ref_code: refCode,
        traffic_source: sessionTouch?.source ?? "direct",
        traffic_campaign: sessionTouch?.campaign,
        first_source: getFirstTouch()?.source,
        page_path: window.location.pathname,
      };

      trackEvent("contact_click", params);
      // GA4 recommended event — mark this one as the key event (conversion).
      trackEvent("generate_lead", {
        ...params,
        ...(hasValue && { value, currency: "BDT" }),
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
