import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    const immutable = "public, max-age=31536000, immutable";
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
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
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
