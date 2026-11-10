import type { Metadata } from "next";
import { GuideContent } from "./guide-content";

export const metadata: Metadata = {
  title: "প্রিন্টিং গাইড — ডিজাইন ফাইল ও কাগজ | বর্ণিক প্রচারাণী",
  description:
    "প্রিন্টের আগে ব্লিড, রেজোলিউশন, CMYK, ফন্ট, কাগজের GSM ও ফিনিশিং সম্পর্কে সহজ বাংলা গাইড। Artwork and paper guide for printing in Bangladesh.",
  alternates: { canonical: "/guide" },
};

export default function GuidePage() {
  return <GuideContent />;
}
