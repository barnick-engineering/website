/**
 * Lightweight traffic-source attribution, kept alongside GA4's own.
 *
 * Why: GA's attribution is invisible to staff (orders close in Messenger/phone),
 * and visits from Facebook/Instagram in-app browsers often arrive with no
 * referrer, so GA files them under "Direct". Here we:
 *  - classify each landing from UTM tags → fbclid → referrer
 *  - keep the first-ever touch (localStorage) and this session's touch (sessionStorage)
 * The session touch is appended to Messenger messages and sent on lead events.
 */

export type Touch = {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  landing: string;
  at: string;
};

const FIRST_KEY = "barnick_first_touch";
const SESSION_KEY = "barnick_session_touch";

const REFERRER_SOURCES: [RegExp, string, string][] = [
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, "facebook", "social"],
  [/(^|\.)instagram\.com$/, "instagram", "social"],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, "linkedin", "social"],
  [/(^|\.)messenger\.com$/, "messenger", "social"],
  [/(^|\.)(whatsapp\.com|wa\.me)$/, "whatsapp", "social"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube", "social"],
  [/(^|\.)(x\.com|twitter\.com|t\.co)$/, "x", "social"],
  [/(^|\.)tiktok\.com$/, "tiktok", "social"],
  [/(^|\.)google\.[a-z.]+$/, "google", "organic"],
  [/(^|\.)bing\.com$/, "bing", "organic"],
  [/(^|\.)duckduckgo\.com$/, "duckduckgo", "organic"],
  [/(^|\.)yahoo\.com$/, "yahoo", "organic"],
];

function classifyReferrer(referrer: string): { source: string; medium: string } | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (host === window.location.hostname.replace(/^www\./, "")) return null;
    for (const [pattern, source, medium] of REFERRER_SOURCES) {
      if (pattern.test(host)) return { source, medium };
    }
    return { source: host, medium: "referral" };
  } catch {
    return null;
  }
}

/** Classify the current page load. Returns null for internal navigations. */
function classifyLanding(): Omit<Touch, "landing" | "at"> | null {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  if (utmSource) {
    return {
      source: utmSource.toLowerCase(),
      medium: (params.get("utm_medium") || "(none)").toLowerCase(),
      campaign: params.get("utm_campaign") || undefined,
      content: params.get("utm_content") || undefined,
    };
  }

  const fromReferrer = classifyReferrer(document.referrer);
  if (fromReferrer) return fromReferrer;

  // fbclid is only ever added by Meta (Facebook, Instagram, Messenger links).
  if (params.has("fbclid")) return { source: "meta", medium: "social" };
  if (params.has("gclid")) return { source: "google", medium: "cpc" };

  return null;
}

function read(storage: Storage, key: string): Touch | null {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as Touch) : null;
  } catch {
    return null;
  }
}

function write(storage: Storage, key: string, touch: Touch) {
  try {
    storage.setItem(key, JSON.stringify(touch));
  } catch {
    // storage unavailable (private mode etc.) — attribution is best-effort
  }
}

/**
 * Record this page load's source. Call once on app mount.
 * A new campaign/referrer mid-session replaces the session touch;
 * the first touch is never overwritten.
 */
export function captureAttribution(): { first: Touch; session: Touch; isNewTouch: boolean } {
  const landed = classifyLanding();
  const stored = read(sessionStorage, SESSION_KEY);
  const isNewTouch = Boolean(landed || !stored);

  let session: Touch;
  if (stored && !landed) {
    session = stored;
  } else {
    session = {
      ...(landed ?? { source: "direct", medium: "(none)" }),
      landing: window.location.pathname,
      at: new Date().toISOString(),
    };
    write(sessionStorage, SESSION_KEY, session);
  }

  let first = read(localStorage, FIRST_KEY);
  if (!first) {
    first = session;
    write(localStorage, FIRST_KEY, first);
  }

  return { first, session, isNewTouch };
}

export function getSessionTouch(): Touch | null {
  if (typeof window === "undefined") return null;
  try {
    return read(sessionStorage, SESSION_KEY);
  } catch {
    return null;
  }
}

export function getFirstTouch(): Touch | null {
  if (typeof window === "undefined") return null;
  try {
    return read(localStorage, FIRST_KEY);
  } catch {
    return null;
  }
}

/** Short human label, e.g. "instagram" or "facebook/eid_offer". */
export function touchLabel(touch: Touch | null): string | undefined {
  if (!touch || touch.source === "direct") return undefined;
  return touch.campaign ? `${touch.source}/${touch.campaign}` : touch.source;
}
