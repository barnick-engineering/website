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
    // Navigation
    "nav.about": "আমাদের সম্পর্কে",
    "nav.services": "সেবা সমূহ",
    "nav.portfolio": "কাজের নমুনা",
    "nav.faq": "সাধারণ জিজ্ঞাসা (FAQ)",
    "nav.contact": "যোগাযোগ",
    "nav.shop": "শপ",
    // Hero
    "hero.badge": "১৯৮৯ এর অ্যানালগ যুগ থেকে AI যুগে 🚀",
    "hero.title": "প্রিন্টিং / প্যাকেজিং এখন সহজ, দ্রুত ও বিশ্বস্ত",
    "hero.subtitle": "Idea -> Design -> Print",
    "hero.getStarted": "Shop Now",
    "hero.watchDemo": "Watch Demo",
    // About
    "about.title": "আমাদের সম্পর্কে",
    "about.content": "১৯৮৯ সাল থেকে বার্ণিক প্রচারাণী মানসম্মত প্রিন্টিং সেবায় আপনার নির্ভরযোগ্য সঙ্গী। এখন বাংলাদেশে আমাদের নতুন অনলাইন প্ল্যাটফর্মের মাধ্যমে উচ্চমানের কাস্টমাইজড প্রিন্টিং—বিজনেস কার্ড থেকে শুরু করে যেকোনো ধরনের মার্কেটিং ম্যাটেরিয়াল—অর্ডার করা আরও সহজ ও দ্রুত।\n\nঅভিজ্ঞতার ঐতিহ্য, আধুনিক প্রযুক্তি এবং উদ্ভাবনের সমন্বয়ে আমরা আপনাকে দিচ্ছি নিখুঁত প্রিন্টিং সল্যুশন। বার্ণিক প্রচারাণীর সঙ্গে অসাধারণ প্রিন্ট এখন মাত্র এক ক্লিকের দূরত্বে।",
    // Features
    "features.title": "সেবা সমূহ",
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
    // Shop
    "shop.title": "আমাদের পণ্য",
    "shop.subtitle": "আপনার প্রয়োজন অনুযায়ী সঠিক প্রিন্টিং সমাধান খুঁজে নিন",
    "shop.explore": "এক্সপ্লোর করুন",
    // Category
    "category.title": "ক্যাটাগরি",
    "category.sortBy": "সাজান",
    "category.sort.priceLow": "দাম: কম থেকে বেশি",
    "category.sort.priceHigh": "দাম: বেশি থেকে কম",
    "category.sort.popular": "জনপ্রিয়",
    "category.sort.newest": "নতুন",
    "category.filters": "ফিল্টার",
    "category.noProducts": "এই ক্যাটাগরিতে কোনো পণ্য নেই",
    // Product
    "product.addToCart": "কার্টে যোগ করুন",
    "product.customize": "কাস্টমাইজ করুন",
    "product.quantity": "পরিমাণ",
    "product.size": "সাইজ",
    "product.paperType": "কাগজের ধরন",
    "product.finish": "ফিনিশ",
    "product.needDesignHelp": "ডিজাইন সহায়তা প্রয়োজন?",
    "product.uploadFile": "ফাইল আপলোড করুন",
    "product.estimatedPrice": "আনুমানিক মূল্য",
    "product.startingFrom": "শুরু হচ্ছে",
    "product.trustBadge": "১৯৮৯ সাল থেকে বিশ্বস্ত",
    "product.reviews": "রিভিউ",
    "product.description": "বিবরণ",
    "product.specifications": "নির্দিষ্টকরণ",
    // Cart
    "cart.title": "শপিং কার্ট",
    "cart.empty": "আপনার কার্ট খালি",
    "cart.emptyDescription": "কিছু পণ্য যোগ করে শুরু করুন",
    "cart.continueShopping": "শপিং চালিয়ে যান",
    "cart.subtotal": "সাবটোটাল",
    "cart.vat": "ভ্যাট (১৫%)",
    "cart.total": "মোট",
    "cart.proceedToCheckout": "চেকআউটে যান",
    "cart.remove": "অপসারণ",
    "cart.update": "আপডেট",
    // Checkout
    "checkout.title": "চেকআউট",
    "checkout.shippingInfo": "শিপিং তথ্য",
    "checkout.fullName": "পূর্ণ নাম",
    "checkout.phone": "ফোন",
    "checkout.email": "ইমেইল",
    "checkout.address": "ঠিকানা",
    "checkout.city": "শহর",
    "checkout.orderNotes": "অর্ডার নোট",
    "checkout.paymentMethod": "পেমেন্ট পদ্ধতি",
    "checkout.payment.bkash": "bKash",
    "checkout.payment.nagad": "Nagad",
    "checkout.payment.bankTransfer": "ব্যাংক ট্রান্সফার",
    "checkout.payment.cashOnDelivery": "ক্যাশ অন ডেলিভারি",
    "checkout.placeOrder": "অর্ডার করুন",
    "checkout.orderSummary": "অর্ডার সারাংশ",
    "checkout.success": "অর্ডার সফল হয়েছে!",
    "checkout.successMessage": "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব",
    // Breadcrumb
    "breadcrumb.home": "হোম",
    "breadcrumb.shop": "শপ",
    // Common
    "common.loading": "লোড হচ্ছে...",
    "common.error": "একটি ত্রুটি ঘটেছে",
  },
  en: {
    // Logo
    "logo.name": "Barnick Pracharani",
    // Navigation
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.shop": "Shop",
    // Hero
    "hero.badge": "From 1989's Analog Era to AI Era 🚀",
    "hero.title": "Printing / Packaging Now Easy, Fast & Trusted",
    "hero.subtitle": "Idea -> Design -> Print",
    "hero.getStarted": "Get Started",
    "hero.watchDemo": "Watch Demo",
    // About
    "about.title": "About Us",
    "about.content": "Since 1989, Barnick Pracharani has been your trusted partner for quality printing services. Now, through our new online platform in Bangladesh, ordering high-quality customized printing—from business cards to any type of marketing material—has become easier and faster.\n\nWith a combination of traditional experience, modern technology, and innovation, we provide you with perfect printing solutions. With Barnick Pracharani, exceptional printing is now just one click away.",
    // Features
    "features.title": "Services",
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
    // Shop
    "shop.title": "Our Products",
    "shop.subtitle": "Find the right printing solution for your needs",
    "shop.explore": "Explore",
    // Category
    "category.title": "Category",
    "category.sortBy": "Sort By",
    "category.sort.priceLow": "Price: Low to High",
    "category.sort.priceHigh": "Price: High to Low",
    "category.sort.popular": "Popular",
    "category.sort.newest": "Newest",
    "category.filters": "Filters",
    "category.noProducts": "No products in this category",
    // Product
    "product.addToCart": "Add to Cart",
    "product.customize": "Customize",
    "product.quantity": "Quantity",
    "product.size": "Size",
    "product.paperType": "Paper Type",
    "product.finish": "Finish",
    "product.needDesignHelp": "Need design help?",
    "product.uploadFile": "Upload File",
    "product.estimatedPrice": "Estimated Price",
    "product.startingFrom": "Starting from",
    "product.trustBadge": "Trusted Since 1989",
    "product.reviews": "Reviews",
    "product.description": "Description",
    "product.specifications": "Specifications",
    // Cart
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.emptyDescription": "Start by adding some products",
    "cart.continueShopping": "Continue Shopping",
    "cart.subtotal": "Subtotal",
    "cart.vat": "VAT (15%)",
    "cart.total": "Total",
    "cart.proceedToCheckout": "Proceed to Checkout",
    "cart.remove": "Remove",
    "cart.update": "Update",
    // Checkout
    "checkout.title": "Checkout",
    "checkout.shippingInfo": "Shipping Information",
    "checkout.fullName": "Full Name",
    "checkout.phone": "Phone",
    "checkout.email": "Email",
    "checkout.address": "Address",
    "checkout.city": "City",
    "checkout.orderNotes": "Order Notes",
    "checkout.paymentMethod": "Payment Method",
    "checkout.payment.bkash": "bKash",
    "checkout.payment.nagad": "Nagad",
    "checkout.payment.bankTransfer": "Bank Transfer",
    "checkout.payment.cashOnDelivery": "Cash on Delivery",
    "checkout.placeOrder": "Place Order",
    "checkout.orderSummary": "Order Summary",
    "checkout.success": "Order Placed Successfully!",
    "checkout.successMessage": "We will contact you soon",
    // Breadcrumb
    "breadcrumb.home": "Home",
    "breadcrumb.shop": "Shop",
    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
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

