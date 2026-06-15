export type PortfolioCategory =
  | "সব"
  | "ভিজিটিং কার্ড"
  | "কার্ড"
  | "স্টিকার / লেবেল"
  | "নোটপ্যাড"
  | "ব্যানার / ফ্লায়ার"
  | "প্যাকেজিং"
  | "ব্রোশিওর / ক্যাটালগ";

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "সব",
  "ভিজিটিং কার্ড",
  "কার্ড",
  "স্টিকার / লেবেল",
  "নোটপ্যাড",
  "ব্যানার / ফ্লায়ার",
  "প্যাকেজিং",
  "ব্রোশিওর / ক্যাটালগ",
];

export interface PortfolioItem {
  id: string;
  src: string; // path under /public, e.g. /testimonials/1.webp
  alt: string;
  /** Must match one of PORTFOLIO_CATEGORIES except "সব" — controls filter tab grouping */
  category: Exclude<PortfolioCategory, "সব">;
  productName: string;
  specs: string;
  featured?: boolean; // reserved; grid uses uniform card size
  messengerText: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    src: "/testimonials/1.webp",
    alt: "প্রিমিয়াম শপিং ব্যাগ",
    category: "প্যাকেজিং",
    productName: "প্রিমিয়াম শপিং ব্যাগ",
    specs: "প্রিমিয়াম শপিং ব্যাগ",
    featured: true,
    messengerText: "আমি প্রিমিয়াম শপিং ব্যাগ অর্ডার করতে চাই",
  },
  {
    id: "2",
    src: "/testimonials/2.webp",
    alt: "ইনভাইটেশন কার্ড",
    category: "কার্ড",
    productName: "ইনভাইটেশন কার্ড",
    specs: "ইনভাইটেশন কার্ড",
    messengerText: "আমি ইনভাইটেশন কার্ড অর্ডার করতে চাই",
  },
  {
    id: "3",
    src: "/testimonials/3.webp",
    alt: "ব্রশিউর / পোর্টফলিও",
    category: "ব্রোশিওর / ক্যাটালগ",
    productName: "ব্রশিউর / পোর্টফলিও",
    specs: "ব্রশিউর / পোর্টফলিও",
    messengerText: "আমি ব্রশিউর / পোর্টফলিও অর্ডার করতে চাই",
  },
  {
    id: "4",
    src: "/testimonials/4.webp",
    alt: "নোটপ্যাড",
    category: "নোটপ্যাড",
    productName: "নোটপ্যাড",
    specs: "নোটপ্যাড",
    messengerText: "আমি নোটপ্যাড অর্ডার করতে চাই",
  },
  {
    id: "5",
    src: "/testimonials/5.webp",
    alt: "ফ্লায়ার",
    category: "ব্যানার / ফ্লায়ার",
    productName: "ট্রাই-ফোল্ড ব্রোশিওর",
    specs: "170gsm গ্লসি · ফুল কালার · দুই পাশ",
    messengerText: "আমি ট্রাই-ফোল্ড ব্রোশিওর অর্ডার করতে চাই",
  },
  {
    id: "6",
    src: "/testimonials/6.webp",
    alt: "ভিজিটিং কার্ড",
    category: "ভিজিটিং কার্ড",
    productName: "ভিজিটিং কার্ড",
    specs: "ভিজিটিং কার্ড",
    messengerText: "আমি ভিজিটিং কার্ড অর্ডার করতে চাই",
  },
  {
    id: "7",
    src: "/testimonials/7.webp",
    alt: "স্টিকার / লেবেল",
    category: "স্টিকার / লেবেল",
    productName: "স্টিকার / লেবেল",
    specs: "স্টিকার / লেবেল",
    messengerText: "আমি স্টিকার / লেবেল অর্ডার করতে চাই",
  },
];
