export interface Category {
  id: string;
  slug: string;
  name: {
    bn: string;
    en: string;
  };
  description: {
    bn: string;
    en: string;
  };
  image: string; // Placeholder URL
}

export const categories: Category[] = [
  {
    id: "business-essentials",
    slug: "business-essentials",
    name: {
      bn: "কর্পোরেট এসেনশিয়াল",
      en: "Business Essentials",
    },
    description: {
      bn: "বিজনেস কার্ড, লেটারহেড, ইনভেলপ, প্রেজেন্টেশন ফোল্ডার, নোটপ্যাড ইত্যাদি",
      en: "Business cards, letterheads, envelopes, presentation folders, notepads, etc.",
    },
    image: "/testimonials/3.webp",
  },
  {
    id: "marketing-materials",
    slug: "marketing-materials",
    name: {
      bn: "মার্কেটিং ম্যাটেরিয়াল",
      en: "Marketing Materials",
    },
    description: {
      bn: "ফ্লেয়ার, ব্রোশিওর, পোস্টার, পোস্টকার্ড, ব্যানার, ডিজিটাল ব্যানার, ক্যাটালগ ইত্যাদি",
      en: "Flyers, brochures, posters, postcards, banners, digital banners, catalogs, etc.",
    },
    image: "/testimonials/4.webp",
  },
  {
    id: "stickers-labels",
    slug: "stickers-labels",
    name: {
      bn: "স্টিকার এবং লেবেল",
      en: "Stickers & Labels",
    },
    description: {
      bn: "প্রোডাক্ট লেবেল, এড্রেস লেবেল, প্রেজেন্টেশন লেবেল, কাস্টম স্টিকার, উইন্ডো ক্লিং ইত্যাদি",
      en: "Product labels, address labels, presentation labels, custom stickers, window cling, etc.",
    },
    image: "/testimonials/7.webp",
  },
  {
    id: "packaging",
    slug: "packaging",
    name: {
      bn: "প্যাকেজিং",
      en: "Packaging",
    },
    description: {
      bn: "কাস্টম প্যাকেজিং বক্স, গিফট বক্স, প্রোডাক্ট প্যাকেজিং ইত্যাদি",
      en: "Custom packaging boxes, gift boxes, product packaging, etc.",
    },
    image: "/testimonials/1.webp",
  },
  {
    id: "promotional-products",
    slug: "promotional-products",
    name: {
      bn: "প্রমোশনাল প্রোডাক্ট",
      en: "Promotional Products",
    },
    description: {
      bn: "টি-শার্ট, ব্যাগ, মগ, কি চেইন, কাস্টম কলম ইত্যাদি",
      en: "T-shirts, bags, mugs, key chains, custom pens, etc.",
    },
    image: "/testimonials/6.webp",
  },
  {
    id: "event-personal",
    slug: "event-personal",
    name: {
      bn: "ইভেন্ট এবং পার্সোনাল",
      en: "Event & Personal",
    },
    description: {
      bn: "ইভেন্ট টিকেট, ব্যাজ, রিস্টব্যান্ড, গ্রিটিং কার্ড, ইনভাইটেশন, ক্যালেন্ডার ইত্যাদি",
      en: "Event tickets, badges, wristbands, greeting cards, invitations, calendars, etc.",
    },
    image: "/testimonials/2.webp",
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};
