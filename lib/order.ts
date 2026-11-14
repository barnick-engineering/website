import { facebookInsights } from "@/data/insights";

export function getMessengerOrderUrl(productName: string): string {
  const text = encodeURIComponent(`Hi Barnick! I want to order: ${productName}`);
  return `${facebookInsights.messengerUrl}?text=${text}`;
}

export function getMessengerUrlWithText(message: string): string {
  return `${facebookInsights.messengerUrl}?text=${encodeURIComponent(message)}`;
}

export function getPhoneUrl(): string {
  return `tel:${facebookInsights.phone}`;
}

export function getFacebookPageUrl(): string {
  return facebookInsights.pageUrl;
}

/* ------------------------------------------------------------------ */
/* Order reference codes                                               */
/* ------------------------------------------------------------------ */

// No 0/O/1/I/L — easy to read aloud over the phone or type back in chat.
const REF_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const REF_STORAGE_KEY = "barnick_ref_code";

function randomRefCode(): string {
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += REF_ALPHABET[Math.floor(Math.random() * REF_ALPHABET.length)];
  }
  return `BR-${code}`;
}

/**
 * One reference code per browser session, so every chat/call a visitor starts
 * carries the same code — staff see it in Messenger, GA sees it on the event.
 */
export function getSessionRefCode(): string {
  try {
    const existing = sessionStorage.getItem(REF_STORAGE_KEY);
    if (existing) return existing;
    const code = randomRefCode();
    sessionStorage.setItem(REF_STORAGE_KEY, code);
    return code;
  } catch {
    return randomRefCode();
  }
}

const DEFAULT_GREETING = {
  bn: "হ্যালো বর্ণিক! আমি অর্ডার করতে চাই।",
  en: "Hi Barnick! I'd like to place an order.",
} as const;

/**
 * Adds the reference code + source to a Messenger link:
 * - appends "Ref: BR-XXXXX · source · via instagram" to the prefilled text
 *   (staff can see where the customer clicked and how they found the site)
 * - sets m.me `ref=` (delivered to the Page's messaging_referrals webhook)
 */
export function withMessengerRef(
  href: string,
  opts: { refCode: string; source: string; language: "bn" | "en"; trafficSource?: string }
): string {
  try {
    const url = new URL(href);
    const base = url.searchParams.get("text") || DEFAULT_GREETING[opts.language];
    const via = opts.trafficSource ? ` · via ${opts.trafficSource}` : "";
    const text = `${base}\n\nRef: ${opts.refCode} · ${opts.source}${via}`;
    const ref = [opts.source, opts.refCode, opts.trafficSource]
      .filter(Boolean)
      .join("_")
      .replace(/[^A-Za-z0-9_=-]/g, "-") // m.me ref only allows these characters
      .slice(0, 250);
    // Build the query by hand: URLSearchParams encodes spaces as "+", which
    // Messenger may show literally. encodeURIComponent uses %20.
    return `${url.origin}${url.pathname}?text=${encodeURIComponent(text)}&ref=${encodeURIComponent(ref)}`;
  } catch {
    return href;
  }
}
