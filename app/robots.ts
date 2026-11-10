import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://barnickpracharani.com/sitemap.xml",
    host: "https://barnickpracharani.com",
  };
}
