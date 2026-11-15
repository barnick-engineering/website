import { CheckCheck, FileUp, ScanSearch, Truck } from "lucide-react";
import type { FlowStep, Localized } from "@/components/content-page";

/**
 * "From file to print" steps — shared by /guide and the homepage How-it-works
 * section. Kept separate so the homepage doesn't pull in the full guide text.
 */
export const guideFlow: { label: Localized; steps: FlowStep[] } = {
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
};
