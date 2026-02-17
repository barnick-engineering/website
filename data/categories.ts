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
  /** If set, this is a link-only entry (e.g. Deals, Services) – no product grid. */
  href?: string;
}

export const categories: Category[] = [
  {
    id: "business-essentials",
    slug: "business-essentials",
    name: {
      bn: "বিজনেস কার্ড ও এসেনশিয়াল",
      en: "Business Cards",
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
      bn: "পোস্টকার্ড ও প্রিন্ট অ্যাডভার্টাইজিং",
      en: "Postcards & Print Advertising",
    },
    description: {
      bn: "ফ্লেয়ার, ব্রোশিওর, পোস্টার, পোস্টকার্ড, ব্যানার, ডিজিটাল ব্যানার, ক্যাটালগ ইত্যাদি",
      en: "Flyers, brochures, posters, postcards, banners, digital banners, catalogs, etc.",
    },
    image: "/testimonials/4.webp",
  },
  {
    id: "signs-banners-posters",
    slug: "signs-banners-posters",
    name: {
      bn: "সাইন, ব্যানার ও পোস্টার",
      en: "Signs, Banners & Posters",
    },
    description: {
      bn: "সাইনেজ, ভাইনেল ব্যানার, উইন্ডো ডিক্যাল, লার্জ ফরমেট প্রিন্টিং ইত্যাদি",
      en: "Signage, vinyl banners, window decals, large-format printing, etc.",
    },
    image: "/testimonials/5.webp",
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
      bn: "ইনভাইটেশন, গিফট ও স্টেশনারী",
      en: "Invitations, Gifts & Stationery",
    },
    description: {
      bn: "ইভেন্ট টিকেট, ব্যাজ, রিস্টব্যান্ড, গ্রিটিং কার্ড, ইনভাইটেশন, ক্যালেন্ডার ইত্যাদি",
      en: "Event tickets, badges, wristbands, greeting cards, invitations, calendars, etc.",
    },
    image: "/testimonials/2.webp",
  },
  {
    id: "booklets",
    slug: "booklets",
    name: {
      bn: "বুকলেট",
      en: "Booklets",
    },
    description: {
      bn: "স্যাডেল-স্টিচ, ওয়্যার-বাউন্ড, পারফেক্ট বাউন্ড বুকলেট ইত্যাদি",
      en: "Saddle-stitch, wire-bound, perfect bound booklets, etc.",
    },
    image: "/testimonials/4.webp",
  },
  {
    id: "services",
    slug: "services",
    name: {
      bn: "ডিজাইন সেবা",
      en: "Design Services",
    },
    description: {
      bn: "কাস্টম ডিজাইন, আপলোড আর্টওয়ার্ক, কোট রিকোয়েস্ট",
      en: "Custom design, upload artwork, quote request",
    },
    image: "/testimonials/1.webp",
    href: "/design-services",
  },
  {
    id: "deals",
    slug: "deals",
    name: {
      bn: "অফার ও ডিল",
      en: "Deals",
    },
    description: {
      bn: "বিশেষ অফার এবং ডিসকাউন্ট দেখুন",
      en: "Special offers and discounts",
    },
    image: "/testimonials/6.webp",
    href: "/deals",
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};
