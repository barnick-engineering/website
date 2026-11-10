import { CheckCheck, FileUp, ScanSearch, Truck } from "lucide-react";
import type { ContentSection, FlowStep, Localized } from "@/components/content-page";

export const guidePage: {
  eyebrow: Localized;
  title: Localized;
  subtitle: Localized;
  ctaText: Localized;
  flow: { label: Localized; steps: FlowStep[] };
  sections: ContentSection[];
} = {
  flow: {
    label: { bn: "ফাইল থেকে প্রিন্ট", en: "From file to print" },
    steps: [
      {
        icon: FileUp,
        title: { bn: "ফাইল পাঠান", en: "Send your file" },
        description: { bn: "ডকুমেন্ট হিসেবে, ছবি হিসেবে নয়", en: "As a document, not a photo" },
      },
      {
        icon: ScanSearch,
        title: { bn: "আমরা যাচাই করি", en: "We check it" },
        description: { bn: "সাইজ, ব্লিড, রেজোলিউশন, রং", en: "Size, bleed, resolution, colour" },
      },
      {
        icon: CheckCheck,
        title: { bn: "আপনি অনুমোদন দিন", en: "You approve" },
        description: { bn: "বানান ও তথ্য মিলিয়ে নিন", en: "Check spelling and details" },
      },
      {
        icon: Truck,
        title: { bn: "প্রিন্ট ও ডেলিভারি", en: "Print & deliver" },
        description: { bn: "সাধারণত ১–৩ কর্মদিবসে", en: "Usually 1–3 business days" },
      },
    ],
  },
  eyebrow: { bn: "প্রিন্টিং গাইড", en: "Printing guide" },
  title: {
    bn: "ডিজাইন ফাইল ও কাগজ — প্রিন্টের আগে যা জানা দরকার",
    en: "Artwork & paper — what to know before you print",
  },
  subtitle: {
    bn: "সঠিক ফাইল পাঠালে কাজ দ্রুত হয়, আর ছাপা হয় ঠিক যেমনটা আপনি চেয়েছেন। নিচের বিষয়গুলো একবার দেখে নিন।",
    en: "The right file means a faster job and a print that looks exactly how you expected. Take a quick look before you send your design.",
  },
  ctaText: {
    bn: "ফাইল ঠিক আছে কিনা নিশ্চিত নন? পাঠিয়ে দিন, আমরা দেখে দেব।",
    en: "Not sure your file is ready? Send it over and we'll check it.",
  },
  sections: [
    {
      id: "send-files",
      title: { bn: "ফাইল যেভাবে পাঠাবেন", en: "How to send your file" },
      bullets: [
        {
          bn: "মেসেঞ্জার বা হোয়াটসঅ্যাপে ফাইলটি “ডকুমেন্ট/ফাইল” হিসেবে পাঠান — ছবি হিসেবে পাঠালে অ্যাপ ফাইলটি ছোট (কম্প্রেস) করে ফেলে, ফলে প্রিন্ট ঝাপসা হয়।",
          en: "In Messenger or WhatsApp, send it as a document/file — sending it as a photo compresses it and the print comes out blurry.",
        },
        {
          bn: "সবচেয়ে ভালো ফরম্যাট: PDF (প্রিন্ট কোয়ালিটি), AI, EPS বা CDR। এছাড়া উচ্চ রেজোলিউশনের PNG/JPG-ও চলবে।",
          en: "Best formats: print-quality PDF, AI, EPS or CDR. High-resolution PNG/JPG also works.",
        },
        {
          bn: "ফাইলের সাথে লিখে দিন: পণ্যের নাম, সাইজ, পরিমাণ, কাগজ ও ফিনিশিং (যদি জানা থাকে)।",
          en: "Include the product, size, quantity, and paper/finish if you know them.",
        },
        {
          bn: "শুধু লোগো বা আইডিয়া আছে? সমস্যা নেই — আমাদের ডিজাইনাররা পুরো ডিজাইন করে দিতে পারেন।",
          en: "Only have a logo or an idea? No problem — our designers can create the full design.",
        },
      ],
    },
    {
      id: "artwork",
      title: { bn: "ডিজাইন ফাইলের নিয়ম", en: "Artwork checklist" },
      table: [
        {
          term: { bn: "ব্লিড — ৩ মিমি", en: "Bleed — 3 mm" },
          meaning: {
            bn: "ব্যাকগ্রাউন্ড বা ছবি যদি কাগজের কিনারা পর্যন্ত যায়, তাহলে চারপাশে ৩ মিমি বাড়তি রাখুন। কাটার সময় সামান্য নড়চড় হলেও সাদা দাগ দেখা যাবে না।",
            en: "If colour or images run to the edge, extend them 3 mm past the trim line on every side so no white edge shows after cutting.",
          },
        },
        {
          term: { bn: "সেফ জোন — ৩–৫ মিমি", en: "Safe zone — 3–5 mm" },
          meaning: {
            bn: "লেখা, লোগো, ফোন নম্বর কিনারা থেকে অন্তত ৩–৫ মিমি ভেতরে রাখুন, যাতে কাটার সময় কেটে না যায়।",
            en: "Keep text, logos and phone numbers at least 3–5 mm inside the trim line so nothing gets cut off.",
          },
        },
        {
          term: { bn: "রেজোলিউশন — ৩০০ DPI", en: "Resolution — 300 DPI" },
          meaning: {
            bn: "আসল প্রিন্ট সাইজে ছবি অন্তত ৩০০ DPI হওয়া উচিত। ফেসবুক বা ওয়েবসাইট থেকে নামানো ছবি সাধারণত ৭২ DPI — প্রিন্টে ফেটে যায়।",
            en: "Images should be at least 300 DPI at the actual print size. Images saved from Facebook or websites are usually 72 DPI and print pixelated.",
          },
        },
        {
          term: { bn: "কালার — CMYK", en: "Colour — CMYK" },
          meaning: {
            bn: "প্রিন্ট মেশিন CMYK কালিতে ছাপে। RGB-তে ডিজাইন করলে উজ্জ্বল সবুজ, নীল বা কমলা রং প্রিন্টে একটু ম্লান দেখাতে পারে।",
            en: "Presses print in CMYK ink. Designs made in RGB can look duller in print — especially bright greens, blues and oranges.",
          },
        },
        {
          term: { bn: "ফন্ট", en: "Fonts" },
          meaning: {
            bn: "ফন্টগুলো আউটলাইন (Create Outlines) করে দিন বা ফাইলের সাথে ফন্ট পাঠান — বিশেষ করে বাংলা ফন্ট, না হলে অক্ষর ভেঙে যেতে পারে।",
            en: "Convert text to outlines or send the fonts with the file — especially Bangla fonts, which can otherwise break.",
          },
        },
        {
          term: { bn: "কালো রং", en: "Black" },
          meaning: {
            bn: "ছোট লেখা শুধু ১০০% কালো (K) দিয়ে করুন। বড় কালো ব্যাকগ্রাউন্ডে গাঢ় “রিচ ব্ল্যাক” চাইলে আমাদের জানান।",
            en: "Use 100% black (K only) for small text. For large black backgrounds, ask us about a deeper “rich black”.",
          },
        },
      ],
    },
    {
      id: "colour",
      title: { bn: "স্ক্রিনের রং বনাম প্রিন্টের রং", en: "Screen colour vs printed colour" },
      intro: {
        bn: "মোবাইল বা মনিটরের স্ক্রিন আলো দিয়ে রং দেখায়, আর প্রিন্ট হয় কালি দিয়ে কাগজে। তাই স্ক্রিন আর প্রিন্টের রঙে সামান্য পার্থক্য স্বাভাবিক। কাগজ ও ল্যামিনেশন অনুযায়ীও রং কিছুটা বদলায়।",
        en: "Screens show colour with light; print uses ink on paper. A small difference between screen and print is normal, and paper and lamination also shift colour slightly.",
      },
      note: {
        bn: "ব্র্যান্ড কালার হুবহু মেলানো জরুরি হলে অর্ডারের সময় বলুন — রেফারেন্স হিসেবে আগের কোনো প্রিন্ট করা নমুনা দিলে সবচেয়ে ভালো।",
        en: "If an exact brand colour matters, tell us when ordering — a previously printed sample is the best reference.",
      },
    },
    {
      id: "paper",
      title: { bn: "কাগজ চিনুন", en: "Understanding paper" },
      intro: {
        bn: "GSM মানে কাগজের ওজন — সংখ্যা যত বেশি, কাগজ তত মোটা ও শক্ত। নিচে সাধারণ ব্যবহার দেওয়া হলো; কোন কাগজ স্টকে আছে তা অর্ডারের সময় জেনে নিন।",
        en: "GSM is paper weight — the higher the number, the thicker and stiffer the paper. Typical uses are below; ask us what's in stock when you order.",
      },
      table: [
        {
          term: { bn: "৮০–১০০ GSM অফসেট", en: "80–100 GSM offset" },
          meaning: {
            bn: "সাধারণ লেখার কাগজের মতো। ক্যাশ মেমো, লেটারহেড, বিল বই।",
            en: "Like regular writing paper. Cash memos, letterheads, bill books.",
          },
        },
        {
          term: { bn: "১২০–১৭০ GSM আর্ট পেপার", en: "120–170 GSM art paper" },
          meaning: {
            bn: "মসৃণ, চকচকে বা ম্যাট। ফ্লায়ার, লিফলেট, পোস্টার।",
            en: "Smooth, gloss or matte. Flyers, leaflets, posters.",
          },
        },
        {
          term: { bn: "২০০–২৫০ GSM আর্ট পেপার", en: "200–250 GSM art paper" },
          meaning: {
            bn: "একটু মোটা। ব্রোশারের কভার, ট্যাগ, হ্যাং ট্যাগ।",
            en: "Thicker. Brochure covers, tags, hang tags.",
          },
        },
        {
          term: { bn: "৩০০–৩৫০ GSM আর্ট কার্ড", en: "300–350 GSM art card" },
          meaning: {
            bn: "শক্ত কার্ড। ভিজিটিং কার্ড, ইনভাইটেশন, ছোট বক্স।",
            en: "Stiff card. Visiting cards, invitations, small boxes.",
          },
        },
        {
          term: { bn: "স্টিকার পেপার", en: "Sticker paper" },
          meaning: {
            bn: "পেছনে আঠা থাকে। প্রোডাক্ট লেবেল, লোগো স্টিকার। পানিরোধী দরকার হলে PVC/ভিনাইলের কথা জিজ্ঞেস করুন।",
            en: "Self-adhesive. Product labels, logo stickers. Ask about PVC/vinyl if it needs to be water-resistant.",
          },
        },
      ],
    },
    {
      id: "finishing",
      title: { bn: "ফিনিশিং অপশন", en: "Finishing options" },
      table: [
        {
          term: { bn: "ম্যাট ল্যামিনেশন", en: "Matte lamination" },
          meaning: {
            bn: "পাতলা ম্যাট আবরণ — প্রিমিয়াম, নরম অনুভূতি, আঙুলের দাগ কম পড়ে।",
            en: "A thin matte film — premium soft feel, fewer fingerprints.",
          },
        },
        {
          term: { bn: "গ্লসি ল্যামিনেশন", en: "Gloss lamination" },
          meaning: {
            bn: "চকচকে আবরণ — রং বেশি উজ্জ্বল দেখায়।",
            en: "A shiny film — colours look more vivid.",
          },
        },
        {
          term: { bn: "স্পট UV", en: "Spot UV" },
          meaning: {
            bn: "নির্দিষ্ট অংশে (যেমন লোগো) চকচকে উঁচু আবরণ। সাধারণত ম্যাট ল্যামিনেশনের ওপর সবচেয়ে সুন্দর লাগে।",
            en: "A raised glossy coat on selected areas (like a logo). Looks best on top of matte lamination.",
          },
        },
        {
          term: { bn: "ডাই কাটিং", en: "Die cutting" },
          meaning: {
            bn: "চারকোনা ছাড়া যেকোনো আকারে কাটা — গোল কোনা, কাস্টম শেপ স্টিকার, বক্স।",
            en: "Cutting to any shape beyond a rectangle — rounded corners, custom-shape stickers, boxes.",
          },
        },
      ],
    },
    {
      id: "approval",
      title: { bn: "প্রিন্টের আগে অনুমোদন", en: "Approving before print" },
      bullets: [
        {
          bn: "প্রিন্টের আগে আমরা ফাইনাল ডিজাইন আপনাকে পাঠাই। বানান, নাম, ফোন নম্বর, ঠিকানা ও দাম ভালো করে মিলিয়ে নিন।",
          en: "Before printing we send you the final design. Check spelling, names, phone numbers, addresses and prices carefully.",
        },
        {
          bn: "আপনি “ঠিক আছে” বলার পরই প্রিন্ট শুরু হয় — অনুমোদিত ডিজাইনের ভুল পরে আর ঠিক করা যায় না।",
          en: "Printing starts only after you approve — mistakes in an approved design can't be fixed after printing.",
        },
      ],
    },
  ],
};
