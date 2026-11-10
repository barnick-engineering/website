"use client";

import { MessageCircle, PenTool, Package, IdCard, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { getMessengerUrlWithText } from "@/lib/order";
import { headingClass } from "@/lib/typography";
import { cn } from "@/lib/utils";

const copy = {
  eyebrow: { bn: "ডিজাইন সার্ভিস", en: "Design service" },
  title: {
    bn: "ডিজাইন নেই? আমরাই করে দেব।",
    en: "No design? We'll make it for you.",
  },
  subtitle: {
    bn: "শুধু আপনার আইডিয়া, লোগো বা পছন্দের কোনো নমুনা পাঠান। আমাদের ডিজাইনাররা প্রিন্টের জন্য একদম তৈরি ডিজাইন বানিয়ে দেবেন — সাইজ, ব্লিড, কালার সব ঠিক রেখে।",
    en: "Just send your idea, logo or a sample you like. Our designers create a print-ready design — size, bleed and colours all set up correctly.",
  },
  services: [
    { icon: PenTool, bn: "লোগো ও ব্র্যান্ড আইডেন্টিটি", en: "Logo & brand identity" },
    { icon: IdCard, bn: "ভিজিটিং কার্ড, প্যাড, মেমো", en: "Cards, letterheads, memos" },
    { icon: Package, bn: "লেবেল, স্টিকার ও প্যাকেজিং", en: "Labels, stickers & packaging" },
    { icon: Megaphone, bn: "ফ্লায়ার, ব্যানার, পোস্টার", en: "Flyers, banners, posters" },
  ],
  steps: [
    { bn: "আইডিয়া বা রেফারেন্স পাঠান", en: "Send your idea or reference" },
    { bn: "আমরা ডিজাইন করে দেখাই", en: "We design and share a draft" },
    { bn: "পরিবর্তন বলুন, তারপর অনুমোদন দিন", en: "Request changes, then approve" },
    { bn: "প্রিন্ট ও ডেলিভারি", en: "We print and deliver" },
  ],
  note: {
    bn: "ডিজাইন চার্জ প্রিন্টের দাম থেকে আলাদা, কাজের ধরন অনুযায়ী — শুরু করার আগেই জানিয়ে দেওয়া হয়।",
    en: "Design is charged separately from printing, based on the work — we tell you the cost before we start.",
  },
  cta: { bn: "ডিজাইনের জন্য মেসেজ দিন", en: "Message us for design" },
  messengerText: {
    bn: "হ্যালো বর্ণিক! আমার ডিজাইন করাতে চাই।",
    en: "Hi Barnick! I need help with a design.",
  },
};

export default function DesignService() {
  const { language } = useLanguage();
  const stepNums = language === "bn" ? ["১", "২", "৩", "৪"] : ["1", "2", "3", "4"];

  return (
    <section
      id="design"
      className="scroll-mt-[7.5rem] px-4 xs:px-6 py-12 sm:py-16 bg-foreground text-background"
    >
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <p className="text-sm font-medium text-primary">{copy.eyebrow[language]}</p>
          <h2
            className={cn(
              "mt-2 text-3xl xs:text-4xl font-bold !leading-tight",
              headingClass(language)
            )}
          >
            {copy.title[language]}
          </h2>
          <p className="mt-4 text-background/75 sm:text-lg max-w-[52ch]">
            {copy.subtitle[language]}
          </p>

          <ul className="mt-8 grid grid-cols-1 xs:grid-cols-2 gap-3">
            {copy.services.map(({ icon: Icon, ...label }) => (
              <li
                key={label.en}
                className="flex items-center gap-3 border border-background/15 px-4 py-3"
              >
                <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span className="text-sm">{label[language]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ol className="space-y-0 border border-background/15">
            {copy.steps.map((step, i) => (
              <li
                key={step.en}
                className="flex items-center gap-4 px-5 py-4 border-b border-background/15 last:border-b-0"
              >
                <span className="h-9 w-9 shrink-0 flex items-center justify-center bg-primary text-primary-foreground font-semibold">
                  {stepNums[i]}
                </span>
                <span>{step[language]}</span>
              </li>
            ))}
          </ol>

          <p className="mt-5 text-sm text-background/65">{copy.note[language]}</p>

          <Button size="lg" className="mt-6 w-full sm:w-auto" asChild>
            <a
              href={getMessengerUrlWithText(copy.messengerText[language])}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="!h-5 !w-5" />
              {copy.cta[language]}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
