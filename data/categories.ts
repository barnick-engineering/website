export type Category = {
  id: string;
  slug: string;
  name: { bn: string; en: string };
  description: { bn: string; en: string };
  image: string;
};

export const categories: Category[] = [
  {
    id: "corporate",
    slug: "corporate-essentials",
    name: { bn: "কর্পোরেট এসেনশিয়াল", en: "Corporate Essentials" },
    description: {
      bn: "বিজনেস কার্ড, লেটারহেড, ইনভেলপ ইত্যাদি",
      en: "Business cards, letterheads, envelopes, etc.",
    },
    image: "/testimonials/2.webp",
  },
  {
    id: "marketing",
    slug: "marketing-essentials",
    name: { bn: "মার্কেটিং এসেনশিয়াল", en: "Marketing Essentials" },
    description: {
      bn: "ফ্লায়ার, ব্রোশিওর, পোস্টার, ব্যানার ইত্যাদি",
      en: "Flyers, brochures, posters, banners, etc.",
    },
    image: "/testimonials/3.webp",
  },
  {
    id: "promotional",
    slug: "promotional-products",
    name: { bn: "প্রমোশনাল আইটেম", en: "Promotional Items" },
    description: {
      bn: "টি-শার্ট, ব্যাগ, মগ, কাস্টম কলম ইত্যাদি",
      en: "T-shirts, bags, mugs, custom pens, etc.",
    },
    image: "/testimonials/4.webp",
  },
  {
    id: "labels",
    slug: "labels-stickers",
    name: { bn: "লেবেল ও স্টিকার", en: "Labels & Stickers" },
    description: {
      bn: "প্রোডাক্ট লেবেল, কাস্টম স্টিকার, উইন্ডো ক্লিং",
      en: "Product labels, custom stickers, window cling",
    },
    image: "/testimonials/1.webp",
  },
  {
    id: "large-format",
    slug: "large-format",
    name: { bn: "লার্জ ফরমেট", en: "Large Format" },
    description: {
      bn: "সাইনেজ, ভিনাইল ব্যানার, ভেহিকল র‍্যাপ",
      en: "Signage, vinyl banners, vehicle wraps",
    },
    image: "/testimonials/5.webp",
  },
  {
    id: "stationery",
    slug: "stationery",
    name: { bn: "স্টেশনারি", en: "Stationery" },
    description: {
      bn: "গ্রিটিং কার্ড, ইনভাইটেশন, ক্যালেন্ডার",
      en: "Greeting cards, invitations, calendars",
    },
    image: "/testimonials/6.webp",
  },
  {
    id: "event",
    slug: "event-personal",
    name: { bn: "ইভেন্ট ম্যাটেরিয়াল", en: "Event Materials" },
    description: {
      bn: "টিকেট, ব্যাজ, রিস্টব্যান্ড, টেবিল টেন্ট",
      en: "Tickets, badges, wristbands, table tents",
    },
    image: "/testimonials/7.webp",
  },
  {
    id: "security",
    slug: "security-printing",
    name: { bn: "সিকিউরিটি প্রিন্টিং", en: "Security Printing" },
    description: {
      bn: "সার্টিফিকেট, চেক, সিকিউর টিকেট",
      en: "Certificates, checks, secure tickets",
    },
    image: "/testimonials/3.webp",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
