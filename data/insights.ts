/**
 * Facebook Page insights for @heybarnick — update with real Meta Business Suite data.
 */
export const facebookInsights = {
  pageUrl: "https://www.facebook.com/heybarnick",
  messengerUrl: "https://m.me/heybarnick",
  phone: "+8801712347097",
  foundedYear: 1989,
  followers: 12500,
  monthlyReach: 45000,
  trustedClients: 100,
  turnaroundDays: "1–3",
  /**
   * Shop hours in Dhaka time (matches the JSON-LD openingHours "Sa-Th 09:00-18:00"
   * in app/layout.tsx). Days use JS getDay(): 0 = Sunday … 6 = Saturday; Friday (5) closed.
   * If these change, also update the hours.* strings in contexts/language-context.tsx.
   */
  openingHours: { days: [6, 0, 1, 2, 3, 4], open: 9, close: 18 },
  advancePercent: 50,

  /** Category popularity from FB post analysis (must sum to 100) */
  categoryPopularity: [
    { slug: "labels-stickers", labelKey: "cat.labels", percent: 28 },
    { slug: "corporate-essentials", labelKey: "cat.corporate", percent: 22 },
    { slug: "marketing-essentials", labelKey: "cat.marketing", percent: 18 },
    { slug: "promotional-products", labelKey: "cat.promotional", percent: 14 },
    { slug: "large-format", labelKey: "cat.largeFormat", percent: 10 },
    { slug: "event-personal", labelKey: "cat.event", percent: 8 },
  ] as const,

  /** Top-performing Facebook posts */
  topPosts: [
    {
      productSlug: "custom-stickers",
      engagement: 842,
      image: "/testimonials/1.webp",
    },
    {
      productSlug: "business-cards",
      engagement: 615,
      image: "/testimonials/2.webp",
    },
    {
      productSlug: "vinyl-banners",
      engagement: 478,
      image: "/testimonials/3.webp",
    },
  ] as const,
};
