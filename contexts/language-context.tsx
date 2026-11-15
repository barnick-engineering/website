"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type Language = "bn" | "en";

export type { Language };

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
    "logo.subtitle":
      "বাংলাদেশের শীর্ষ প্রতিষ্ঠানগুলো বর্ণিক প্রচারাণীর ওপর আস্থা রাখে",
    "logo.swipeHint": "← সোয়াইপ করে আরও দেখুন →",
    // Navigation
    "nav.shop": "পণ্য দেখুন",
    "nav.about": "আমাদের সম্পর্কে",
    "nav.services": "সেবা সমূহ",
    "nav.portfolio": "কাজের নমুনা",
    "nav.faq": "সাধারণ জিজ্ঞাসা",
    "nav.contact": "যোগাযোগ",
    "nav.estimate": "মূল্য অনুমান",
    "nav.design": "ডিজাইন সার্ভিস",
    "nav.guide": "প্রিন্টিং গাইড",
    "nav.policies": "নীতিমালা",
    // Hero
    "hero.badge": "১৯৮৯ সাল থেকে AI যুগে",
    "hero.title": "প্রিন্টিং, প্যাকেজিং ও ব্রান্ডিং — সহজ, দ্রুত, নির্ভরযোগ্য",
    "hero.subtitle":
      "আপনার ব্র্যান্ডের প্রিন্টিং ও প্যাকেজিং এক জায়গায়।",
    "hero.browseProducts": "পণ্য দেখুন",
    "hero.orderMessenger": "মেসেঞ্জারে অর্ডার",
    "hero.trustLine": "১–৩ দিনে ডেলিভারি · সারা বাংলাদেশে কুরিয়ার",
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
    "hero.getStarted": "শুরু করুন",
    "hero.watchDemo": "ডেমো দেখুন",
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
    "howTo.step1.desc":
      "মেসেঞ্জারে বা ফোনে প্রিন্টিং বিস্তারিত ও ডিজাইন শেয়ার করুন",
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
    "product.advanceNote":
      "৫০% অগ্রিম দিয়ে কাজ শুরু হয়। দাম ডিজাইন, ম্যাটেরিয়াল ও পরিমাণ অনুযায়ী।",
    "product.related": "সম্পর্কিত পণ্য",
    // CTA
    "cta.messenger": "মেসেঞ্জারে লিখুন",
    "cta.call": "কল করুন",
    // About
    "about.title": "আমাদের সম্পর্কে",
    "about.content":
      "১৯৮৯ সাল থেকে বর্ণিক প্রচারাণী মানসম্মত প্রিন্টিং সেবায় আপনার নির্ভরযোগ্য সঙ্গী। এখন বাংলাদেশে আমাদের নতুন অনলাইন প্ল্যাটফর্মের মাধ্যমে উচ্চমানের কাস্টমাইজড প্রিন্টিং—বিজনেস কার্ড থেকে শুরু করে যেকোনো ধরনের মার্কেটিং ম্যাটেরিয়াল—অর্ডার করা আরও সহজ ও দ্রুত।\n\nঅভিজ্ঞতার ঐতিহ্য, আধুনিক প্রযুক্তি এবং উদ্ভাবনের সমন্বয়ে আমরা আপনাকে দিচ্ছি নিখুঁত প্রিন্টিং সল্যুশন। বর্ণিক প্রচারাণীর সঙ্গে অসাধারণ প্রিন্ট এখন মাত্র এক ক্লিকের দূরত্বে।",
    // Features
    "features.title": "সেবা সমূহ",
    "features.subtitle": "আপনার প্রয়োজন অনুযায়ী ক্যাটাগরি বেছে নিন",
    "features.1.title": "কর্পোরেট এসেনশিয়াল",
    "features.1.desc":
      "বিজসেন কার্ড, লেটারহেড, ইনভেলপ, প্রেজেন্টেশন ফোল্ডার, নোটপ্যাড ইত্যাদি",
    "features.2.title": "মার্কেটিং এসেনশিয়াল",
    "features.2.desc":
      "ফ্লেয়ার, ব্রশিউর, পোস্টার, পোস্টকার্ড, ব্যানার, ডিজিটাল ব্যানার, ক্যাটালগ ইত্যাদি",
    "features.3.title": "প্রমোশনাল আইটেম",
    "features.3.desc": "টি-শার্ট, ব্যাগ, মগ, কি চেইন, কাস্টম কলম ইত্যাদি",
    "features.4.title": "ল্যাভেল এবং স্টিকার",
    "features.4.desc":
      "প্রোডাক্ট ল্যাভেল, এড্রেস ল্যাভেল, প্রেজেন্টেশন ল্যাভেল, কাস্টোম স্টিকার, উইন্ডো ক্লিং ইত্যাদি",
    "features.5.title": "লার্জ ফরমেট প্রিন্টিং",
    "features.5.desc":
      "সাইনেজ, ভাইনেল ব্যানার, উইন্ডো ডিক্যাল, ভ্যাহিক্যাল র‍্যাপ ইত্যাদি",
    "features.6.title": "ষ্টেশনারী",
    "features.6.desc":
      "গ্রিটিং কার্ড, ইনভাইটেশন, ক্যালেন্ডার, প্ল্যানারস ইত্যাদি",
    "features.7.title": "ইভেন্ট ম্যাটেরিয়ালস",
    "features.7.desc":
      "ইভেন্ট টিকেটস, ব্যাজ, রিস্টব্যান্ড, প্রোগ্রাম ম্যাটেরিয়ালস, টেবিল ট্যান্ট ইত্যাদি",
    "features.8.title": "সিকিউরিটি প্রিন্টিং",
    "features.8.desc":
      "সার্টিফিকেট, চেক, পাসপোর্ট, ইভেন্ট টিকেট (with security features) ইত্যাদি",
    // Portfolio
    "portfolio.title": "কাজের নমুনা / পোর্টফোলিও",
    // FAQ
    "faq.title": "সাধারণ জিজ্ঞাসা (FAQ)",
    "faq.1.q": "Barnick কী ধরনের প্রিন্টিং সার্ভিস দেয়?",
    "faq.1.a":
      "আমরা ভিজিটিং কার্ড, স্টিকার, লেবেল, ফ্লায়ার, ব্যানার, ব্রোশিওর, কাস্টম প্যাকেজিং বক্সসহ সব ধরনের প্রিন্টিং ও ব্র্যান্ডিং সার্ভিস দিই।",
    "faq.2.q": "প্রিন্ট করতে কত সময় লাগে?",
    "faq.2.a":
      "সাধারণত ১–৩ কর্মদিবস লাগে। জরুরি অর্ডারের জন্য এক্সপ্রেস সার্ভিসও আছে।",
    "faq.3.q": "কীভাবে অর্ডার করতে হবে?",
    "faq.3.a":
      "ডিজাইন/ডিটেইল ফেসবুক মেসেঞ্জার, +8801712347097 নাম্বারে অর্ডার কনফার্ম করতে পারবেন। ৫০% অগ্রিমের পর কাজ শুরু হয়।",
    "faq.4.q": "ডিজাইন কি আপনারা করে দেন?",
    "faq.4.a":
      "আমাদের ইন-হাউস ডিজাইনার কাস্টম ডিজাইন করে দেন। এর জন্য অতিরিক্ত চার্জ প্রযোজ্য।",
    "faq.5.q": "দাম কীভাবে নির্ধারিত হয়?",
    "faq.5.a":
      "ডিজাইন, ম্যাটেরিয়াল, সাইজ, পরিমাণ এবং ফিনিশিং অনুযায়ী প্রাইস নির্ধারিত হয়।",
    "faq.6.q": "ডেলিভারি কিভাবে পাবো?",
    "faq.6.a": "ঢাকা ও সারা বাংলাদেশে কুরিয়ার ডেলিভারি সুবিধা রয়েছে।",
    // Contact
    "contact.title": "যোগাযোগ",
    "contact.subtitle":
      "আজই আপনার ব্র্যান্ডকে নতুন স্টাইল দিন। যোগাযোগ করুন আমাদের সাথে।",
    // Footer
    "footer.address": "ঠিকানা",
    "footer.addressValue": "৩৬ বাঁশিচরণ সেন পোদ্দার লেন, কোতোয়ালি, ঢাকা।",
    "footer.copyright": "বর্ণিক প্রচারাণী",
    "footer.separator": "।",
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত।",
    "footer.tagline": "১৯৮৯ সাল থেকে মানসম্মত প্রিন্টিং ও প্যাকেজিং সেবা।",
    "footer.links": "লিংক",
    "footer.social": "সোশ্যাল",
    // Price estimator
    "estimate.title": "মূল্য অনুমান করুন",
    "estimate.subtitle":
      "এক জায়গায় আনুমানিক দাম জানুন — মেসেঞ্জারে অর্ডার করুন",
    "estimate.disclaimer":
      "মূল্য পরিবর্তনশীল — কাগজের বাজারমূল্যের উপর নির্ভর করে চূড়ান্ত মূল্য ভিন্ন হতে পারে।",
    "estimate.comingSoon": "শীঘ্রই আসছে",
    "estimate.comingSoonNotify": "আগাম জানতে মেসেজ দিন",
    "estimate.comingSoonMessenger": "আমি অন্য একটি পণ্যের দাম জানতে চাই",
    "estimate.product.visitingCard": "ভিজিটিং কার্ড",
    "estimate.product.cashMemo": "ক্যাশ মেমো",
    "estimate.product.roundSticker": "রাউন্ড স্টিকার",
    "estimate.product.flyer": "ফ্লায়ার / ব্রোশার",
    "estimate.paperNote": "কাগজ: ART Paper 300gsm",
    "estimate.visiting.qty": "কতটি কার্ড লাগবে?",
    "estimate.visiting.sides": "ছাপার পাশ",
    "estimate.visiting.sides.one": "এক পাশ",
    "estimate.visiting.sides.both": "দুই পাশ",
    "estimate.visiting.colors": "কালার",
    "estimate.visiting.colors.1": "১ রঙ",
    "estimate.visiting.colors.2": "২ রঙ",
    "estimate.visiting.colors.4": "৪ রঙ",
    "estimate.visiting.matt": "ম্যাট লেমিনেশন",
    "estimate.visiting.matt.off": "বন্ধ",
    "estimate.visiting.matt.on": "চালু",
    "estimate.visiting.spot": "স্পট UV",
    "estimate.visiting.spot.off": "বন্ধ",
    "estimate.visiting.spot.on": "চালু",
    "estimate.visiting.cutting": "কাটিং",
    "estimate.visiting.cutting.regular": "সাধারণ",
    "estimate.visiting.cutting.dye": "ডাই কাটিং",
    "estimate.visiting.custom": "কাস্টম",
    "estimate.visiting.customLabel": "কাস্টম পরিমাণ",
    "estimate.visiting.customPlaceholder": "কার্ড সংখ্যা লিখুন (যেমন: 1500)",
    "estimate.memo.qty": "কতটি মেমো লাগবে?",
    "estimate.memo.size": "মেমোর আকার",
    "estimate.memo.size.large": 'বড় (9×11.5")',
    "estimate.memo.size.small": 'ছোট (5.75×9")',
    "estimate.memo.colors": "কালার",
    "estimate.memo.colors.1": "১ রঙ",
    "estimate.memo.colors.2": "২ রঙ",
    "estimate.memo.colors.4": "৪ রঙ",
    "estimate.memo.binding": "বাঁধাই ধরন",
    "estimate.memo.binding.pad": "প্যাড বাঁধাই",
    "estimate.memo.binding.memo": "মেমো বাঁধাই",
    "estimate.memo.custom": "কাস্টম",
    "estimate.memo.customLabel": "কাস্টম পরিমাণ",
    "estimate.memo.customPlaceholder": "মেমো সংখ্যা লিখুন (যেমন: 1500)",
    "estimate.sticker.qty": "কতটি স্টিকার লাগবে?",
    "estimate.sticker.size": "আকার",
    "estimate.sticker.size.2": '২"',
    "estimate.result.total": "আনুমানিক মোট মূল্য",
    "estimate.result.perUnit": "প্রতি ইউনিট",
    "estimate.result.disclaimer":
      "কাগজের বাজারমূল্যের উপর নির্ভর করে চূড়ান্ত মূল্য ভিন্ন হতে পারে।",
    "estimate.cta": "এই দামে অর্ডার করতে চান? মেসেঞ্জারে লিখুন →",
    "estimate.ctaShort": "মেসেঞ্জারে অর্ডার করুন",
    "estimate.result.rangeTo": "থেকে",
    "estimate.selectQty": "পরিমাণ বেছে নিন — দাম এখানে দেখাবে",
    "estimate.moreOptions": "অতিরিক্ত অপশন (ঐচ্ছিক)",
    "estimate.comingSoonList": "স্টিকার, লেবেল, ফ্লায়ার — শীঘ্রই যোগ হচ্ছে",
    "estimate.step1": "পণ্য",
    "estimate.step2": "পরিমাণ",
    "estimate.messenger.intro": "আমি অর্ডার করতে চাই:",
    "estimate.messenger.item": "পণ্য",
    "estimate.messenger.qty": "পরিমাণ",
    "estimate.messenger.price": "আনুমানিক মূল্য",
    "estimate.step3": "দাম",
    // Redesign 2026 — accessibility & shell
    "nav.primaryLabel": "প্রধান মেনু",
    "nav.menuOpen": "মেনু খুলুন",
    "nav.menuClose": "বন্ধ করুন",
    "lang.switchTo": "English",
    "lang.switchTitle": "Switch to English",
    "sticky.label": "দ্রুত যোগাযোগ",
    "logo.pause": "লোগো চলা থামান",
    "logo.play": "লোগো চালু করুন",
    // Redesign 2026 — hero
    "hero.eyebrow": "এনালগ ১৯৮৯ থেকে AI যুগে",
    "hero.titleLead": "প্রিন্টিং, প্যাকেজিং ও ব্র্যান্ডিং",
    "hero.titleAccent": "সহজ, দ্রুত, নির্ভরযোগ্য।",
    "hero.seePrices": "দাম দেখুন",
    "hero.orCall": "অথবা সরাসরি কল করুন:",
    "hero.recentWork": "সাম্প্রতিক কাজ",
    "hero.allWork": "সব কাজ দেখুন",
    "hours.openNow": "এখন খোলা",
    "hours.until": "সন্ধ্যা ৬টা পর্যন্ত",
    "hours.opensToday": "আজ সকাল ৯টায় খুলবে",
    "hours.opensTomorrow": "কাল সকাল ৯টায় খুলবে",
    "hours.opensSaturday": "শনিবার সকাল ৯টায় খুলবে",
    // Redesign 2026 — trust strip
    "trust.heading": "কেন বর্ণিক প্রচারাণী",
    "trust.since": "১৯৮৯ থেকে",
    "trust.sinceLabel": "সাল থেকে পুরান ঢাকায়",
    "trust.yearsLabel": "বছরের অভিজ্ঞতা",
    // Redesign 2026 — shop by need
    "need.eyebrow": "আপনার প্রয়োজন অনুযায়ী",
    "need.title": "কী ছাপাতে চান?",
    "need.seller.title": "অনলাইন সেলার",
    "need.seller.desc": "প্রোডাক্ট স্টিকার, লেবেল, শপিং ব্যাগ ও কাস্টম বক্স।",
    "need.seller.anchor": 'রাউন্ড স্টিকার (২") {qty} পিস — ৳{price}',
    "need.seller.cta": "স্টিকারের দাম দেখুন",
    "need.business.title": "ব্যবসা ও প্রতিষ্ঠান",
    "need.business.desc": "ভিজিটিং কার্ড, ক্যাশ মেমো, প্যাড, নোটপ্যাড, ব্রোশিওর ও ক্যাটালগ।",
    "need.business.anchor": "ভিজিটিং কার্ড {qty} পিস — ৳{price}",
    "need.business.cta": "কার্ডের দাম দেখুন",
    "need.business.cta2": "ক্যাশ মেমোর দাম দেখুন",
    "need.events.title": "অনুষ্ঠান ও উৎসব",
    "need.events.desc": "ইনভাইটেশন কার্ড, ফ্লায়ার ও ব্যানার — চাইলে ডিজাইনসহ।",
    "need.events.note": "দাম ডিজাইন ও পরিমাণ অনুযায়ী — মেসেঞ্জারে জানিয়ে দেওয়া হয়।",
    "need.events.cta": "ডিজাইন সার্ভিস দেখুন",
    "need.samples": "কাজের নমুনা দেখুন",
    // Redesign 2026 — estimator
    "estimate.eyebrow": "তাৎক্ষণিক দাম",
    "estimate.options": "অপশন",
    "estimate.perPiece": "/পিস",
    "estimate.seeOrder": "অর্ডার করুন ↓",
    "estimate.trustNote": "১–৩ দিনে ডেলিভারি · পেমেন্ট শুধু অফিসিয়াল নম্বরে",
    // Redesign 2026 — portfolio
    "portfolio.eyebrow": "আমাদের ছাপা কাজ",
    "portfolio.subtitle": "পছন্দ হলে এক ট্যাপে মেসেঞ্জারে এই রকম অর্ডার করুন।",
    "portfolio.plate": "নমুনা {n}",
    "portfolio.enlarge": "বড় করে দেখুন",
    "portfolio.orderLike": "এই রকম অর্ডার করুন",
    "portfolio.loadMore": "আরও দেখুন ({n}টি বাকি)",
    "portfolio.askTitle": "আপনার পণ্যটি এখানে নেই?",
    "portfolio.askBody": "যেকোনো প্রিন্ট বা প্যাকেজিংয়ের কথা জানান — দাম জানিয়ে দেব।",
    "portfolio.ask": "মেসেঞ্জারে জিজ্ঞেস করুন",
    "portfolio.prev": "আগের ছবি",
    "portfolio.next": "পরের ছবি",
    "portfolio.item.1.name": "প্রিমিয়াম শপিং ব্যাগ",
    "portfolio.item.1.alt": "প্রিমিয়াম শপিং ব্যাগের নমুনা",
    "portfolio.item.2.name": "ইনভাইটেশন কার্ড",
    "portfolio.item.2.alt": "ইনভাইটেশন কার্ডের নমুনা",
    "portfolio.item.3.name": "ব্রশিউর / পোর্টফলিও",
    "portfolio.item.3.alt": "ব্রোশিওর ও পোর্টফোলিওর নমুনা",
    "portfolio.item.4.name": "নোটপ্যাড",
    "portfolio.item.4.alt": "নোটপ্যাডের নমুনা",
    "portfolio.item.5.name": "ট্রাই-ফোল্ড ব্রোশিওর",
    "portfolio.item.5.alt": "ফ্লায়ারের নমুনা",
    "portfolio.item.5.specs": "170gsm গ্লসি · ফুল কালার · দুই পাশ",
    "portfolio.item.6.name": "ভিজিটিং কার্ড",
    "portfolio.item.6.alt": "ভিজিটিং কার্ডের নমুনা",
    "portfolio.item.7.name": "স্টিকার / লেবেল",
    "portfolio.item.7.alt": "স্টিকার ও লেবেলের নমুনা",
    // Redesign 2026 — how it works
    "how.eyebrow": "অর্ডার যেভাবে হয়",
    "how.guideLink": "পুরো প্রিন্টিং গাইড পড়ুন",
    // Redesign 2026 — design service (moved verbatim from design-service.tsx)
    "design.eyebrow": "ডিজাইন সার্ভিস",
    "design.title": "ডিজাইন নেই? আমরাই করে দেব।",
    "design.subtitle":
      "শুধু আপনার আইডিয়া, লোগো বা পছন্দের কোনো নমুনা পাঠান। আমাদের ডিজাইনাররা প্রিন্টের জন্য একদম তৈরি ডিজাইন বানিয়ে দেবেন — সাইজ, ব্লিড, কালার সব ঠিক রেখে।",
    "design.service.1": "লোগো ও ব্র্যান্ড আইডেন্টিটি",
    "design.service.2": "ভিজিটিং কার্ড, প্যাড, মেমো",
    "design.service.3": "লেবেল, স্টিকার ও প্যাকেজিং",
    "design.service.4": "ফ্লায়ার, ব্যানার, পোস্টার",
    "design.step.1": "আইডিয়া বা রেফারেন্স পাঠান",
    "design.step.2": "আমরা ডিজাইন করে দেখাই",
    "design.step.3": "পরিবর্তন বলুন, তারপর অনুমোদন দিন",
    "design.step.4": "প্রিন্ট ও ডেলিভারি",
    "design.note":
      "ডিজাইন চার্জ প্রিন্টের দাম থেকে আলাদা, কাজের ধরন অনুযায়ী — শুরু করার আগেই জানিয়ে দেওয়া হয়।",
    "design.cta": "ডিজাইনের জন্য মেসেজ দিন",
    "design.messengerText": "হ্যালো বর্ণিক! আমার ডিজাইন করাতে চাই।",
    // Redesign 2026 — FAQ, contact, content pages
    "faq.eyebrow": "প্রশ্ন ও উত্তর",
    "faq.more": "উত্তর খুঁজে পাননি? সরাসরি জিজ্ঞেস করুন।",
    "faq.policiesLink": "পেমেন্ট, ডেলিভারি ও রিপ্রিন্ট নীতিমালা",
    "contact.eyebrow": "অর্ডার শুরু করুন",
    "contact.headline": "আপনার কাজের কথা আমাদের জানান।",
    "content.onThisPage": "এই পাতায়",
    "content.chat": "মেসেঞ্জারে কথা বলুন",
  },
  en: {
    // Logo
    "logo.name": "Barnick Pracharani",
    "logo.trustedBy": "Trusted by clients",
    "logo.subtitle":
      "Leading organizations across Bangladesh trust Barnick Pracharani",
    "logo.swipeHint": "← Swipe to see more →",
    // Navigation
    "nav.shop": "Shop",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.estimate": "Price Estimate",
    "nav.design": "Design Service",
    "nav.guide": "Printing Guide",
    "nav.policies": "Policies",
    // Hero
    "hero.badge": "Since 1989 · AI era",
    "hero.title": "Printing, Packaging & Branding — Easy, Fast, Trusted",
    "hero.subtitle":
      "All your brand printing and packaging in one place.",
    "hero.browseProducts": "Browse Products",
    "hero.orderMessenger": "Order on Messenger",
    "hero.trustLine": "1–3 day delivery · Nationwide courier",
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
    "hero.getStarted": "Get Started",
    "hero.watchDemo": "Watch Demo",
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
    "howTo.step1.desc":
      "Send printing details and design via Messenger or phone",
    "howTo.step2.title": "Message us",
    "howTo.step2.desc":
      "Send design and details via Facebook Messenger or phone",
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
    "product.advanceNote":
      "Work starts after 50% advance. Price depends on design, material and quantity.",
    "product.related": "Related products",
    // CTA
    "cta.messenger": "Message us",
    "cta.call": "Call us",
    // About
    "about.title": "About Us",
    "about.content":
      "Since 1989, Barnick Pracharani has been your trusted partner for quality printing services. Now, through our new online platform in Bangladesh, ordering high-quality customized printing—from business cards to any type of marketing material—has become easier and faster.\n\nWith a combination of traditional experience, modern technology, and innovation, we provide you with perfect printing solutions. With Barnick Pracharani, exceptional printing is now just one click away.",
    // Features
    "features.title": "Services",
    "features.subtitle": "Browse by category to find what you need",
    "features.1.title": "Corporate Essentials",
    "features.1.desc":
      "Business cards, letterheads, envelopes, presentation folders, notepads, etc.",
    "features.2.title": "Marketing Essentials",
    "features.2.desc":
      "Flyers, brochures, posters, postcards, banners, digital banners, catalogs, etc.",
    "features.3.title": "Promotional Items",
    "features.3.desc": "T-shirts, bags, mugs, key chains, custom pens, etc.",
    "features.4.title": "Labels and Stickers",
    "features.4.desc":
      "Product labels, address labels, presentation labels, custom stickers, window cling, etc.",
    "features.5.title": "Large Format Printing",
    "features.5.desc":
      "Signage, vinyl banners, window decals, vehicle wraps, etc.",
    "features.6.title": "Stationery",
    "features.6.desc": "Greeting cards, invitations, calendars, planners, etc.",
    "features.7.title": "Event Materials",
    "features.7.desc":
      "Event tickets, badges, wristbands, program materials, table tents, etc.",
    "features.8.title": "Security Printing",
    "features.8.desc":
      "Certificates, checks, passports, event tickets (with security features), etc.",
    // Portfolio
    "portfolio.title": "Portfolio / Work Samples",
    // FAQ
    "faq.title": "Frequently Asked Questions (FAQ)",
    "faq.1.q": "What types of printing services does Barnick provide?",
    "faq.1.a":
      "We provide all types of printing and branding services including visiting cards, stickers, labels, flyers, banners, brochures, custom packaging boxes, etc.",
    "faq.2.q": "How long does it take to print?",
    "faq.2.a":
      "Usually takes 1-3 business days. Express service is also available for urgent orders.",
    "faq.3.q": "How to place an order?",
    "faq.3.a":
      "You can confirm your order via Facebook Messenger or call +8801712347097. Work starts after 50% advance payment.",
    "faq.4.q": "Do you provide design services?",
    "faq.4.a":
      "Yes, our designers create custom designs according to your brand. However, design charges are separate.",
    "faq.5.q": "How is the price determined?",
    "faq.5.a":
      "Price is determined based on design, material, size, quantity, and finishing.",
    "faq.6.q": "How do I get delivery?",
    "faq.6.a":
      "Courier delivery service is available in Dhaka and throughout Bangladesh.",
    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Give your brand a new style today. Contact us.",
    // Footer
    "footer.address": "Address",
    "footer.addressValue": "36 Banshicharan Sen Poddar Lane, Kotowali, Dhaka.",
    "footer.copyright": "Barnick Pracharani",
    "footer.separator": ".",
    "footer.rights": "All rights reserved.",
    "footer.tagline": "Quality printing and packaging services since 1989.",
    "footer.links": "Links",
    "footer.social": "Social",
    // Price estimator
    "estimate.title": "Get a Price Estimate",
    "estimate.subtitle":
      "Get an approximate price in one place — order on Messenger",
    "estimate.disclaimer":
      "Prices are variable — final cost may differ depending on paper market rates.",
    "estimate.comingSoon": "Coming soon",
    "estimate.comingSoonNotify": "Message us to get notified",
    "estimate.comingSoonMessenger": "I'd like a price for another product",
    "estimate.product.visitingCard": "Visiting Card",
    "estimate.product.cashMemo": "Cash Memo",
    "estimate.product.roundSticker": "Round Sticker",
    "estimate.product.flyer": "Flyer / Brochure",
    "estimate.paperNote": "Paper: ART Paper 300gsm",
    "estimate.visiting.qty": "How many cards?",
    "estimate.visiting.sides": "Print sides",
    "estimate.visiting.sides.one": "One side",
    "estimate.visiting.sides.both": "Both sides",
    "estimate.visiting.colors": "Colors",
    "estimate.visiting.colors.1": "1 color",
    "estimate.visiting.colors.2": "2 colors",
    "estimate.visiting.colors.4": "4 colors",
    "estimate.visiting.matt": "Matt lamination",
    "estimate.visiting.matt.off": "Off",
    "estimate.visiting.matt.on": "On",
    "estimate.visiting.spot": "Spot UV",
    "estimate.visiting.spot.off": "Off",
    "estimate.visiting.spot.on": "On",
    "estimate.visiting.cutting": "Cutting",
    "estimate.visiting.cutting.regular": "Regular",
    "estimate.visiting.cutting.dye": "Die cutting",
    "estimate.visiting.custom": "Custom",
    "estimate.visiting.customLabel": "Custom quantity",
    "estimate.visiting.customPlaceholder": "Enter number of cards (e.g. 1500)",
    "estimate.memo.qty": "How many memos?",
    "estimate.memo.size": "Memo size",
    "estimate.memo.size.large": 'Large (9×11.5")',
    "estimate.memo.size.small": 'Small (5.75×9")',
    "estimate.memo.colors": "Colors",
    "estimate.memo.colors.1": "1 color",
    "estimate.memo.colors.2": "2 colors",
    "estimate.memo.colors.4": "4 colors",
    "estimate.memo.binding": "Binding type",
    "estimate.memo.binding.pad": "Pad binding",
    "estimate.memo.binding.memo": "Memo binding",
    "estimate.memo.custom": "Custom",
    "estimate.memo.customLabel": "Custom quantity",
    "estimate.memo.customPlaceholder": "Enter number of memos (e.g. 1500)",
    "estimate.sticker.qty": "How many stickers?",
    "estimate.sticker.size": "Size",
    "estimate.sticker.size.2": '2"',
    "estimate.result.total": "Estimated total price",
    "estimate.result.perUnit": "Per unit",
    "estimate.result.disclaimer":
      "Final price may differ depending on paper market rates.",
    "estimate.cta": "Want to order at this price? Message us →",
    "estimate.ctaShort": "Order on Messenger",
    "estimate.result.rangeTo": "to",
    "estimate.selectQty": "Select quantity — price will appear here",
    "estimate.moreOptions": "Extra options (optional)",
    "estimate.comingSoonList": "Stickers, labels, flyers — coming soon",
    "estimate.step1": "Product",
    "estimate.step2": "Quantity",
    "estimate.messenger.intro": "I would like to order:",
    "estimate.messenger.item": "Item",
    "estimate.messenger.qty": "Quantity",
    "estimate.messenger.price": "Estimated price",
    "estimate.step3": "Price",
    // Redesign 2026 — accessibility & shell
    "nav.primaryLabel": "Main menu",
    "nav.menuOpen": "Open menu",
    "nav.menuClose": "Close",
    "lang.switchTo": "বাংলা",
    "lang.switchTitle": "বাংলায় দেখুন",
    "sticky.label": "Quick contact",
    "logo.pause": "Pause logos",
    "logo.play": "Play logos",
    // Redesign 2026 — hero
    "hero.eyebrow": "From analog 1989 to the AI era",
    "hero.titleLead": "Printing, packaging & branding",
    "hero.titleAccent": "Easy, fast, trusted.",
    "hero.seePrices": "See prices",
    "hero.orCall": "Or call us directly:",
    "hero.recentWork": "Recent work",
    "hero.allWork": "See all work",
    "hours.openNow": "Open now",
    "hours.until": "until 6 pm",
    "hours.opensToday": "Opens today at 9 am",
    "hours.opensTomorrow": "Opens tomorrow at 9 am",
    "hours.opensSaturday": "Opens Saturday at 9 am",
    // Redesign 2026 — trust strip
    "trust.heading": "Why Barnick Pracharani",
    "trust.since": "Since 1989",
    "trust.sinceLabel": "in Old Dhaka since",
    "trust.yearsLabel": "years of experience",
    // Redesign 2026 — shop by need
    "need.eyebrow": "Shop by need",
    "need.title": "What do you need printed?",
    "need.seller.title": "Online sellers",
    "need.seller.desc": "Product stickers, labels, shopping bags and custom boxes.",
    "need.seller.anchor": 'Round stickers (2"), {qty} pcs — ৳{price}',
    "need.seller.cta": "Price round stickers",
    "need.business.title": "Business & corporate",
    "need.business.desc": "Visiting cards, cash memos, pads, notepads, brochures and catalogues.",
    "need.business.anchor": "Visiting cards, {qty} pcs — ৳{price}",
    "need.business.cta": "Price visiting cards",
    "need.business.cta2": "Price cash memos",
    "need.events.title": "Events & occasions",
    "need.events.desc": "Invitation cards, flyers and banners — with design if you need it.",
    "need.events.note": "Priced by design and quantity — we quote on Messenger.",
    "need.events.cta": "See design service",
    "need.samples": "See samples",
    // Redesign 2026 — estimator
    "estimate.eyebrow": "Instant price",
    "estimate.options": "Options",
    "estimate.perPiece": "/pc",
    "estimate.seeOrder": "Order ↓",
    "estimate.trustNote": "Delivery in 1–3 days · Pay only to our official number",
    // Redesign 2026 — portfolio
    "portfolio.eyebrow": "Our work",
    "portfolio.subtitle": "Like one? Order something similar on Messenger in one tap.",
    "portfolio.plate": "Sample {n}",
    "portfolio.enlarge": "View larger",
    "portfolio.orderLike": "Order one like this",
    "portfolio.loadMore": "Show more ({n} left)",
    "portfolio.askTitle": "Don't see your item?",
    "portfolio.askBody": "Tell us about any print or packaging job — we'll quote it.",
    "portfolio.ask": "Ask on Messenger",
    "portfolio.prev": "Previous image",
    "portfolio.next": "Next image",
    "portfolio.item.1.name": "Premium shopping bag",
    "portfolio.item.1.alt": "Sample of a premium shopping bag",
    "portfolio.item.2.name": "Invitation card",
    "portfolio.item.2.alt": "Sample of an invitation card",
    "portfolio.item.3.name": "Brochure / portfolio",
    "portfolio.item.3.alt": "Sample of a brochure and portfolio",
    "portfolio.item.4.name": "Notepad",
    "portfolio.item.4.alt": "Sample of a notepad",
    "portfolio.item.5.name": "Tri-fold brochure",
    "portfolio.item.5.alt": "Sample of a tri-fold brochure",
    "portfolio.item.5.specs": "170gsm gloss · full colour · double-sided",
    "portfolio.item.6.name": "Visiting card",
    "portfolio.item.6.alt": "Sample of a visiting card",
    "portfolio.item.7.name": "Stickers / labels",
    "portfolio.item.7.alt": "Sample of stickers and labels",
    // Redesign 2026 — how it works
    "how.eyebrow": "How ordering works",
    "how.guideLink": "Read the full printing guide",
    // Redesign 2026 — design service (moved verbatim from design-service.tsx)
    "design.eyebrow": "Design service",
    "design.title": "No design? We'll make it for you.",
    "design.subtitle":
      "Just send your idea, logo or a sample you like. Our designers create a print-ready design — size, bleed and colours all set up correctly.",
    "design.service.1": "Logo & brand identity",
    "design.service.2": "Cards, letterheads, memos",
    "design.service.3": "Labels, stickers & packaging",
    "design.service.4": "Flyers, banners, posters",
    "design.step.1": "Send your idea or reference",
    "design.step.2": "We design and share a draft",
    "design.step.3": "Request changes, then approve",
    "design.step.4": "We print and deliver",
    "design.note":
      "Design is charged separately from printing, based on the work — we tell you the cost before we start.",
    "design.cta": "Message us for design",
    "design.messengerText": "Hi Barnick! I need help with a design.",
    // Redesign 2026 — FAQ, contact, content pages
    "faq.eyebrow": "Questions & answers",
    "faq.more": "Didn't find your answer? Ask us directly.",
    "faq.policiesLink": "Payment, delivery & reprint policies",
    "contact.eyebrow": "Start your order",
    "contact.headline": "Tell us about your job.",
    "content.onThisPage": "On this page",
    "content.chat": "Chat on Messenger",
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

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (lang !== language) trackEvent("language_change", { from: language, to: lang });
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

