"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** Reports 404s with the broken path and where the visitor came from. */
export function NotFoundTracker() {
  useEffect(() => {
    trackEvent("page_not_found", {
      page_path: window.location.pathname + window.location.search,
      referrer: document.referrer || "(direct)",
    });
  }, []);
  return null;
}
