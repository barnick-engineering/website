import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    const immutable = "public, max-age=31536000, immutable";
    // Dev mode: Next.js Fast Refresh needs 'unsafe-eval' for HMR.
    // Production: omit it — built bundles never eval.
    const scriptSrc = isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com"
      : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com";

    return [
      { source: "/clients/:path*",     headers: [{ key: "Cache-Control", value: immutable }] },
      { source: "/testimonials/:path*",headers: [{ key: "Cache-Control", value: immutable }] },
      { source: "/barnick.png",        headers: [{ key: "Cache-Control", value: immutable }] },
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options",   value: "DENY" },
          { key: "Referrer-Policy",   value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              scriptSrc,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self'",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
