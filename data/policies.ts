import type { ContentSection, Localized } from "@/components/content-page";
import { facebookInsights } from "@/data/insights";

/**
 * ⚠️ Business commitments — confirm with the owner before publishing.
 * Kept here so they're easy to change in one place.
 */
const REPRINT_CLAIM_DAYS = { bn: "৩", en: "3" }; // days after delivery to report a problem
const LAST_UPDATED = { bn: "সর্বশেষ হালনাগাদ: নভেম্বর ২০২৬", en: "Last updated: November 2026" };

const phone = facebookInsights.phone;

export const policiesPage: {
  eyebrow: Localized;
  title: Localized;
  subtitle: Localized;
  updated: Localized;
  ctaText: Localized;
  sections: ContentSection[];
} = {
  eyebrow: { bn: "নীতিমালা", en: "Policies" },
  title: {
    bn: "পেমেন্ট, ডেলিভারি, রিপ্রিন্ট ও গোপনীয়তা",
    en: "Payment, delivery, reprints & privacy",
  },
  subtitle: {
    bn: "অর্ডার দেওয়ার আগে কী আশা করবেন — পরিষ্কারভাবে।",
    en: "What to expect when you order with us — in plain words.",
  },
  updated: LAST_UPDATED,
  ctaText: {
    bn: "কোনো প্রশ্ন আছে? আমাদের জিজ্ঞেস করুন।",
    en: "Have a question? Just ask us.",
  },
  sections: [
    {
      id: "payment",
      title: { bn: "পেমেন্ট", en: "Payment" },
      bullets: [
        {
          bn: "ডিজাইন, পরিমাণ ও ফিনিশিং ঠিক হওয়ার পর মেসেঞ্জার বা ফোনে চূড়ান্ত দাম জানানো হয়। ওয়েবসাইটের মূল্য অনুমান শুধু ধারণা দেওয়ার জন্য।",
          en: "We confirm the final price in Messenger or by phone once the design, quantity and finishing are settled. The website estimate is a guide only.",
        },
        {
          bn: "কাজ শুরুর আগে অগ্রিম কত দিতে হবে এবং কোন মাধ্যমে দেবেন, তা অর্ডার নিশ্চিত করার সময় চ্যাটে জানিয়ে দেওয়া হয়।",
          en: "The advance amount and payment method are confirmed with you in chat when you place the order, before work starts.",
        },
        {
          bn: "পেমেন্ট শুধু আমাদের অফিসিয়াল নম্বর বা অ্যাকাউন্টে করুন। আমাদের নাম ব্যবহার করে অন্য কেউ টাকা চাইলে আগে " + phone + " নম্বরে কল করে নিশ্চিত হোন।",
          en: "Pay only to our official number or account. If anyone else asks for money in our name, call " + phone + " to check first.",
        },
        {
          bn: "কাগজের বাজারদর বদলালে দাম পরিবর্তন হতে পারে — তবে অর্ডার নিশ্চিত হওয়ার পর দাম বদলানো হয় না।",
          en: "Prices can change with paper market rates — but once your order is confirmed, the agreed price doesn't change.",
        },
      ],
    },
    {
      id: "delivery",
      title: { bn: "ডেলিভারি", en: "Delivery" },
      bullets: [
        {
          bn: "সাধারণত ডিজাইন অনুমোদন ও অগ্রিম পাওয়ার পর ১–৩ কর্মদিবসে কাজ তৈরি হয়। বড় বা কাস্টম কাজে বেশি সময় লাগতে পারে — অর্ডারের সময় জানিয়ে দেওয়া হবে।",
          en: "Most jobs are ready in 1–3 business days after design approval and advance payment. Large or custom jobs can take longer — we'll tell you when you order.",
        },
        {
          bn: "জরুরি কাজের জন্য এক্সপ্রেস সার্ভিস আছে — অর্ডারের সময় জিজ্ঞেস করুন।",
          en: "Express service is available for urgent orders — ask when you order.",
        },
        {
          bn: "ঢাকা ও সারা বাংলাদেশে কুরিয়ারে পাঠানো হয়। কুরিয়ার চার্জ এলাকা ও ওজন অনুযায়ী আলাদা।",
          en: "We deliver by courier in Dhaka and across Bangladesh. Courier charges depend on location and weight.",
        },
        {
          bn: "চাইলে আমাদের কোতোয়ালির অফিস থেকে নিজে এসেও নিতে পারেন।",
          en: "You can also collect your order from our office in Kotwali, Dhaka.",
        },
      ],
    },
    {
      id: "reprint",
      title: { bn: "রিপ্রিন্ট ও সমস্যা সমাধান", en: "Reprints & problems" },
      intro: {
        bn: "ছাপা কাজ অনুমোদিত ডিজাইন ও স্পেসিফিকেশনের সাথে না মিললে আমরা ঠিক করে দিই।",
        en: "If your print doesn't match the approved design and specifications, we'll make it right.",
      },
      bullets: [
        {
          bn: "ডেলিভারির " + REPRINT_CLAIM_DAYS.bn + " দিনের মধ্যে ছবিসহ মেসেঞ্জারে জানান।",
          en: "Tell us in Messenger within " + REPRINT_CLAIM_DAYS.en + " days of delivery, with photos.",
        },
        {
          bn: "আমাদের ভুল হলে (ভুল সাইজ, ভুল কাগজ, ছাপার ত্রুটি, পরিমাণ কম, পথে ক্ষতি) আমরা বিনা খরচে রিপ্রিন্ট করি বা সমাধান করি।",
          en: "If it's our mistake (wrong size, wrong paper, print defect, short quantity, damaged in transit), we reprint or fix it at no cost.",
        },
        {
          bn: "আপনার অনুমোদিত ডিজাইনে থাকা ভুল (বানান, নম্বর, তথ্য) এর আওতায় পড়ে না।",
          en: "Errors in a design you approved (spelling, numbers, details) aren't covered.",
        },
        {
          bn: "স্ক্রিন ও প্রিন্টের রঙে সামান্য পার্থক্য এবং কাটিংয়ে ১ মিমি পর্যন্ত নড়চড় প্রিন্টিংয়ে স্বাভাবিক — এগুলো ত্রুটি হিসেবে ধরা হয় না।",
          en: "Small colour differences between screen and print, and up to 1 mm cutting variation, are normal in printing and aren't treated as defects.",
        },
      ],
    },
    {
      id: "privacy",
      title: { bn: "গোপনীয়তা", en: "Privacy" },
      bullets: [
        {
          bn: "অর্ডারের জন্য আপনি যে তথ্য দেন (নাম, ফোন, ঠিকানা, ডিজাইন ফাইল) তা শুধু অর্ডার তৈরি ও ডেলিভারির কাজে ব্যবহার হয়।",
          en: "The details you give us to order (name, phone, address, design files) are used only to make and deliver your order.",
        },
        {
          bn: "ডেলিভারির জন্য কুরিয়ারকে শুধু প্রয়োজনীয় তথ্য (নাম, ফোন, ঠিকানা) দেওয়া হয়। আপনার তথ্য আমরা বিক্রি করি না।",
          en: "We share only what the courier needs (name, phone, address). We never sell your information.",
        },
        {
          bn: "আপনার ডিজাইন অন্য কারো জন্য ব্যবহার করা হয় না। আমাদের কাজের নমুনায় আপনার কাজ দেখাতে না চাইলে জানিয়ে দিন।",
          en: "Your design is never reused for anyone else. If you'd rather we don't show your job in our portfolio, just tell us.",
        },
        {
          bn: "এই ওয়েবসাইট Google Analytics ব্যবহার করে, যা কুকির মাধ্যমে কোন পাতা কতবার দেখা হয় ও কোন বাটনে ক্লিক হয় তা গণনা করে। এতে আপনার নাম বা ফোন নম্বর সংগ্রহ হয় না।",
          en: "This website uses Google Analytics, which uses cookies to count page views and button clicks. It doesn't collect your name or phone number.",
        },
        {
          bn: "আপনার তথ্য মুছে ফেলতে চাইলে " + phone + " নম্বরে বা মেসেঞ্জারে জানান।",
          en: "To have your information deleted, contact us at " + phone + " or on Messenger.",
        },
      ],
    },
  ],
};
