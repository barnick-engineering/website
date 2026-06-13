"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "bn" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  bn: {
    // Logo
    "logo.name": "বর্ণিক প্রচারণী",
    "logo.trustedBy": "আমাদের বিশ্বস্ত ক্লায়েন্ট",
    "logo.subtitle": "বাংলাদেশের শীর্ষ প্রতিষ্ঠানগুলো বার্ণিক প্রচারাণীর ওপর আস্থা রাখে",
    "logo.swipeHint": "← সোয়াইপ করে আরও দেখুন →",
    // Navigation
    "nav.shop": "পণ্য দেখুন",
    "nav.about": "আমাদের সম্পর্কে",
    "nav.services": "সেবা সমূহ",
    "nav.portfolio": "কাজের নমুনা",
    "nav.faq": "সাধারণ জিজ্ঞাসা",
    "nav.contact": "যোগাযোগ",
    // Hero
    "hero.badge": "১৯৮৯ সাল থেকে AI যুগে",
    "hero.title": "প্রিন্টিং ও প্যাকেজিং — সহজ, দ্রুত, নির্ভরযোগ্য",
    "hero.subtitle": "বিজনেস কার্ড থেকে কাস্টম প্যাকেজিং — আপনার ব্র্যান্ডের প্রিন্টিং ও প্যাকেজিং এক জায়গায়।",
    "hero.browseProducts": "পণ্য দেখুন",
    "hero.orderMessenger": "মেসেঞ্জারে অর্ডার",
    "hero.trustLine": "১–৩ দিনে ডেলিভারি · সারা বাংলাদেশে কুরিয়ার",
    "hero.getStarted": "শুরু করুন",
    "hero.watchDemo": "ডেমো দেখুন",
    "hero.flow.title": "আমাদের প্রক্রিয়া",
    "hero.flow.step1.title": "ক্লায়েন্ট",
    "hero.flow.step1.desc": "প্রয়োজন ও ডিজাইন মেসেঞ্জার/ফোনে পাঠান",
    "hero.flow.step2.title": "প্রোডাকশন",
    "hero.flow.step2.printLabel": "প্রিন্টিং",
    "hero.flow.step2.print": "কার্ড · ফ্লায়ার · ব্যানার",
    "hero.flow.step2.packagingLabel": "প্যাকেজিং",
    "hero.flow.step2.packaging": "বক্স · লেবেল · ফিনিশিং",
    "hero.flow.pipeline.tagline": "আমাদের মূল কাজ",
    "hero.flow.pipeline.idea": "আইডিয়া",
    "hero.flow.pipeline.design": "ডিজাইন",
    "hero.flow.pipeline.print": "প্রিন্ট",
    "hero.flow.step3.title": "ডেলিভারি",
    "hero.flow.step3.desc": "১–৩ দিনে সারা বাংলাদেশে পৌঁছে দেওয়া",
    // Stats
    "stats.since": "প্রতিষ্ঠার সাল",
    "stats.followers": "ফেসবুক ফলোয়ার",
    "stats.clients": "বিশ্বস্ত ক্লায়েন্ট",
    "stats.turnaround": "দিনে ডেলিভারি",
    "stats.yearsNote": "{years}+ বছরের অভিজ্ঞতা",
    // How to order
    "howTo.title": "কীভাবে অর্ডার করবেন",
    "howTo.subtitle": "মাত্র ৩ ধাপে আপনার প্রিন্ট অর্ডার সম্পন্ন করুন",
    "howTo.step1.title": "আপনার প্রয়োজন জানান",
    "howTo.step1.desc": "মেসেঞ্জারে বা ফোনে প্রিন্টিং বিস্তারিত ও ডিজাইন শেয়ার করুন",
    "howTo.step2.title": "মেসেঞ্জারে জানান",
    "howTo.step2.desc": "ফেসবুক মেসেঞ্জার বা ফোনে ডিজাইন ও বিস্তারিত পাঠান",
    "howTo.step3.title": "প্রিন্ট ও ডেলিভারি",
    "howTo.step3.desc": "৫০% অগ্রিম দিয়ে প্রিন্ট শুরু — ১–৩ দিনে ডেলিভারি",
    // Chart categories
    "chart.title": "ফেসবুকে সবচেয়ে জনপ্রিয়",
    "chart.subtitle": "আমাদের ফেসবুক পেজের পোস্ট বিশ্লেষণ অনুযায়ী",
    "cat.labels": "লেবেল ও স্টিকার",
    "cat.corporate": "কর্পোরেট",
    "cat.marketing": "মার্কেটিং",
    "cat.promotional": "প্রমোশনাল",
    "cat.largeFormat": "লার্জ ফরমেট",
    "cat.event": "ইভেন্ট",
    // Social proof
    "socialProof.title": "ফেসবুকে সবচেয়ে পছন্দের",
    "socialProof.subtitle": "সর্বাধিক এনগেজমেন্ট পাওয়া পণ্যসমূহ",
    // Shop
    "shop.title": "সব পণ্য",
    "shop.subtitle": "ব্রাউজ করুন ও মেসেঞ্জারে অর্ডার করুন",
    "shop.all": "সব",
    "shop.empty": "এই ক্যাটাগরিতে কোনো পণ্য নেই",
    "shop.popularTitle": "জনপ্রিয় পণ্য",
    "shop.popularSubtitle": "ফেসবুকে সবচেয়ে বেশি অর্ডার হওয়া পণ্য",
    "shop.viewAll": "সব দেখুন",
    "shop.backToShop": "শপে ফিরে যান",
    // Product
    "product.popular": "জনপ্রিয়",
    "product.from": "শুরু",
    "product.orderMessenger": "মেসেঞ্জারে অর্ডার",
    "product.turnaround": "ডেলিভারি",
    "product.advanceNote": "৫০% অগ্রিম দিয়ে কাজ শুরু হয়। দাম ডিজাইন, ম্যাটেরিয়াল ও পরিমাণ অনুযায়ী।",
    "product.related": "সম্পর্কিত পণ্য",
    // CTA
    "cta.messenger": "মেসেঞ্জারে লিখুন",
    "cta.call": "কল করুন",
    // About
    "about.title": "আমাদের সম্পর্কে",
    "about.content": "১৯৮৯ সাল থেকে বার্ণিক প্রচারাণী মানসম্মত প্রিন্টিং সেবায় আপনার নির্ভরযোগ্য সঙ্গী। এখন বাংলাদেশে আমাদের নতুন অনলাইন প্ল্যাটফর্মের মাধ্যমে উচ্চমানের কাস্টমাইজড প্রিন্টিং—বিজনেস কার্ড থেকে শুরু করে যেকোনো ধরনের মার্কেটিং ম্যাটেরিয়াল—অর্ডার করা আরও সহজ ও দ্রুত।\n\nঅভিজ্ঞতার ঐতিহ্য, আধুনিক প্রযুক্তি এবং উদ্ভাবনের সমন্বয়ে আমরা আপনাকে দিচ্ছি নিখুঁত প্রিন্টিং সল্যুশন। বার্ণিক প্রচারাণীর সঙ্গে অসাধারণ প্রিন্ট এখন মাত্র এক ক্লিকের দূরত্বে।",
    // Features
    "features.title": "সেবা সমূহ",
    "features.subtitle": "আপনার প্রয়োজন অনুযায়ী ক্যাটাগরি বেছে নিন",
    "features.1.title": "কর্পোরেট এসেনশিয়াল",
    "features.1.desc": "বিজসেন কার্ড, লেটারহেড, ইনভেলপ, প্রেজেন্টেশন ফোল্ডার, নোটপ্যাড ইত্যাদি",
    "features.2.title": "মার্কেটিং এসেনশিয়াল",
    "features.2.desc": "ফ্লেয়ার, ব্রশিউর, পোস্টার, পোস্টকার্ড, ব্যানার, ডিজিটাল ব্যানার, ক্যাটালগ ইত্যাদি",
    "features.3.title": "প্রমোশনাল আইটেম",
    "features.3.desc": "টি-শার্ট, ব্যাগ, মগ, কি চেইন, কাস্টম কলম ইত্যাদি",
    "features.4.title": "ল্যাভেল এবং স্টিকার",
    "features.4.desc": "প্রোডাক্ট ল্যাভেল, এড্রেস ল্যাভেল, প্রেজেন্টেশন ল্যাভেল, কাস্টোম স্টিকার, উইন্ডো ক্লিং ইত্যাদি",
    "features.5.title": "লার্জ ফরমেট প্রিন্টিং",
    "features.5.desc": "সাইনেজ, ভাইনেল ব্যানার, উইন্ডো ডিক্যাল, ভ্যাহিক্যাল র‍্যাপ ইত্যাদি",
    "features.6.title": "ষ্টেশনারী",
    "features.6.desc": "গ্রিটিং কার্ড, ইনভাইটেশন, ক্যালেন্ডার, প্ল্যানারস ইত্যাদি",
    "features.7.title": "ইভেন্ট ম্যাটেরিয়ালস",
    "features.7.desc": "ইভেন্ট টিকেটস, ব্যাজ, রিস্টব্যান্ড, প্রোগ্রাম ম্যাটেরিয়ালস, টেবিল ট্যান্ট ইত্যাদি",
    "features.8.title": "সিকিউরিটি প্রিন্টিং",
    "features.8.desc": "সার্টিফিকেট, চেক, পাসপোর্ট, ইভেন্ট টিকেট (with security features) ইত্যাদি",
    // Portfolio
    "portfolio.title": "কাজের নমুনা / পোর্টফোলিও",
    // FAQ
    "faq.title": "সাধারণ জিজ্ঞাসা (FAQ)",
    "faq.1.q": "Barnick কী ধরনের প্রিন্টিং সার্ভিস দেয়?",
    "faq.1.a": "আমরা ভিজিটিং কার্ড, স্টিকার, লেবেল, ফ্লায়ার, ব্যানার, ব্রোশিওর, কাস্টম প্যাকেজিং বক্সসহ সব ধরনের প্রিন্টিং ও ব্র্যান্ডিং সার্ভিস দিই।",
    "faq.2.q": "প্রিন্ট করতে কত সময় লাগে?",
    "faq.2.a": "সাধারণত ১–৩ কর্মদিবস লাগে। জরুরি অর্ডারের জন্য এক্সপ্রেস সার্ভিসও আছে।",
    "faq.3.q": "কীভাবে অর্ডার করতে হবে?",
    "faq.3.a": "ডিজাইন/ডিটেইল ফেসবুক মেসেঞ্জার, +8801712347097 নাম্বারে অর্ডার কনফার্ম করতে পারবেন। ৫০% অগ্রিমের পর কাজ শুরু হয়।",
    "faq.4.q": "ডিজাইন কি আপনারা করে দেন?",
    "faq.4.a": "হ্যাঁ, আমাদের ডিজাইনাররা আপনার ব্র্যান্ড অনুযায়ী কাস্টম ডিজাইন তৈরি করে দেয়। কিন্তু সেই ক্ষেত্রে চার্চ আলাদা।",
    "faq.5.q": "দাম কীভাবে নির্ধারিত হয়?",
    "faq.5.a": "ডিজাইন, ম্যাটেরিয়াল, সাইজ, পরিমাণ এবং ফিনিশিং অনুযায়ী প্রাইস নির্ধারিত হয়।",
    "faq.6.q": "ডেলিভারি কিভাবে পাবো?",
    "faq.6.a": "হ্যাঁ, ঢাকা ও সারা বাংলাদেশে কুরিয়ার ডেলিভারি সুবিধা রয়েছে।",
    // Contact
    "contact.title": "যোগাযোগ",
    "contact.subtitle": "আজই আপনার ব্র্যান্ডকে নতুন স্টাইল দিন। যোগাযোগ করুন আমাদের সাথে।",
    // Footer
    "footer.address": "ঠিকানা",
    "footer.addressValue": "৩৬ বাঁশিচরণ সেন পোদ্দার লেন, কোতোয়ালি, ঢাকা।",
    "footer.copyright": "বার্ণিক প্রচারাণী",
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত।",
    "footer.tagline": "১৯৮৯ সাল থেকে মানসম্মত প্রিন্টিং ও প্যাকেজিং সেবা।",
    "footer.links": "লিংক",
    "footer.social": "সোশ্যাল",
  },
  en: {
    // Logo
    "logo.name": "Barnick Pracharani",
    "logo.trustedBy": "Trusted by clients",
    "logo.subtitle": "Leading organizations across Bangladesh trust Barnick Pracharani",
    "logo.swipeHint": "← Swipe to see more →",
    // Navigation
    "nav.shop": "Shop",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    // Hero
    "hero.badge": "Since 1989 · AI era",
    "hero.title": "Printing & Packaging — Easy, Fast, Trusted",
    "hero.subtitle": "From business cards to custom packaging — all your brand printing and packaging in one place.",
    "hero.browseProducts": "Browse Products",
    "hero.orderMessenger": "Order on Messenger",
    "hero.trustLine": "1–3 day delivery · Nationwide courier",
    "hero.getStarted": "Get Started",
    "hero.watchDemo": "Watch Demo",
    "hero.flow.title": "Our Process",
    "hero.flow.step1.title": "Client",
    "hero.flow.step1.desc": "Send needs & design via Messenger or phone",
    "hero.flow.step2.title": "Production",
    "hero.flow.step2.printLabel": "Printing",
    "hero.flow.step2.print": "Cards · flyers · banners",
    "hero.flow.step2.packagingLabel": "Packaging",
    "hero.flow.step2.packaging": "Boxes · labels · finishing",
    "hero.flow.pipeline.tagline": "What we do best",
    "hero.flow.pipeline.idea": "Idea",
    "hero.flow.pipeline.design": "Design",
    "hero.flow.pipeline.print": "Print",
    "hero.flow.step3.title": "Delivery",
    "hero.flow.step3.desc": "Nationwide in 1–3 days",
    // Stats
    "stats.since": "Established",
    "stats.followers": "Facebook followers",
    "stats.clients": "Trusted clients",
    "stats.turnaround": "Days delivery",
    "stats.yearsNote": "{years}+ years of experience",
    // How to order
    "howTo.title": "How to Order",
    "howTo.subtitle": "Complete your print order in just 3 steps",
    "howTo.step1.title": "Share your requirements",
    "howTo.step1.desc": "Send printing details and design via Messenger or phone",
    "howTo.step2.title": "Message us",
    "howTo.step2.desc": "Send design and details via Facebook Messenger or phone",
    "howTo.step3.title": "Print & deliver",
    "howTo.step3.desc": "50% advance to start — delivered in 1–3 days",
    // Chart categories
    "chart.title": "Most popular on Facebook",
    "chart.subtitle": "Based on our Facebook page post analysis",
    "cat.labels": "Labels & Stickers",
    "cat.corporate": "Corporate",
    "cat.marketing": "Marketing",
    "cat.promotional": "Promotional",
    "cat.largeFormat": "Large Format",
    "cat.event": "Events",
    // Social proof
    "socialProof.title": "Most loved on Facebook",
    "socialProof.subtitle": "Products with the highest engagement",
    // Shop
    "shop.title": "All Products",
    "shop.subtitle": "Browse and order via Messenger",
    "shop.all": "All",
    "shop.empty": "No products in this category",
    "shop.popularTitle": "Popular Products",
    "shop.popularSubtitle": "Most ordered products on Facebook",
    "shop.viewAll": "View all",
    "shop.backToShop": "Back to shop",
    // Product
    "product.popular": "Popular",
    "product.from": "From",
    "product.orderMessenger": "Order on Messenger",
    "product.turnaround": "Delivery",
    "product.advanceNote": "Work starts after 50% advance. Price depends on design, material and quantity.",
    "product.related": "Related products",
    // CTA
    "cta.messenger": "Message us",
    "cta.call": "Call us",
    // About
    "about.title": "About Us",
    "about.content": "Since 1989, Barnick Pracharani has been your trusted partner for quality printing services. Now, through our new online platform in Bangladesh, ordering high-quality customized printing—from business cards to any type of marketing material—has become easier and faster.\n\nWith a combination of traditional experience, modern technology, and innovation, we provide you with perfect printing solutions. With Barnick Pracharani, exceptional printing is now just one click away.",
    // Features
    "features.title": "Services",
    "features.subtitle": "Browse by category to find what you need",
    "features.1.title": "Corporate Essentials",
    "features.1.desc": "Business cards, letterheads, envelopes, presentation folders, notepads, etc.",
    "features.2.title": "Marketing Essentials",
    "features.2.desc": "Flyers, brochures, posters, postcards, banners, digital banners, catalogs, etc.",
    "features.3.title": "Promotional Items",
    "features.3.desc": "T-shirts, bags, mugs, key chains, custom pens, etc.",
    "features.4.title": "Labels and Stickers",
    "features.4.desc": "Product labels, address labels, presentation labels, custom stickers, window cling, etc.",
    "features.5.title": "Large Format Printing",
    "features.5.desc": "Signage, vinyl banners, window decals, vehicle wraps, etc.",
    "features.6.title": "Stationery",
    "features.6.desc": "Greeting cards, invitations, calendars, planners, etc.",
    "features.7.title": "Event Materials",
    "features.7.desc": "Event tickets, badges, wristbands, program materials, table tents, etc.",
    "features.8.title": "Security Printing",
    "features.8.desc": "Certificates, checks, passports, event tickets (with security features), etc.",
    // Portfolio
    "portfolio.title": "Portfolio / Work Samples",
    // FAQ
    "faq.title": "Frequently Asked Questions (FAQ)",
    "faq.1.q": "What types of printing services does Barnick provide?",
    "faq.1.a": "We provide all types of printing and branding services including visiting cards, stickers, labels, flyers, banners, brochures, custom packaging boxes, etc.",
    "faq.2.q": "How long does it take to print?",
    "faq.2.a": "Usually takes 1-3 business days. Express service is also available for urgent orders.",
    "faq.3.q": "How to place an order?",
    "faq.3.a": "You can confirm your order via Facebook Messenger or call +8801712347097. Work starts after 50% advance payment.",
    "faq.4.q": "Do you provide design services?",
    "faq.4.a": "Yes, our designers create custom designs according to your brand. However, design charges are separate.",
    "faq.5.q": "How is the price determined?",
    "faq.5.a": "Price is determined based on design, material, size, quantity, and finishing.",
    "faq.6.q": "How do I get delivery?",
    "faq.6.a": "Yes, courier delivery service is available in Dhaka and throughout Bangladesh.",
    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Give your brand a new style today. Contact us.",
    // Footer
    "footer.address": "Address",
    "footer.addressValue": "36 Banshicharan Sen Poddar Lane, Kotowali, Dhaka.",
    "footer.copyright": "Barnick Pracharani",
    "footer.rights": "All rights reserved.",
    "footer.tagline": "Quality printing and packaging services since 1989.",
    "footer.links": "Links",
    "footer.social": "Social",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Default to Bengali
  const [language, setLanguageState] = useState<Language>("bn");

  useEffect(() => {
    // Load language from localStorage only if it exists and is valid
    // Default remains Bengali if no saved preference
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "bn" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    } else {
      // Ensure Bengali is set as default if no saved preference
      setLanguageState("bn");
      localStorage.setItem("language", "bn");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

