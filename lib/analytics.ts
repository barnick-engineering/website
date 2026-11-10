type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: GtagParams) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Send a GA4 event. Safe to call before gtag has loaded (GA uses lazyOnload):
 * events are queued on dataLayer and flushed once the tag script runs.
 */
export function trackEvent(eventName: string, params: GtagParams = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  // gtag() pushes its `arguments` object (not an array); mimic that shape so GA accepts it.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function queue(_command: string, _name: string, _params: GtagParams) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  queue("event", eventName, params);
}
