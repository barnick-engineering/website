export const GA_MEASUREMENT_ID = "G-M37QBL6ZZN";

type GtagValue = string | number | boolean | undefined;
export type GtagParams = Record<string, GtagValue>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const isDev = process.env.NODE_ENV === "development";

/**
 * Call gtag, or queue the call on dataLayer if gtag.js hasn't loaded yet.
 * gtag() pushes its `arguments` object (not an array); mimic that shape so GA accepts it.
 */
function gtagCall(...args: unknown[]) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function queue(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  queue(...args);
}

/** Drop undefined values so GA doesn't record "(not set)" noise. */
function clean(params: GtagParams): GtagParams {
  const out: GtagParams = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") out[k] = v;
  }
  return out;
}

/**
 * Send a GA4 event. Safe to call before gtag has loaded: events are queued on
 * dataLayer and flushed once the tag script runs.
 *
 * The full list of events and their parameters lives in docs/ANALYTICS.md.
 */
export function trackEvent(eventName: string, params: GtagParams = {}) {
  const payload = clean(params);
  if (isDev) console.debug("[analytics]", eventName, payload);
  gtagCall("event", eventName, payload);
}

/** Set GA4 user properties (must also be registered as user-scoped custom dimensions). */
export function setUserProperties(props: GtagParams) {
  const payload = clean(props);
  if (isDev) console.debug("[analytics] user_properties", payload);
  gtagCall("set", "user_properties", payload);
}
