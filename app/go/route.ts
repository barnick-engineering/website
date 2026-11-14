import { NextResponse, type NextRequest } from "next/server";

/**
 * Flexible tagged link: /go?source=facebook[&campaign=eid_offer][&medium=…][&content=…][&to=/guide]
 * Redirects to the site with matching utm_* tags so GA attributes the visit.
 * Fixed shortcuts (/go/fb, /go/ig, …) live in next.config.ts → redirects().
 */

const SOCIAL = new Set([
  "facebook", "instagram", "linkedin", "whatsapp", "messenger",
  "youtube", "tiktok", "x", "twitter", "threads", "pinterest",
]);

/** Lowercase, spaces → "_", only [a-z0-9_-]. */
function clean(value: string | null): string | null {
  if (!value) return null;
  const v = value.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_-]/g, "");
  return v ? v.slice(0, 100) : null;
}

function defaultMedium(source: string): string {
  if (SOCIAL.has(source)) return "social";
  if (source === "print" || source === "qr") return "qr";
  if (source === "google" || source === "bing") return "organic";
  if (source === "email" || source === "newsletter") return "email";
  return "referral";
}

/** Only same-site paths, so this can't be abused as an open redirect. */
function safePath(to: string | null): string {
  if (!to || !to.startsWith("/") || to.startsWith("//") || to.includes("\\")) return "/";
  return to;
}

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const target = new URL(safePath(params.get("to")), request.nextUrl.origin);

  const source = clean(params.get("source"));
  if (source) {
    target.searchParams.set("utm_source", source);
    target.searchParams.set("utm_medium", clean(params.get("medium")) ?? defaultMedium(source));
    const campaign = clean(params.get("campaign"));
    const content = clean(params.get("content"));
    if (campaign) target.searchParams.set("utm_campaign", campaign);
    if (content) target.searchParams.set("utm_content", content);
  }

  return NextResponse.redirect(target, 307);
}
