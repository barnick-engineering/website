import type { MetadataRoute } from "next";

const siteUrl = "https://barnickpracharani.com";

// /shop, /product/* and /category/* currently redirect to "/", so they are
// intentionally left out. Add them here once they render real pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/guide`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/policies`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];
}
