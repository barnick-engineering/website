export type Product = {
  id: string;
  slug: string;
  categorySlug: string;
  name: { bn: string; en: string };
  description: { bn: string; en: string };
  image: string;
  priceFrom: number;
  popular?: boolean;
  turnaround?: string;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "custom-stickers",
    categorySlug: "labels-stickers",
    name: { bn: "কাস্টম স্টিকার", en: "Custom Stickers" },
    description: {
      bn: "ব্র্যান্ড লোগো, প্রোডাক্ট লেবেল ও প্রমোশনাল স্টিকার। যেকোনো সাইজ ও শেপ।",
      en: "Brand logos, product labels and promotional stickers. Any size and shape.",
    },
    image: "/testimonials/1.webp",
    priceFrom: 500,
    popular: true,
    turnaround: "1–2 days",
  },
  {
    id: "2",
    slug: "business-cards",
    categorySlug: "corporate-essentials",
    name: { bn: "বিজনেস কার্ড", en: "Business Cards" },
    description: {
      bn: "প্রিমিয়াম কার্ড স্টক, ম্যাট/গ্লস ফিনিশ, কাস্টম ডিজাইন সহ।",
      en: "Premium card stock, matte/gloss finish, with custom design.",
    },
    image: "/testimonials/2.webp",
    priceFrom: 800,
    popular: true,
    turnaround: "1–3 days",
  },
  {
    id: "3",
    slug: "vinyl-banners",
    categorySlug: "large-format",
    name: { bn: "ভিনাইল ব্যানার", en: "Vinyl Banners" },
    description: {
      bn: "ইভেন্ট, দোকান ও আউটডোর প্রচারের জন্য টেকসই ভিনাইল ব্যানার।",
      en: "Durable vinyl banners for events, shops and outdoor promotion.",
    },
    image: "/testimonials/3.webp",
    priceFrom: 1500,
    popular: true,
    turnaround: "2–3 days",
  },
  {
    id: "4",
    slug: "flyers-brochures",
    categorySlug: "marketing-essentials",
    name: { bn: "ফ্লায়ার ও ব্রোশিওর", en: "Flyers & Brochures" },
    description: {
      bn: "মার্কেটিং ক্যাম্পেইনের জন্য উচ্চমানের ফ্লায়ার ও ব্রোশিওর প্রিন্ট।",
      en: "High-quality flyer and brochure printing for marketing campaigns.",
    },
    image: "/testimonials/4.webp",
    priceFrom: 600,
    turnaround: "1–3 days",
  },
  {
    id: "5",
    slug: "custom-mugs",
    categorySlug: "promotional-products",
    name: { bn: "কাস্টম মগ", en: "Custom Mugs" },
    description: {
      bn: "লোগো ও ডিজাইন প্রিন্টেড প্রমোশনাল মগ — গিফট ও ব্র্যান্ডিং।",
      en: "Logo and design printed promotional mugs for gifts and branding.",
    },
    image: "/testimonials/5.webp",
    priceFrom: 350,
    turnaround: "2–3 days",
  },
  {
    id: "6",
    slug: "product-labels",
    categorySlug: "labels-stickers",
    name: { bn: "প্রোডাক্ট লেবেল", en: "Product Labels" },
    description: {
      bn: "ফুড, কসমেটিক ও প্যাকেজিং প্রোডাক্টের জন্য কাস্টম লেবেল।",
      en: "Custom labels for food, cosmetic and packaging products.",
    },
    image: "/testimonials/6.webp",
    priceFrom: 700,
    turnaround: "1–2 days",
  },
  {
    id: "7",
    slug: "event-tickets",
    categorySlug: "event-personal",
    name: { bn: "ইভেন্ট টিকেট", en: "Event Tickets" },
    description: {
      bn: "কনসার্ট, মেলা ও কর্পোরেট ইভেন্টের জন্য কাস্টম টিকেট।",
      en: "Custom tickets for concerts, fairs and corporate events.",
    },
    image: "/testimonials/7.webp",
    priceFrom: 400,
    turnaround: "1–3 days",
  },
  {
    id: "8",
    slug: "letterheads",
    categorySlug: "corporate-essentials",
    name: { bn: "লেটারহেড", en: "Letterheads" },
    description: {
      bn: "প্রফেশনাল লেটারহেড প্রিন্ট — ব্র্যান্ড কালার ও লোগো সহ।",
      en: "Professional letterhead printing with brand colors and logo.",
    },
    image: "/testimonials/2.webp",
    priceFrom: 900,
    turnaround: "2–3 days",
  },
  {
    id: "9",
    slug: "posters",
    categorySlug: "marketing-essentials",
    name: { bn: "পোস্টার", en: "Posters" },
    description: {
      bn: "ইভেন্ট, প্রমোশন ও দোকানের জন্য আকর্ষণীয় পোস্টার প্রিন্ট।",
      en: "Eye-catching poster printing for events, promos and shops.",
    },
    image: "/testimonials/3.webp",
    priceFrom: 500,
    turnaround: "1–2 days",
  },
  {
    id: "10",
    slug: "custom-tshirts",
    categorySlug: "promotional-products",
    name: { bn: "কাস্টম টি-শার্ট", en: "Custom T-Shirts" },
    description: {
      bn: "ইভেন্ট, টিম ও ব্র্যান্ডিংয়ের জন্য প্রিন্টেড টি-শার্ট।",
      en: "Printed t-shirts for events, teams and branding.",
    },
    image: "/testimonials/4.webp",
    priceFrom: 450,
    turnaround: "3–5 days",
  },
  {
    id: "11",
    slug: "greeting-cards",
    categorySlug: "stationery",
    name: { bn: "গ্রিটিং কার্ড", en: "Greeting Cards" },
    description: {
      bn: "উৎসব, অনুষ্ঠান ও ব্যক্তিগত উপহারের জন্য কাস্টম কার্ড।",
      en: "Custom cards for festivals, occasions and personal gifts.",
    },
    image: "/testimonials/5.webp",
    priceFrom: 300,
    turnaround: "2–3 days",
  },
  {
    id: "12",
    slug: "certificates",
    categorySlug: "security-printing",
    name: { bn: "সার্টিফিকেট", en: "Certificates" },
    description: {
      bn: "অফিসিয়াল সার্টিফিকেট ও অ্যাওয়ার্ড প্রিন্টিং।",
      en: "Official certificate and award printing.",
    },
    image: "/testimonials/6.webp",
    priceFrom: 1000,
    turnaround: "2–4 days",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getPopularProducts(): Product[] {
  return products.filter((p) => p.popular);
}
