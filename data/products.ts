export interface PaperType {
  name: {
    bn: string;
    en: string;
  };
  multiplier: number;
}

export interface Product {
  id: string;
  slug: string;
  name: {
    bn: string;
    en: string;
  };
  category: string;
  basePrice: number; // Price for 100 pieces
  sizes: {
    name: {
      bn: string;
      en: string;
    };
    multiplier: number;
  }[];
  paperTypes: PaperType[];
  finishes: {
    bn: string;
    en: string;
  }[];
  description: {
    bn: string;
    en: string;
  };
  image: string; // Placeholder URL
}

export const products: Product[] = [
  // Business Essentials
  {
    id: "premium-visiting-card",
    slug: "premium-visiting-card",
    name: {
      bn: "প্রিমিয়াম ভিজিটিং কার্ড",
      en: "Premium Visiting Card",
    },
    category: "business-essentials",
    basePrice: 500,
    sizes: [
      { name: { bn: "৩.৫ x ২ ইঞ্চি", en: "3.5 x 2 inch" }, multiplier: 1 },
      { name: { bn: "বর্গাকার", en: "Square" }, multiplier: 1.2 },
      { name: { bn: "কাস্টম", en: "Custom" }, multiplier: 1.5 },
    ],
    paperTypes: [
      { name: { bn: "ম্যাট", en: "Matte" }, multiplier: 1 },
      { name: { bn: "গ্লসি", en: "Glossy" }, multiplier: 1.1 },
      { name: { bn: "প্রিমিয়াম", en: "Premium" }, multiplier: 1.3 },
    ],
    finishes: [
      { bn: "কোনো নেই", en: "None" },
      { bn: "ল্যামিনেশন", en: "Lamination" },
      { bn: "ইউভি কোটিং", en: "UV Coating" },
    ],
    description: {
      bn: "উচ্চমানের প্রিমিয়াম ভিজিটিং কার্ড যা আপনার ব্যবসায়িক পরিচয়কে উন্নত করে",
      en: "High-quality premium visiting cards that enhance your business identity",
    },
    image: "/testimonials/3.webp",
  },
  {
    id: "letterhead",
    slug: "letterhead",
    name: {
      bn: "লেটারহেড",
      en: "Letterhead",
    },
    category: "business-essentials",
    basePrice: 800,
    sizes: [
      { name: { bn: "A4", en: "A4" }, multiplier: 1 },
      { name: { bn: "A5", en: "A5" }, multiplier: 0.8 },
      { name: { bn: "কাস্টম", en: "Custom" }, multiplier: 1.3 },
    ],
    paperTypes: [
      { name: { bn: "স্ট্যান্ডার্ড", en: "Standard" }, multiplier: 1 },
      { name: { bn: "প্রিমিয়াম", en: "Premium" }, multiplier: 1.2 },
    ],
    finishes: [
      { bn: "কোনো নেই", en: "None" },
      { bn: "ল্যামিনেশন", en: "Lamination" },
    ],
    description: {
      bn: "পেশাদার লেটারহেড যা আপনার কর্পোরেট ব্র্যান্ডিংকে শক্তিশালী করে",
      en: "Professional letterheads that strengthen your corporate branding",
    },
    image: "/testimonials/6.webp",
  },
  {
    id: "envelope",
    slug: "envelope",
    name: {
      bn: "ইনভেলপ",
      en: "Envelope",
    },
    category: "business-essentials",
    basePrice: 300,
    sizes: [
      { name: { bn: "স্ট্যান্ডার্ড", en: "Standard" }, multiplier: 1 },
      { name: { bn: "বড়", en: "Large" }, multiplier: 1.3 },
    ],
    paperTypes: [
      { name: { bn: "সাধারণ", en: "Regular" }, multiplier: 1 },
      { name: { bn: "প্রিমিয়াম", en: "Premium" }, multiplier: 1.2 },
    ],
    finishes: [
      { bn: "কোনো নেই", en: "None" },
      { bn: "ল্যামিনেশন", en: "Lamination" },
    ],
    description: {
      bn: "কাস্টম প্রিন্টেড ইনভেলপ যা আপনার ব্র্যান্ডিংয়ের সাথে মেলে",
      en: "Custom printed envelopes that match your branding",
    },
    image: "/testimonials/3.webp",
  },
  // Marketing Materials
  {
    id: "flyer",
    slug: "flyer",
    name: {
      bn: "ফ্লায়ার",
      en: "Flyer",
    },
    category: "marketing-materials",
    basePrice: 400,
    sizes: [
      { name: { bn: "A5", en: "A5" }, multiplier: 1 },
      { name: { bn: "A4", en: "A4" }, multiplier: 1.5 },
      { name: { bn: "DL", en: "DL" }, multiplier: 0.8 },
    ],
    paperTypes: [
      { name: { bn: "ম্যাট", en: "Matte" }, multiplier: 1 },
      { name: { bn: "গ্লসি", en: "Glossy" }, multiplier: 1.1 },
    ],
    finishes: [
      { bn: "কোনো নেই", en: "None" },
      { bn: "ল্যামিনেশন", en: "Lamination" },
    ],
    description: {
      bn: "চোখ ধাঁধানো ফ্লায়ার যা আপনার প্রচারণাকে কার্যকর করে",
      en: "Eye-catching flyers that make your campaigns effective",
    },
    image: "/testimonials/4.webp",
  },
  {
    id: "brochure",
    slug: "brochure",
    name: {
      bn: "ব্রোশিওর",
      en: "Brochure",
    },
    category: "marketing-materials",
    basePrice: 1200,
    sizes: [
      { name: { bn: "A4 ফোল্ড", en: "A4 Fold" }, multiplier: 1 },
      { name: { bn: "A5 ফোল্ড", en: "A5 Fold" }, multiplier: 0.8 },
      { name: { bn: "ট্রাই-ফোল্ড", en: "Tri-Fold" }, multiplier: 1.2 },
    ],
    paperTypes: [
      { name: { bn: "ম্যাট", en: "Matte" }, multiplier: 1 },
      { name: { bn: "গ্লসি", en: "Glossy" }, multiplier: 1.1 },
      { name: { bn: "প্রিমিয়াম", en: "Premium" }, multiplier: 1.3 },
    ],
    finishes: [
      { bn: "কোনো নেই", en: "None" },
      { bn: "ল্যামিনেশন", en: "Lamination" },
      { bn: "ইউভি কোটিং", en: "UV Coating" },
    ],
    description: {
      bn: "পেশাদার ব্রোশিওর যা আপনার সেবা এবং পণ্যকে আকর্ষণীয়ভাবে উপস্থাপন করে",
      en: "Professional brochures that present your services and products attractively",
    },
    image: "/testimonials/5.webp",
  },
  {
    id: "poster",
    slug: "poster",
    name: {
      bn: "পোস্টার",
      en: "Poster",
    },
    category: "marketing-materials",
    basePrice: 2000,
    sizes: [
      { name: { bn: "A3", en: "A3" }, multiplier: 1 },
      { name: { bn: "A2", en: "A2" }, multiplier: 1.8 },
      { name: { bn: "A1", en: "A1" }, multiplier: 3 },
    ],
    paperTypes: [
      { name: { bn: "ম্যাট", en: "Matte" }, multiplier: 1 },
      { name: { bn: "গ্লসি", en: "Glossy" }, multiplier: 1.1 },
    ],
    finishes: [
      { bn: "কোনো নেই", en: "None" },
      { bn: "ল্যামিনেশন", en: "Lamination" },
    ],
    description: {
      bn: "বড় এবং আকর্ষণীয় পোস্টার যা আপনার বার্তা ছড়িয়ে দেয়",
      en: "Large and attractive posters that spread your message",
    },
    image: "/testimonials/4.webp",
  },
  // Stickers & Labels
  {
    id: "custom-sticker",
    slug: "custom-sticker",
    name: {
      bn: "কাস্টম স্টিকার",
      en: "Custom Sticker",
    },
    category: "stickers-labels",
    basePrice: 600,
    sizes: [
      { name: { bn: "ছোট", en: "Small" }, multiplier: 1 },
      { name: { bn: "মাঝারি", en: "Medium" }, multiplier: 1.5 },
      { name: { bn: "বড়", en: "Large" }, multiplier: 2 },
    ],
    paperTypes: [
      { name: { bn: "ভিনাইল", en: "Vinyl" }, multiplier: 1 },
      { name: { bn: "পেপার", en: "Paper" }, multiplier: 0.8 },
      { name: { bn: "ওয়াটারপ্রুফ", en: "Waterproof" }, multiplier: 1.3 },
    ],
    finishes: [
      { bn: "কোনো নেই", en: "None" },
      { bn: "গ্লসি", en: "Glossy" },
      { bn: "ম্যাট", en: "Matte" },
    ],
    description: {
      bn: "উচ্চমানের কাস্টম স্টিকার যা যেকোনো পৃষ্ঠায় আটকে থাকে",
      en: "High-quality custom stickers that stick to any surface",
    },
    image: "/testimonials/7.webp",
  },
  {
    id: "product-label",
    slug: "product-label",
    name: {
      bn: "প্রোডাক্ট লেবেল",
      en: "Product Label",
    },
    category: "stickers-labels",
    basePrice: 400,
    sizes: [
      { name: { bn: "স্ট্যান্ডার্ড", en: "Standard" }, multiplier: 1 },
      { name: { bn: "কাস্টম", en: "Custom" }, multiplier: 1.2 },
    ],
    paperTypes: [
      { name: { bn: "পেপার", en: "Paper" }, multiplier: 1 },
      { name: { bn: "ভিনাইল", en: "Vinyl" }, multiplier: 1.2 },
    ],
    finishes: [
      { bn: "কোনো নেই", en: "None" },
      { bn: "ল্যামিনেশন", en: "Lamination" },
    ],
    description: {
      bn: "পেশাদার প্রোডাক্ট লেবেল যা আপনার পণ্যের পরিচয় দেয়",
      en: "Professional product labels that identify your products",
    },
    image: "/testimonials/7.webp",
  },
  // Packaging
  {
    id: "custom-box",
    slug: "custom-box",
    name: {
      bn: "কাস্টম প্যাকেজিং বক্স",
      en: "Custom Packaging Box",
    },
    category: "packaging",
    basePrice: 1500,
    sizes: [
      { name: { bn: "ছোট", en: "Small" }, multiplier: 1 },
      { name: { bn: "মাঝারি", en: "Medium" }, multiplier: 1.5 },
      { name: { bn: "বড়", en: "Large" }, multiplier: 2 },
    ],
    paperTypes: [
      { name: { bn: "কার্ডবোর্ড", en: "Cardboard" }, multiplier: 1 },
      { name: { bn: "কোরুগেটেড", en: "Corrugated" }, multiplier: 1.2 },
      { name: { bn: "প্রিমিয়াম", en: "Premium" }, multiplier: 1.5 },
    ],
    finishes: [
      { bn: "কোনো নেই", en: "None" },
      { bn: "ল্যামিনেশন", en: "Lamination" },
      { bn: "ইউভি কোটিং", en: "UV Coating" },
    ],
    description: {
      bn: "কাস্টম প্যাকেজিং বক্স যা আপনার পণ্যকে নিরাপদে এবং আকর্ষণীয়ভাবে উপস্থাপন করে",
      en: "Custom packaging boxes that present your products safely and attractively",
    },
    image: "/testimonials/1.webp",
  },
  // Promotional Products
  {
    id: "t-shirt",
    slug: "t-shirt",
    name: {
      bn: "টি-শার্ট",
      en: "T-Shirt",
    },
    category: "promotional-products",
    basePrice: 800,
    sizes: [
      { name: { bn: "S", en: "S" }, multiplier: 1 },
      { name: { bn: "M", en: "M" }, multiplier: 1 },
      { name: { bn: "L", en: "L" }, multiplier: 1 },
      { name: { bn: "XL", en: "XL" }, multiplier: 1.1 },
    ],
    paperTypes: [
      { name: { bn: "কটন", en: "Cotton" }, multiplier: 1 },
      { name: { bn: "প্রিমিয়াম কটন", en: "Premium Cotton" }, multiplier: 1.2 },
    ],
    finishes: [
      { bn: "স্ক্রিন প্রিন্ট", en: "Screen Print" },
      { bn: "ডিজিটাল প্রিন্ট", en: "Digital Print" },
    ],
    description: {
      bn: "কাস্টম প্রিন্টেড টি-শার্ট যা আপনার ব্র্যান্ডকে প্রচার করে",
      en: "Custom printed t-shirts that promote your brand",
    },
    image: "/testimonials/6.webp",
  },
  // Event & Personal
  {
    id: "event-ticket",
    slug: "event-ticket",
    name: {
      bn: "ইভেন্ট টিকেট",
      en: "Event Ticket",
    },
    category: "event-personal",
    basePrice: 200,
    sizes: [
      { name: { bn: "স্ট্যান্ডার্ড", en: "Standard" }, multiplier: 1 },
      { name: { bn: "কাস্টম", en: "Custom" }, multiplier: 1.2 },
    ],
    paperTypes: [
      { name: { bn: "পেপার", en: "Paper" }, multiplier: 1 },
      { name: { bn: "প্রিমিয়াম", en: "Premium" }, multiplier: 1.2 },
    ],
    finishes: [
      { bn: "কোনো নেই", en: "None" },
      { bn: "ল্যামিনেশন", en: "Lamination" },
    ],
    description: {
      bn: "পেশাদার ইভেন্ট টিকেট যা আপনার ইভেন্টকে বিশেষ করে তোলে",
      en: "Professional event tickets that make your event special",
    },
    image: "/testimonials/2.webp",
  },
  {
    id: "greeting-card",
    slug: "greeting-card",
    name: {
      bn: "গ্রিটিং কার্ড",
      en: "Greeting Card",
    },
    category: "event-personal",
    basePrice: 300,
    sizes: [
      { name: { bn: "A6", en: "A6" }, multiplier: 1 },
      { name: { bn: "A5", en: "A5" }, multiplier: 1.3 },
      { name: { bn: "কাস্টম", en: "Custom" }, multiplier: 1.5 },
    ],
    paperTypes: [
      { name: { bn: "স্ট্যান্ডার্ড", en: "Standard" }, multiplier: 1 },
      { name: { bn: "প্রিমিয়াম", en: "Premium" }, multiplier: 1.2 },
    ],
    finishes: [
      { bn: "কোনো নেই", en: "None" },
      { bn: "ল্যামিনেশন", en: "Lamination" },
    ],
    description: {
      bn: "সুন্দর গ্রিটিং কার্ড যা আপনার অনুভূতি প্রকাশ করে",
      en: "Beautiful greeting cards that express your feelings",
    },
    image: "/testimonials/2.webp",
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter((product) => product.category === categorySlug);
};
